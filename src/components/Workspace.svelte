<script lang="ts">
	import WorkspaceList from './Workspacelist.svelte'
	import Editor from './Editor.svelte';
	import Loading from './Loading.svelte';

	export let isLoading = false;
	export let userId: number;
	isLoading = true;
	setTimeout(() => {
		isLoading = false;
	}, 300);
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="grid grid-cols-12 h-full w-full">
		<WorkspaceList {userId} />
		<div class="col-span-10 min-h-screen overflow-y-scroll">
			<Editor {userId} />
		</div>
	</div>
{/if}
