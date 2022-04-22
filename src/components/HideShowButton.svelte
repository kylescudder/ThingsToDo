<script lang="ts">
	export let hideEmpty: boolean
	function hideEmptyCategories(e: MouseEvent) {
    if (e.target !== null) {
      const categoryHeader = document.querySelectorAll('.categoryHeader')
      if (e.target.classList.contains('hiddenCategory')) {
        hideEmpty = false
        showHide(categoryHeader, 'remove')
      } else {
        hideEmpty = true
        showHide(categoryHeader, 'add')
      }
    }
  }
	function showHide(categoryHeader: NodeListOf<Element>, action: string) {
    if(categoryHeader!=null) {
      categoryHeader.forEach(element => {
        if(action === 'remove') {
          element.classList.remove('hidden');
        } else {
          const dataCount = element.getAttribute('data-count')
          if (dataCount !== null) {
            if (dataCount.toString() === '0')
            element.classList.add('hidden');
          }
        }
    });
    }
  }
</script>
{#if hideEmpty !== false}
	<i class="fa-solid fa-eye-slash hiddenCategory hideShowCategories dark:text-white text-gray-900" 
		on:click={(event) => hideEmptyCategories(event)}></i>
{:else}
	<i class="fa-solid fa-eye hideShowCategories dark:text-white text-gray-900" 
		on:click={(event) => hideEmptyCategories(event)}></i>
{/if}