<script lang="ts">
	import { getToDo } from '../todo';
	import type { category } from '../interfaces';
	import { categoryTEXT } from '$lib/stores';

	export let categoryItem: category;
	export let userId: number;

	async function fetchToDo(event: MouseEvent) {
		const target = event.target as HTMLHeadElement;
		if (target !== null) {
			categoryTEXT.set(target.innerHTML);
			const Id = target.getAttribute('data-id');
			if (Id !== null) {
				await getToDo(parseInt(Id), userId);
			}
		}
	}
</script>

<h2
	on:click={(event) => fetchToDo(event)}
	class="categoryHeader m-2 w-auto text-white cursor-pointer hover:text-gray-400"
	class:hidden={categoryItem.toDoCount === 0}
	data-count={categoryItem.toDoCount}
	data-id={categoryItem.id}
>
	{categoryItem.text}
</h2>
