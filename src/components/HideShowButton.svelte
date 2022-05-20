<script lang="ts">
	import { onMount } from 'svelte';
	import { hideEmptyCategories, hideShowButtonTooltip } from '../lib/categories';
	import { hideEmpty } from '$lib/stores';
	import FaEye from 'svelte-icons/fa/FaEye.svelte'
	import FaEyeSlash from 'svelte-icons/fa/FaEyeSlash.svelte'

	onMount(() => {
		hideShowButtonTooltip();
	});

	let payloadHideEmpty: boolean;
	hideEmpty.subscribe((value) => {
		payloadHideEmpty = value;
	});
</script>

{#if payloadHideEmpty !== false}
	<div class="w-6 inline-table hiddenCategory hideShowCategories text-white"
		on:click={(event) => hideEmptyCategories(event)}>
		<FaEyeSlash />
	</div>
{:else}
	<div class="w-6 inline-table hideShowCategories text-white"
		on:click={(event) => hideEmptyCategories(event)}>
		<FaEye />
	</div>
{/if}
