<script lang="ts">
	import checklistLogo from '../images/checklist.png'
	import { onMount } from 'svelte'
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // optional for styling
  import LogoutButton from './LogoutButton.svelte';
  import HideShowButton from './HideShowButton.svelte';
	//import dayjs from 'dayjs'
	const apiBaseUrl = import.meta.env.VITE_API_URL;
	export let userId: number;
  let todos: Array<{
    text: String;
    targetDate: Date;
    targetDateString: string;
    completed: boolean;
    id: number;
    categorieId: number;
  }> = [];
	let categorie: Array<{
    id: number;
    text: string;
  }> = [];
  //let selected: number;

	onMount(() => {
		categoryPopulate()
	})
    hideShowButtonTooltip()
  function hideShowButtonTooltip() {
    tippy('.hideShowCategories',{
      content: 'Hide or Show categories with no To Dos currently in it.',
    });
  }

	//async function getToDo() {
  //  const response = await fetch(`${apiBaseUrl}/todo`, {
  //    headers: {
  //      authorization: `Bearer ${accessToken}`,
  //    },
  //  });
  //  const payload = await response.json();
  //  todos = payload.data;
  //  //todos.forEach(todo => {
  //  //  todo.targetDateString = dayjs(todo.targetDate).format('DD/MM/YYYY HH:mm')
  //  //});
  //  categoryPopulate();
  //  return todos;
  //}
  async function categoryPopulate() {
    const categorieResponse = await fetch(`${apiBaseUrl}/categories`, {
			method: "POST",
      body: JSON.stringify({
        githubId: userId,
      }),
			headers: {
        "content-type": "application/json",
      },
    });
    const categoriePayload = await categorieResponse.json();
    categorie = categoriePayload.payload;
    //selected = categorie[0].id;
    //setTimeout(function () {
    //  hideEmptyCategories();
    //}, 100);
  }
	//function workspaceHide(event) {
  //  let target = event.target
  //  if (event.target.localName === 'i') {
  //    target = event.target.parentElement
  //  }

  //  if (target.nextElementSibling.style.maxHeight) {
  //    target.nextElementSibling.style.maxHeight = null;
  //    target.lastElementChild.classList.remove("expandedIcon");
  //  } else {
  //    target.nextElementSibling.style.maxHeight = target.nextElementSibling.scrollHeight + "px";
  //    target.lastElementChild.classList.add("expandedIcon");
  //  }
  //}
</script>
<div class="col-span-2 bg-blue-500 h-full dark:bg-gray-300">
	<div class="ml-3">
		<div class="grid grid-cols-4 mt-4">
			<img class="h-8 w-auto col-span-1" src={checklistLogo} alt="Checklist Logo">	
			<p class="text-lg text-white dark:text-gray-900 text-center col-span-3">ThingsToDo</p>
		</div>
		<section class="mt-4">
			{#each categorie as categories (categories.id)}
				<!--<article class="my-4 text-white dark:text-gray-900 cursor-pointer categoryHeader"
					on:click={(event) => workspaceHide(event)}>
					<i class="fa-solid fa-book"></i>
					{workspace.name}
					  <i class="fa-solid fa-chevron-right float-right mr-4"></i>
				</article>-->
				<h2 on:click={(event) => console.log('test')} class="categoryHeader m-2 w-auto">
      {categories.text}
      <!--<i class="fa-solid fa-arrow-right pl-2"></i>-->
    </h2>
			{/each}
		</section>
	</div>
        <p class="mt-4 text-lg font-bold dark:text-white text-gray-900">
          Categories
          <HideShowButton hideEmpty={hideEmpty}/>
        </p>
      <LogoutButton/>
</div>