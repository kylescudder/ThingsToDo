<script lang="ts">
  import { onMount } from 'svelte'
  import 'tw-elements';
  
  import LogoutButton from './LogoutButton.svelte'
  import HideShowButton from './HideShowButton.svelte'
	import Loading from './Loading.svelte'
	import Category from './Category.svelte'
	import Modal from './Modal.svelte'
	import checklistLogo from '../images/checklist.png'
  import type { category } from '../interfaces'
  import { categoriesPopulate } from '../categories'
  import { categoryList } from '../lib/stores'

  export let userId: number
  export let isLoading = false

	onMount(() => {
    loadContent()
  })
  async function loadContent() {
    isLoading = true
    await categoriesPopulate(userId)
    isLoading = false
  }
  let payload: Array<category> = []

	categoryList.subscribe(value => {
		payload = value;
	});
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
          {#if payload.length !== 0}
            <HideShowButton/>
          {/if}
          <i class="fas fa-plus cursor-pointer" data-bs-toggle="modal" data-bs-target='#addCategory' />
          <Modal id='addCategory' title='Add Category' {userId} />
        </p>
        {#if payload.length !== 0}
          {#each payload as category (category.id)}
            <Category {category} {userId} />
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