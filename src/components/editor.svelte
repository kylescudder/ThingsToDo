<script type="ts">
	import DarkModeToggle from '../components/DarkModeToggle.svelte'
	import ToDo from '../components/ToDo.svelte'
	import type { todo } from '../interfaces'

	export let apiBaseUrl: string
	export let userId: number
	export let todos: Array<todo> = [];
	let todoItem: todo;
</script>

<div class="w-full h-12 mt-2">
	<DarkModeToggle/>
</div>
<div class="relative flex min-h-screen flex-col mt-20">
	{#each todos as todoItem (todoItem.id)}
		<ToDo {userId} {todoItem} {apiBaseUrl}/>
	{/each}
</div>
