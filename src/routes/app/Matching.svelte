<script lang="ts">
	import { onMount } from "svelte";

    export let onMatch: (socket: WebSocket, roomId: string, expiresAt: Date, guestName: string) => void;
    export let username: string = 'default';

    let keepaliveInterval: number;
    let socket: WebSocket;

    onMount(() => {
        socket = new WebSocket("ws://adapted-distinctly-goblin.ngrok-free.app/ws");

        socket.addEventListener("open", () => {
            send({ type: "JoinQueue", payload: { name: username } });
            keepaliveInterval = setInterval(() => {
				send({ type: 'KeepAlive' });
			}, 5000);
        });
        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "Start") {
                clearInterval(keepaliveInterval);
                onMatch(socket, data.payload.room_id, new Date(data.payload.expires_at), data.payload.name);
            }
        });
        socket.addEventListener("close", () => {
            clearInterval(keepaliveInterval);
            console.log("WebSocket closed");
        });
    });

    function send(packet: any) {
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(JSON.stringify(packet));
		}
	}
</script>