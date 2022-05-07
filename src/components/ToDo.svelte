<script lang="ts">
	import type { todo } from '../lib/interfaces';
	import { clickToDo } from '../lib/todo';

	export let userId: number;
	export let todoItem: todo;
</script>

<div
	class="bg-blue-500 h-full dark:bg-gray-700 cursor-pointer
	rounded-2xl shadow-xl dark:shadow-slate-300/60 shadow-blue-300/60 todoItem my-8"
	on:click={(event) => clickToDo(todoItem, event, userId)}
	data-id={todoItem.id}
	data-categoryid={todoItem.categoryId}
>
	<div class="grid grid-cols-7" class:completed={todoItem.completed}>
		<div class="p-4 float-left col-span-3 md:col-span-5 my-auto">
			<span class="md:text-2xl text-sm font-medium float-left text-white inline-block align-middle"
				>{todoItem.text}</span
			>
		</div>
		<div class="p-4 float-left col-span-2 md:col-span-1 my-auto">
			<h1 class="md:text-2xl text-sm font-medium float-left text-white">{todoItem.targetDateString}</h1>
		</div>
		<div class="p-4 float-left col-span-2 md:col-span-1 my-auto">
			<span>
				{#if todoItem.completed}
					<i class="fas fa-circle-check md:text-5xl text-sm font-medium float-right text-white"></i>
				{:else}
					<i class="far fa-circle-check md:text-5xl text-2xl font-medium float-right text-white"></i>
				{/if}
			</span>
		</div>
	</div>
</div>
