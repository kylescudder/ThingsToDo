<script lang="ts">
	import WorkspaceList from './Workspacelist.svelte'
	import Editor from './Editor.svelte';
	import Loading from './Loading.svelte';

	export let isLoading = false;
	export let at: string;
	isLoading = true;
	setTimeout(() => {
		isLoading = false;
	}, 300);
</script>

{#if isLoading}
	<Loading />
{:else}
	<div class="relative min-h-screen md:flex sm:mobileContainer" data-dev-hint="container">		
		<WorkspaceList {at} />
		<main id="content" class="flex-1 p-6 lg:px-8">
			<div class="mx-auto">
					<Editor {at} />
			</div>
		</main>
	</div>
{/if}