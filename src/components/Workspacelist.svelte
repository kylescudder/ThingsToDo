<script lang="ts">
	import { onMount } from 'svelte';
	import Modal, { bind } from 'svelte-simple-modal';

	import LogoutButton from './LogoutButton.svelte';
	import HideShowButton from './HideShowButton.svelte';
	import Loading from './Loading.svelte';
	import Category from './Category.svelte';
	import Popup from './Popup.svelte';
	import checklistLogo from '../images/checklist.png';
	import type { category } from '../interfaces';
	import { categoriesPopulate } from '../categories';
	import { categoryList, modal } from '$lib/stores';

	export let userId: number;
	export let isLoading = false;

	onMount(() => {
		loadContent();
	});

	const showModal = () => modal.set(bind(Popup, { title: 'Add category', userId: userId }));

	async function loadContent() {
		isLoading = true;
		await categoriesPopulate(userId);
		isLoading = false;
	}
	let payload: Array<category> = [];

	categoryList.subscribe((value) => {
		payload = value;
	});
</script>

<div class="col-span-2 bg-blue-500 h-full dark:bg-gray-700">
	<div class="ml-3">
		{#if isLoading}
			<Loading />
		{:else}
			<div class="grid grid-cols-4 mt-4">
				<img class="h-8 w-auto col-span-1" src={checklistLogo} alt="Checklist Logo" />
				<p class="text-lg text-white text-center col-span-3">ThingsToDo</p>
			</div>
			<section class="mt-4">
				<p class="mt-4 text-lg font-bold text-white">
					Categories
					{#if payload.length !== 0}
						<HideShowButton />
					{/if}
					<Modal
						show={$modal}
						unstyled={true}
						classBg="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center bg-gray-500/[.9] z-10"
						classWindowWrap="m-2"
						classWindow="w-2/5 my-2 mx-auto rounded-xl shadow-md"
						classContent="relative p-2 bg-white dark:bg-gray-700 rounded-xl"
						closeButton={false}
					>
						<i on:click={showModal} class="fas fa-plus cursor-pointer" />
					</Modal>
				</p>
				{#if payload.length !== 0}
					{#each payload as categoryItem (categoryItem.id)}
						<Category {categoryItem} {userId} />
					{/each}
				{:else}
					<p class="text-white text-lg mt-4 text-center">
						Add a category using the
						<i class="fas fa-plus" /> icon above.
					</p>
				{/if}
			</section>
			<LogoutButton />
		{/if}
	</div>
</div>
