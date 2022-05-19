<script lang="ts">
	import { onMount } from 'svelte';
	import Modal, { bind } from 'svelte-simple-modal';

	import LogoutButton from './LogoutButton.svelte';
	import HideShowButton from './HideShowButton.svelte';
	import Loading from './Loading.svelte';
	import Category from './Category.svelte';
	import Popup from './Popup.svelte';
	import type { category } from '../lib/interfaces';
	import { categoriesPopulate } from '../lib/categories';
	import { categoryList, modal } from '$lib/stores';
	import Fa from 'svelte-fa'
	import pkg from '@fortawesome/free-solid-svg-icons';
	const { faPlus } = pkg;

	export let at: string;
	export let isLoading = false;

	onMount(() => {
		loadContent();
	});

	const showModal = () => modal.set(bind(Popup, { title: 'Add category', at: at }));

	const loadContent = async () => {
		isLoading = true;
		await categoriesPopulate(at);
		isLoading = false;
	}
	let payload: Array<category> = [];

	categoryList.subscribe((value) => {
		payload = value;
	});
</script>

<input type="checkbox" id="menu-open" class="hidden" />
<label for="menu-open" data-dev-hint="floating action button"
	class="absolute right-2 bottom-2 shadow-lg rounded-full p-2 text-white md:hidden z-20">
	<svg id="menu-open-icon-fab" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
		viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
			d="M4 6h16M4 12h16M4 18h16" />
	</svg>
	<svg id="menu-close-icon-fab" data-dev-hint="floating action button"
		class="h-6 w-6 transition duration-200 ease-in-out" 
		xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
			d="M6 18L18 6M6 6l12 12" />
	</svg>
</label>

<header class="bg-blue-500 dark:bg-gray-700 text-gray-100 flex justify-between md:hidden"
	data-dev-hint="mobile menu bar">
	<p class="block p-4 text-white font-bold whitespace-nowrap truncate">
		ThingsToDo
	</p>

	<label for="menu-open" id="mobile-menu-button" 
		class="m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md z-20">
		<svg id="menu-open-icon" class="h-6 w-6 transition duration-200 ease-in-out"
			xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
			d="M4 6h16M4 12h16M4 18h16" />
		</svg>
		<svg id="menu-close-icon" class="h-6 w-6 transition duration-200 ease-in-out"
			xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M6 18L18 6M6 6l12 12" />
		</svg>
	</label>
</header>

<aside id="sidebar" data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
	class="bg-blue-500 dark:bg-gray-700 text-gray-100 md:w-64 w-full space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto z-10">
	<div class="flex flex-col space-y-6" data-dev-hint="optional div for having an extra footer navigation">
		<div class="h-ful">
			<div class="ml-3">
				{#if isLoading}
				<Loading />
				{:else}
					<div class="flex">
						<img class="h-7 mr-4" src='checklist.png' alt="Checklist Logo" />
						<span class="text-lg text-white my-auto float-left">ThingsToDo</span>
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
							classWindow="md:w-2/5 w-4/5 my-2 mx-auto rounded-xl shadow-md"
							classContent="relative p-2 bg-white dark:bg-gray-700 rounded-xl"
							closeButton={false}
							>
								<Fa on:click={showModal} icon={faPlus} class="cursor-pointer" />
							</Modal>
						</p>
						{#if payload.length !== 0}
							{#each payload as categoryItem (categoryItem.id)}
								<label for="menu-open" id="mobile-menu-button">
									<Category {categoryItem} {at} />
								</label>
							{/each}
						{:else}
							<p class="text-white text-lg mt-4 text-center">
								Add a category using the
								<Fa icon={faPlus} /> icon above.
							</p>
						{/if}
					</section>
				{/if}
			</div>
		</div>
	</div>
	<nav data-dev-hint="second-main-navigation or footer navigation">
		<LogoutButton />
	</nav>
</aside>