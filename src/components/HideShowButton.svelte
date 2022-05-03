<script lang="ts">
	import { onMount } from 'svelte';
	import { hideEmptyCategories, hideShowButtonTooltip } from '../categories';
	import { hideEmpty } from '$lib/stores';

	onMount(() => {
		hideShowButtonTooltip();
	});

	let payloadHideEmpty: boolean;
	hideEmpty.subscribe((value) => {
		payloadHideEmpty = value;
	});
</script>

{#if payloadHideEmpty !== false}
	<i
		class="fas fa-eye-slash hiddenCategory hideShowCategories text-white"
		on:click={(event) => hideEmptyCategories(event)}
	/>
{:else}
	<i
		class="fas fa-eye hideShowCategories text-white"
		on:click={(event) => hideEmptyCategories(event)}
	/>
{/if}
