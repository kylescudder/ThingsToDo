<script lang="ts">
  import { onMount } from 'svelte'
  import tippy, {animateFill} from 'tippy.js';
  import 'tippy.js/dist/tippy.css'; // optional for styling
  import 'tippy.js/dist/backdrop.css';
  import 'tippy.js/animations/shift-away-subtle.css';
	
  let hideEmpty: boolean

  onMount(() => {
    hideShowButtonTooltip()
  })

  function hideShowButtonTooltip() {
    tippy('.hideShowCategories',{
      content: 'Hide or Show categories with no To Dos currently in it.',
      placement: 'right',
      inertia: true,
      animation: 'shift-away-subtle',
      animateFill: true,
      plugins: [animateFill],
      delay: [350, null],
    });
  }

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
    setTimeout(() => {
      hideShowButtonTooltip()
    }, 200);
  }
</script>
{#if hideEmpty !== false}
	<i class="fas fa-eye-slash hiddenCategory hideShowCategories dark:text-white text-gray-900" 
		on:click={(event) => hideEmptyCategories(event)}></i>
{:else}
	<i class="fas fa-eye hideShowCategories dark:text-white text-gray-900" 
		on:click={(event) => hideEmptyCategories(event)}></i>
{/if}