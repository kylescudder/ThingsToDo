<script lang="ts">
	import { addToDo, getToDo } from '../todo'
	import { categoriesPopulate } from '../categories'
	import { categoryID } from '$lib/stores'

	export let todoText: string
	export let todoDate: Date
	export let userId: number

	const todoAdd =  async (categoryId: number, text: string, date: Date) => {
		if (todoText !== '') {
			await addToDo(categoryId, text, date, userId)
			await categoriesPopulate(userId)
			await getToDo(categoryId, userId)
			todoText = ''
			todoDate = new Date(0)
		}
	}

	let payloadCategoryId: number
	categoryID.subscribe(value => {
		payloadCategoryId = value;
	});

</script>
<div class="grid grid-cols-11 content-center">
	<input type="text" bind:value={todoText} class="ml-0 form-control col-span-5"
		id="todoText" placeholder="New To Do" />
	<input type="datetime-local" bind:value={todoDate} class="form-control col-span-5"
		id="todoText" />
	<button class="col-start-11 col-span-1 btnAdd h-3/6 my-auto" 
		on:click={() => ( todoAdd(payloadCategoryId, todoText, todoDate) )} >Add</button>
</div>