<script lang="ts">
	import { onMount } from 'svelte';
	import Lobby from './ Lobby.svelte';
	import Matching from './Matching.svelte';
	import Chatroom from './Chatroom.svelte';
	import { appState } from './stores';

	type RoomInfo = {
		roomId: string;
		expiresAt: Date;
	};

	$: currentState = $appState;
	let hostName: string = '';
	let guestName: string = '';
	let roomInfo: RoomInfo = {
		roomId: '',
		expiresAt: new Date(),
	};
	let chatSocket: WebSocket | null = null;

	onMount(() => {
		console.log('Component mounted');
	});
</script>

<div class='h-screen w-screen'>
	{#if currentState === 'idle'}
		<Lobby
			usernameInput={hostName}
			onSubmit={(username) => {
				hostName = username;
				appState.set('matching');
			}}
		/>
	{:else if currentState === 'matching'}
		<Matching username={hostName} onMatch={(socket, roomId, expiresAt, _guestName) => {
			roomInfo.roomId = roomId;
			roomInfo.expiresAt = expiresAt;
			guestName = _guestName;
			chatSocket = socket;
			appState.set('chatting');
			console.log(`Matched with room ID: ${roomId}, expires at: ${expiresAt}, guest name: ${guestName}`);
		}} />

	{:else if currentState === 'chatting' && chatSocket}
		<Chatroom
			Hostname={hostName}
			Guestname={guestName}
			roomId={roomInfo.roomId}
			expiresAt={roomInfo.expiresAt}
			socket={chatSocket}
		/>

	{:else if currentState === 'finished'}
		<!-- <Finished /> -->
	{/if}
</div>
