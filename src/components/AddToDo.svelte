<script lang="ts">
	import { addToDo, getToDo } from '../lib/todo';
	import { categoriesPopulate } from '../lib/categories';
	import { categoryID } from '$lib/stores';

	let todoText: string;
	let todoDate: Date;
	export let at: string;

	const todoAdd = async (categoryId: number, text: string, date: Date) => {
		if (todoText !== '') {
			await addToDo(categoryId, text, date, at);
			await categoriesPopulate(at);
			await getToDo(categoryId, at);
			todoText = '';
			todoDate = new Date(0);
		}
	};

	let payloadCategoryId: number;
	categoryID.subscribe((value) => {
		payloadCategoryId = value;
	});
</script>

<div class="grid grid-cols-11 content-center">
	<input
		type="text"
		bind:value={todoText}
		class="ml-0 form-control col-span-11 md:col-span-5"
		id="todoText"
		placeholder="New To Do"
	/>
	<input
		type="datetime-local"
		bind:value={todoDate}
		class="form-control col-span-11 md:col-span-5"
		id="todoText"
	/>
	<button
		class="md:col-start-11 col-span-11 md:col-span-1 btnAdd md:h-3/6 my-auto"
		on:click={() => todoAdd(payloadCategoryId, todoText, todoDate)}>Add</button
	>
</div>
