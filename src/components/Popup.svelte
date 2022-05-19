<script lang="ts">
	import { addCategory } from '../lib/categories';
	import { modal } from '$lib/stores';
	import Fa from 'svelte-fa'
	import { faXmark } from '@fortawesome/free-solid-svg-icons'
	import { library } from '@fortawesome/fontawesome-svg-core';
	library.add(faXmark);

	export let title: string;
	let newCategory: string;
	export let at: string;

	const categoryAdd = async () => {
		await addCategory(newCategory, at);
	}
</script>

<div class="flex flex-shrink-0 items-center justify-between p-4">
	<h5
		class="text-xl font-medium leading-normal text-gray-800 dark:text-white"
		id="exampleModalLabel"
	>
		{title}
	</h5>
	<button
		type="button"
		class="btn-close box-content w-4 h-4 p-1 hover:opacity-75"
		aria-label="Close"
	>
		<Fa
			icon={faXmark} class="text-lg text-black dark:text-white dark:hover:text-white hover:text-black"
			on:click={() => modal.set(null)}
		/>
	</button>
</div>
<div class="relative p-4">
	<input
		type="text"
		bind:value={newCategory}
		class="form-control w-full"
		id="exampleFormControlInput1"
		placeholder="Example label"
	/>
</div>
<div class="flex flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
	<button type="button" on:click={() => categoryAdd()} class="btnAdd">Add</button>
	<button
		type="button"
		on:click={() => modal.set(null)}
		class="btnCloseModal"
		data-bs-dismiss="modal">Close</button
	>
</div>
