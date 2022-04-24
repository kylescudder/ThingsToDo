<script lang="ts">
  import dayjs from 'dayjs'
  import { getToDo } from '../todo';
  import type { todo } from '../interfaces'

	export let category: {
    id: number;
    text: string;
    toDoCount: number;
  };
	export let todos: Array<todo> = [];

	export let apiBaseUrl: string
	export let userId: number

  async function fetchToDo(event) {
    todos = await getToDo(event.target.getAttribute('data-id'), apiBaseUrl, userId)
  }
</script>
<h2
 	on:click={(event) => fetchToDo(event)}
	class="categoryHeader m-2 w-auto text-white cursor-pointer hover:text-gray-400"
	class:hidden={category.toDoCount === 0}
	data-count={category.toDoCount}
	data-id={category.id}>
	{category.text}
</h2>