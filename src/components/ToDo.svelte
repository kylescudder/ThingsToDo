<script lang="ts">
	import Notify from 'simple-notify'
	import 'simple-notify/dist/simple-notify.min.css'
	
	export let apiBaseUrl: string
	export let userId: number
	export let todo: {
    text: String;
    targetDate: Date;
    targetDateString: string;
    completed: boolean;
    id: number;
    categorieId: number;
  }

	async function clickToDo(todo) {
		todo.completed = !todo.completed;

		const response = await fetch(`${apiBaseUrl}/todo`, {
			method: "PUT",
      body: JSON.stringify({
				githubId: userId,
        id: todo.id
      }),
			headers: {
        "content-type": "application/json",
      },
    });
		successToast()
  }
	async function successToast() {
		new Notify ({
			status: 'success',
			title: 'Notify Title',
			text: 'Notify text lorem ipsum',
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
<!-- card -->
<div class="mx-auto w-11/12 bg-blue-500 h-full dark:bg-gray-700 cursor-pointer
	rounded-2xl shadow-xl dark:shadow-slate-300/60 shadow-blue-300/60"
	on:click={event => clickToDo(todo)} data-id={todo.id}>
	<!-- text information -->
	<div class="grid grid-cols-6">
		<div class="p-4 float-left col-span-4 my-auto">
			<span class="text-2xl font-medium float-left text-white inline-block align-middle">{todo.text}</span>
		<!--<p class="text-sm tracking-tight font-light text-white dark:text-slate-400 leading-6">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>-->
	</div>
	<div class="p-4 float-left col-span-1 my-auto">
		<h1 class="text-2xl font-medium float-left text-white">{todo.targetDateString}</h1>
	</div>
	<div class="p-4 float-left col-span-1 my-auto">
		<span class="col-span-1">
			{#if todo.completed}
				<i class="fas fa-circle-check text-5xl font-medium float-right text-white"></i>
			{:else}
				<i class="far fa-circle-check text-5xl font-medium float-right text-white"></i>
			{/if}
		</span>
	</div>
</div>
</div>
