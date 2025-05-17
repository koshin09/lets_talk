<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { onMount } from 'svelte';

	export let onSubmit: (username: string) => void;

	export let usernameInput: string = '';
	let exampleName: string = '';

	onMount(() => {
		exampleName = getRandomExampleName();
	});

	function handleClick() {
		if (usernameInput.trim() !== '') {
			usernameInput = usernameInput.trim();
			onSubmit(usernameInput);
			usernameInput = '';
		} else {
			onSubmit(exampleName);
		}
	}

	function getRandomExampleName(): string {
		const names: string[] = [
			'さくらもち',
			'にゃんたろう',
			'もふもふ',
			'うさまる',
			'たこやき',
			'こねこちゃん',
			'みかんゼリー',
			'まめしば',
			'ひよこ王子',
			'もやし君',
			'ポテトキング',
			'バナナ侍',
			'チョコマウンテン',
			'わたあめ姫',
			'うどん大将',
			'からあげボーイ',
			'ラムネちゃん',
			'おにぎり丸',
			'ごましお',
			'プリン先生',
			'やきそばまん',
			'カレー番長',
			'トースト先輩',
			'ホットケーキ',
			'メロンパン',
			'もちもち丸',
			'ペンギン隊長',
			'クマタロウ',
			'ライオン丸',
			'トリさん',
			'しろくま団員',
			'イルカくん',
			'タヌキン',
			'ねこぞう',
			'うさぴょん',
			'ピヨピヨ',
			'パンダくん',
			'チワワン',
			'イッヌ先輩',
			'ネコチャン',
			'ピザ職人',
			'マグロ侍',
			'エビ天丸',
			'ソースマスター',
			'ミルク姫',
			'カフェモカ',
			'ココア大佐',
			'ジンジャーくん',
			'さけるチーズ',
			'ゼリー星人'
		];
		return names[Math.floor(Math.random() * names.length)];
	}
</script>

<div class='flex w-full max-w-sm flex-col gap-1'>
	<label for='username' class='px-2 py-1 text-sm font-medium'>なんて呼べばいい？</label>
	<div class='input-group grid-cols-[1fr_auto]'>
		<input
			class='ig-input'
			type='text'
			placeholder={exampleName}
			bind:value={usernameInput}
			on:keydown={(e) => {
				if (e.key === 'Enter') handleClick();
			}}
		/>
		<button
			class='ig-btn preset-filled'
			title='Username already in use.'
			on:click={() => handleClick()}
		>
			<Check size={16} />
		</button>
	</div>
</div>
