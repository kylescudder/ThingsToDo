<script lang="ts">
  import dayjs from 'dayjs'

  import type { todo } from '../interfaces'

	export let category: {
    id: number;
    text: string;
    toDoCount: number;
  };
	export let todos: Array<todo> = [];

	export let apiBaseUrl: string
	export let userId: number

 async function getToDo(event: MouseEvent) {
    const response = await fetch(`${apiBaseUrl}/todo`, {
			method: "POST",
      body: JSON.stringify({
        githubId: userId,
        categorieId: event.target.getAttribute('data-id')
      }),
			headers: {
        "content-type": "application/json",
      },
    });
    const payload = await response.json();
    todos = payload.data;
    todos.forEach(todo => {
      todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm')
    });
    return todos;
  }

</script>
<h2
 	on:click={event => getToDo(event)}
	class="categoryHeader m-2 w-auto text-white cursor-pointer hover:text-gray-400"
	class:hidden={category.toDoCount === 0}
	data-count={category.toDoCount}
	data-id={category.id}>
	{category.text}
</h2>