<script lang="ts">
  import { onMount } from 'svelte'
  import 'tw-elements';
  
  import LogoutButton from './LogoutButton.svelte'
  import HideShowButton from './HideShowButton.svelte'
	import Loading from './Loading.svelte'
	import Category from './Category.svelte'
	import Modal from './Modal.svelte'
	import checklistLogo from '../images/checklist.png'
  import type { todo } from '../interfaces'
  import { categoriesPopulate, addCategory } from '../categories'
  import type { categoryList } from '../interfaces'
  export let apiBaseUrl: string
  export let userId: number
	export let newCategory: string
  export let isLoading = false
	export let todos: Array<todo> = [];
  export let categories: Array<categoryList> = [];

  //let selected: number;

	onMount(() => {
    loadContent()
  })
  async function loadContent() {
    isLoading = true
    categories = await categoriesPopulate(apiBaseUrl, userId)
    isLoading = false
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
          {#if categories.length !== 0}
            <HideShowButton/>
          {/if}
          <i class="fas fa-plus cursor-pointer" data-bs-toggle="modal" data-bs-target='#addCategory' />
          <Modal id='addCategory' title='Add Category' {apiBaseUrl} {userId} bind:todos={todos} bind:categoryText={categoryText} />
        </p>
        {#if categories.length !== 0}
          {#each categories as category (category.id)}
            <Category bind:categoryText={categoryText} bind:categoryId={categoryId} {category} {apiBaseUrl} {userId} bind:todos={todos} />
          {/each}
        {:else}
          <p class="text-white text-lg mt-4 text-center">Add a category using the 
            <i class="fas fa-plus"></i> icon above.</p>
        {/if}
      </section>
      <LogoutButton/>
    {/if}
  </div>
</div>