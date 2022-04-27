<script lang="ts">
	import { addToDo, getToDo } from '../todo'
	import { categoriesPopulate } from '../categories'
	import type { categoryList, todo } from '../interfaces'

	export let todoText: string
	export let todoDate: Date
	export let categoryId: number
	export let apiBaseUrl: string
	export let userId: number
	export let todos: Array<todo> = [];
	export let categories: Array<categoryList> = [];

	const todoAdd =  async (categoryId: number, todoText: string, todoDate: Date) => {
		await addToDo(categoryId, todoText, todoDate, apiBaseUrl, userId)
		categories = await categoriesPopulate(apiBaseUrl, userId)
		todos = await getToDo(categoryId, apiBaseUrl, userId)
	}
</script>
<div class="grid grid-cols-11 content-center">
	<input type="text" bind:value={todoText} class="ml-0 form-control col-span-5"
		id="todoText" placeholder="New To Do" />
	<input type="datetime-local" bind:value={todoDate} class="form-control col-span-5"
		id="todoText" />
	<button class="col-start-11 col-span-1 btnAdd h-3/6 my-auto" 
		on:click={() => ( todoAdd(categoryId, todoText, todoDate) )} >Add</button>
</div>