<script lang="ts">
	import WorkspaceList from '../components/workspacelist.svelte';
	import Editor from '../components/editor.svelte';
	import Loading from './Loading.svelte'
	export let isLoading = false
	export let userId: number;
	isLoading = true
	setTimeout(() => {
		isLoading = false
	}, 300);
</script>
{#if isLoading}
 <Loading/>
{:else}
	<div class="grid grid-cols-12 h-full w-full">
		<WorkspaceList {userId} />
		<div class="col-span-10 bg-slate-100 dark:bg-slate-900">
			<Editor />
		</div>
	</div>
{/if}