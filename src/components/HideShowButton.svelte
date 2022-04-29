<script lang="ts">
  import { onMount } from 'svelte'
	import { hideEmpty } from '$lib/stores'

  onMount(() => {
    hideShowButtonTooltip()
  })

</script>
{#if hideEmpty !== false}
	<i class="fas fa-eye-slash hiddenCategory hideShowCategories text-white" 
		on:click={(event) => hideEmptyCategories(event)}></i>
{:else}
	<i class="fas fa-eye hideShowCategories text-white" 
		on:click={(event) => hideEmptyCategories(event)}></i>
{/if}