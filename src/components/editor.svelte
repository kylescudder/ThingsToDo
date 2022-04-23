<script type="ts">
	import DarkModeToggle from '../components/DarkModeToggle.svelte'
	import ToDo from '../components/ToDo.svelte'

	export let apiBaseUrl: string
	export let userId: number
	export let todos: Array<{
    text: String;
    targetDate: Date;
    targetDateString: string;
    completed: boolean;
    id: number;
    categorieId: number;
  }> = [];
</script>

<div class="w-full h-12 mt-2">
	<DarkModeToggle/>
</div>
<div class="relative flex min-h-screen flex-col mt-20">
	{#each todos as todo (todo.id)}
		<ToDo {userId} {todo} {apiBaseUrl}/>
	{/each}
</div>
