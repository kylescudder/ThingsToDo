<script lang="ts">
	import checklistLogo from '../images/checklist.png'
	import { onMount } from 'svelte'
  import tippy from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // optional for styling
  import LogoutButton from './LogoutButton.svelte';
  import HideShowButton from './HideShowButton.svelte';
	import Loading from './Loading.svelte'
	//import dayjs from 'dayjs'
	const apiBaseUrl = import.meta.env.VITE_API_URL;
	export let userId: number;
  export let hideEmpty: boolean;
  export let isLoading = false
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
    toDoCount: number;
  }> = [];
  //let selected: number;

	onMount(() => {
    loadContent()
  })
  async function loadContent() {
    isLoading = true
    await categoryPopulate()
    isLoading = false
    hideShowButtonTooltip()
  }
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
<div class="col-span-2 bg-blue-500 h-full dark:bg-gray-700">
  <div class="ml-3">
    {#if isLoading}
      <Loading/>
    {:else}
      <div class="grid grid-cols-4 mt-4">
        <img class="h-8 w-auto col-span-1" src={checklistLogo} alt="Checklist Logo">	
        <p class="text-lg dark:text-white text-gray-900 text-center col-span-3">ThingsToDo</p>
      </div>
      <section class="mt-4">
        <p class="mt-4 text-lg font-bold dark:text-white text-gray-900">
          Categories
          <HideShowButton hideEmpty={hideEmpty}/>
        </p>
        {#each categories as category (category.id)}
          <Categorie {category} {apiBaseUrl} {userId} {todos} />
        {/each}
      </section>
      <LogoutButton/>
    {/if}
  </div>
</div>