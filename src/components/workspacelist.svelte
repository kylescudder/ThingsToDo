<script lang="ts">
  import { onMount } from 'svelte'
  
  import LogoutButton from './LogoutButton.svelte'
  import HideShowButton from './HideShowButton.svelte'
	import Loading from './Loading.svelte'
	import Categorie from './Categorie.svelte'
	import checklistLogo from '../images/checklist.png'
  
  export let apiBaseUrl: string
	export let userId: number
  export let isLoading = false
	let categories: Array<{
    id: number;
    text: string;
    toDoCount: number;
  }> = [];
  export let todos: Array<{
    text: String;
    targetDate: Date;
    targetDateString: string;
    completed: boolean;
    id: number;
    categorieId: number;
  }> = [];
  //let selected: number;

	onMount(() => {
    loadContent()
  })
  async function loadContent() {
    isLoading = true
    await categoryPopulate()
    isLoading = false
  }
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
    categories = categoriePayload.payload;
  }
</script>
<div class="col-span-2 bg-blue-500 h-full dark:bg-gray-700">
  <div class="ml-3">
    {#if isLoading}
      <Loading/>
    {:else}
      <div class="grid grid-cols-4 mt-4">
        <img class="h-8 w-auto col-span-1" src={checklistLogo} alt="Checklist Logo">	
        <p class="text-lg text-white text-center col-span-3">ThingsToDo</p>
      </div>
      <section class="mt-4">
        <p class="mt-4 text-lg font-bold text-white">
          Categories
          <HideShowButton/>
        </p>
        {#each categories as category (category.id)}
          <Categorie {category} {apiBaseUrl} {userId} bind:todos={todos} />
        {/each}
      </section>
      <LogoutButton/>
    {/if}
  </div>
</div>