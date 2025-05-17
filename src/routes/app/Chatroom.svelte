<script lang="ts">
	import { SendHorizontal } from "@lucide/svelte";
	import { onMount } from "svelte";

    export let Hostname: string;
    export let Guestname: string;
    export let roomId: string;
    export let expiresAt: Date;
    export let socket: WebSocket;

    type Message = {
        sender: "host" | "guest";
        text: string;
        timestamp: Date;
    };
    let messages: Message[] = [];

    let input: string = "";

    function sendMessage() {
        const message: Message = {
            sender: "host",
            text: input,
            timestamp: new Date(),
        };
        messages = [...messages, message];
        socket.send(JSON.stringify({ type: "Message", payload: { text: input } }));
        input = "";
    }

    onMount(() => {
        socket.addEventListener("message", (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "MessageBroadcast") {
                const message: Message = {
                    sender: "guest",
                    text: data.payload.text,
                    timestamp: new Date(),
                };
                messages = [...messages, message];
            }
        });
    });
</script>

{#each messages as message}
    <div class={message.sender === "host" ? "host-message" : "guest-message"}>
        <span>{message.sender === "host" ? Hostname : Guestname}:</span>
        <span>{message.text}</span>
        <span class="timestamp">{message.timestamp.toLocaleString()}</span>
    </div>
{/each}

<div class='flex w-full max-w-sm flex-col gap-1'>
	<div class='input-group grid-cols-[1fr_auto]'>
		<input
			class='ig-input'
			type='text'
			placeholder="メッセージを入力"
			bind:value={input}
			on:keydown={(e) => {
				if (e.key === 'Enter') sendMessage();
			}}
		/>
		<button
			class='ig-btn preset-filled'
			title='Username already in use.'
			on:click={() => sendMessage()}
		>
			<SendHorizontal size={16} />
		</button>
	</div>
</div>