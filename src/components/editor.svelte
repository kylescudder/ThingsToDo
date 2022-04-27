<script type="ts">
	import DarkModeToggle from '../components/DarkModeToggle.svelte'
	import ToDo from '../components/ToDo.svelte'
	import type { todo } from '../interfaces'

	export let apiBaseUrl: string
	export let userId: number
	export let todos: Array<todo> = [];
	let todoItem: todo;
	export let categoryText: string
</script>

<div class="w-full h-12 mt-2">
	<DarkModeToggle/>
</div>
<div class="relative flex min-h-screen flex-col mt-20">
	{#if todos !== undefined}
		{#if categoryText !== undefined}
			<div class="text-2xl dark:text-white text-blue-700 font-bold">{categoryText.replace(/&amp;/g, '&')}</div>
		{:else}
			<p class="text-2xl dark:text-white text-blue-700"><i class="fas fa-arrow-left"></i> Select a category</p>
		{/if}
			{#if todos.length !== 0 || categoryText !== undefined}
				<AddToDo {todoText} {todoDate} {categoryId} {apiBaseUrl} {userId} bind:todos={todos} bind:categories={categories} />
			{/if}
		{#each todos as todoItem (todoItem.id)}
			<ToDo {userId} {todoItem} {apiBaseUrl} bind:todos={todos} />
		{/each}
	{/if}
</div>
