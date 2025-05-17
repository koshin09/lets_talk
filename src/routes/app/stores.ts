import { writable } from "svelte/store";

type AppState = 'idle' | 'matching' | 'chatting' | 'finished';
export let appState = writable<AppState>('idle');
export let inputField = writable<string>('');
export let hostName = writable<string>('');