<script type="ts">
	import DarkModeToggle from './DarkModeToggle.svelte'
	import ToDo from './ToDo.svelte'
	import type { categoryList, todo } from '../interfaces'
	import AddToDo from './AddToDo.svelte'

	export let userId: number
	export let todos: Array<todo> = [];
	export let categories: Array<categoryList> = [];
	export let apiBaseUrl: string
	export let categoryText: string
	export let categoryId: number
	export let todoText: string
	export let todoDate: Date
</script>

<div class="w-full h-12 mt-2">
	<DarkModeToggle/>
</div>
<div class="relative flex min-h-screen flex-col mt-20">
	<div class="mx-auto w-11/12">
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
	</div>
</div>
