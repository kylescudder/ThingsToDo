<script lang="ts">
  import { getToDo } from '../todo';
  import type { categoryList, todo } from '../interfaces'

	export let category: categoryList;
	export let todos: Array<todo> = [];
	export let categoryText: string
	export let categoryId: number
	export let apiBaseUrl: string
	export let userId: number
	
  async function fetchToDo(event: MouseEvent) {
		categoryText = event.target!.innerHTML
		categoryId = event.target!.getAttribute('data-id')
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