<script lang="ts">
	import { onMount } from 'svelte';
	import { hideEmptyCategories, hideShowButtonTooltip } from '../lib/categories';
	import { hideEmpty } from '$lib/stores';
	import Fa from 'svelte-fa'
	const { faEye, faEyeSlash } = require('@fortawesome/free-solid-svg-icons')

	onMount(() => {
		hideShowButtonTooltip();
	});

	let payloadHideEmpty: boolean;
	hideEmpty.subscribe((value) => {
		payloadHideEmpty = value;
	});
</script>

{#if payloadHideEmpty !== false}
	<Fa icon={faEyeSlash}
		class="hiddenCategory hideShowCategories text-white"
		on:click={(event) => hideEmptyCategories(event)}
	/>
{:else}
	<Fa icon={faEye}
		class="hideShowCategories text-white"
		on:click={(event) => hideEmptyCategories(event)}
	/>
{/if}
