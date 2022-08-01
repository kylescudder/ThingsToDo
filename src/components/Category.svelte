<script lang="ts">
	import { getToDo } from '../lib/todo';
	import type { category } from '../lib/interfaces';
	import { categoryTEXT } from '$lib/stores';

	export let categoryItem: category;
	export let at: string;

	const fetchToDo = async (event: MouseEvent) => {
		const target = event.target as HTMLDivElement;
		const categoryTarget = target.closest('.categoryHeader');
		if (categoryTarget !== null) {
			categoryTEXT.set(categoryTarget.firstElementChild?.innerHTML || '');
			const Id = categoryTarget.getAttribute('data-id');
			if (Id !== null) {
				await getToDo(parseInt(Id), at);
			}
		}
	};
</script>

<div
	on:click={(event) => fetchToDo(event)}
	class="categoryHeader"
	class:hidden={categoryItem.toDoCount === 0}
	data-count={categoryItem.toDoCount}
	data-id={categoryItem.id}
>
	<div class="my-8 w-auto text-white text-2xl md:text-lg cursor-pointer hover:text-gray-400">
		{categoryItem.text}
	</div>
</div>
