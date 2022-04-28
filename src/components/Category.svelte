<script lang="ts">
  import { getToDo } from '../todo';
  import type { category } from '../interfaces'
	import { categoryTEXT } from '../lib/stores'

	export let category: category;
	export let userId: number

  async function fetchToDo(event: MouseEvent) {
		categoryTEXT.set(event.target!.innerHTML)
		await getToDo(event.target.getAttribute('data-id'), userId)
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