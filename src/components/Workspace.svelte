<script lang="ts">
	import Modal, { bind } from 'svelte-simple-modal';
	import WorkspaceList from './Workspacelist.svelte'
	import Editor from './Editor.svelte';
	import Loading from './Loading.svelte';
	import { modal, modalShown } from '$lib/stores';
	import Popup from './Popup.svelte';

	export let isLoading = false;
	export let at: string;

	isLoading = true;
	setTimeout(() => {		
		isLoading = false;
	}, 300);
	
	let payloadModalShown: boolean;

	modalShown.subscribe((value) => {
		payloadModalShown = value;
		if (payloadModalShown) {
			modal.set(bind(Popup, { title: 'Add category', at: at }))
		}
	});
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="relative min-h-screen md:flex" data-dev-hint="container">		
		<Modal
			show={$modal}
			unstyled={true}
			classBg="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center bg-gray-500/[.9] z-20"
			classWindowWrap="m-2"
			classWindow="md:w-2/5 w-4/5 my-2 mx-auto rounded-xl shadow-md"
			classContent="relative p-2 bg-white dark:bg-gray-700 rounded-xl"
			closeButton={false}
		>
		</Modal>
		<WorkspaceList {at} />
		<main id="content" class="flex-1 p-6 lg:px-8">
			<div class="mx-auto">
					<Editor {at} />
			</div>
		</main>
	</div>
{/if}