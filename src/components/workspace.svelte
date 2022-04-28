<script lang="ts">
	import WorkspaceList from '../components/workspacelist.svelte';
	import Editor from './Editor.svelte';
	import Loading from './Loading.svelte'
	import type { category, todo } from '../interfaces'

	export let isLoading = false
	export let userId: number;
	isLoading = true
	setTimeout(() => {
		isLoading = false
	}, 300);
	export let todos: Array<todo> = [];
	export let categories: Array<category> = [];
</script>
{#if isLoading}
 <Loading/>
{:else}
	<div class="grid grid-cols-12 h-full w-full">
		<WorkspaceList {userId} {categories} />
		<div class="col-span-10 bg-slate-100 dark:bg-slate-900">
			<Editor {userId} {todos} />
		</div>
	</div>
{/if}