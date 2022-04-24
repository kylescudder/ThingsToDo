<script lang="ts">
	import Notify from 'simple-notify'
	import 'simple-notify/dist/simple-notify.min.css'
	
	import type { todo } from '../interfaces'
	import { getToDo } from '../todo'

	export let apiBaseUrl: string
	export let userId: number
	export let todoItem: todo

	async function clickToDo(todoItem: todo) {
		todoItem.completed = !todoItem.completed;

		const response = await fetch(`${apiBaseUrl}/todo`, {
			method: "PUT",
      body: JSON.stringify({
				githubId: userId,
        id: todoItem.id
      }),
			headers: {
        "content-type": "application/json",
      },
    });
		todos = await getToDo(event.target.closest('.todoItem').getAttribute('data-categorieid'), apiBaseUrl, userId)
		successToast(todoItem)
  }
	async function successToast(todoItem: todo) {
		let title: string
		let text: string
		if (todoItem.completed) {
			title = 'Completed! 🥳🎉'
			text = `Complete ${todoItem.text}`
		} else {
			title = 'Uncompleted! 😥🤦‍♀️'
			text = `Uncomplete ${todoItem.text}`
		}
		new Notify ({
			status: 'success',
			title: title,
			text: text,
			effect: 'slide',
			speed: 300,
			customClass: '',
			customIcon: '',
			showIcon: true,
			showCloseButton: true,
			autoclose: true,
			autotimeout: 3000,
			gap: 20,
			distance: 20,
			type: 1,
			position: 'right bottom'
		})
	}
</script>
<div class="mx-auto w-11/12 bg-blue-500 h-full dark:bg-gray-700 cursor-pointer
	rounded-2xl shadow-xl dark:shadow-slate-300/60 shadow-blue-300/60"
	on:click={event => clickToDo(todoItem)} data-id={todoItem.id}>
	<div class="grid grid-cols-6">
		<div class="p-4 float-left col-span-4 my-auto">
			<span class="text-2xl font-medium float-left text-white inline-block align-middle">{todoItem.text}</span>
		</div>
		<div class="p-4 float-left col-span-1 my-auto">
			<h1 class="text-2xl font-medium float-left text-white">{todoItem.targetDateString}</h1>
		</div>
		<div class="p-4 float-left col-span-1 my-auto">
			<span class="col-span-1">
				{#if todoItem.completed}
					<i class="fas fa-circle-check text-5xl font-medium float-right text-white"></i>
				{:else}
					<i class="far fa-circle-check text-5xl font-medium float-right text-white"></i>
				{/if}
			</span>
		</div>
	</div>
</div>
