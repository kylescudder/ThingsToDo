<script type="ts">
	import DarkModeToggle from './DarkModeToggle.svelte';
	import ToDo from './ToDo.svelte';
	import type { todo } from '../lib/interfaces';
	import { todoList, categoryTEXT } from '$lib/stores';
	import AddToDo from './AddToDo.svelte';
	import FaArrowLeft from 'svelte-icons/fa/FaArrowLeft.svelte';

	export let at: string;
	let payload: Array<todo> = [];
	todoList.subscribe((value) => {
		payload = value;
	});

	let payloadCategoryText: string;
	categoryTEXT.subscribe((value) => {
		payloadCategoryText = value;
	});
</script>

<div class="w-full h-12 mt-2">
	<DarkModeToggle />
</div>
<div class="relative flex flex-col pt-4">
	<div class="mx-auto w-11/12">
		{#if payloadCategoryText !== ''}
			<div class="text-2xl dark:text-white text-blue-700 font-bold">
				{payloadCategoryText.replace(/&amp;/g, '&')}
			</div>
		{:else}
			<div class="w-64 dark:text-white">
				<div class="dark:text-white text-blue-700 w-6 text-2xl inline-table mr-4">
					<FaArrowLeft />
				</div>
				Select a category
			</div>
		{/if}
		{#if payloadCategoryText !== ''}
			<AddToDo {at} />
		{/if}
		{#each payload as todoItem (todoItem.id)}
			<ToDo {at} {todoItem} />
		{/each}
	</div>
</div>
