<script context="module">
	export const load = async ({ session }) => {
		return {
			props: {
				userId: session.userId
			}
		};
	}
</script>

<script lang="ts">
	export const prerender = true;
	import Workspace from '../components/Workspace.svelte'
	import { onMount } from 'svelte'
	import { darkModeSet } from '../lib/darkMode'
	export let userId: number;

	onMount(() => {
		darkModeSet()
	});
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>
{#if !userId}
	<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
		<div class="max-w-md w-full space-y-8 p-8 bg-gray-700 rounded-lg">
			<div>
				<img class="mx-auto h-12 w-auto" src='checklist.png' alt="Checklist Logo" />
				<h2 class="mt-6 text-center text-3xl font-extrabold text-white">ThingsToDo</h2>
				<p class="mt-2 text-center text-sm text-white">
					All your To Dos, organised, simplified, accessible...
				</p>
			</div>
			<form class="mt-8 space-y-6" action="#" method="POST">
				<div>
					<a
						class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						href="/login"
					>
						<span class="absolute left-0 inset-y-0 flex items-center pl-3">
							<!-- Heroicon name: solid/lock-closed -->
							<i class="fas fa-sign-in-alt text-indigo-500 group-hover:text-indigo-400" /></span
						>
						Login with GitHub
					</a>
				</div>
			</form>
		</div>
	</div>
{:else}
	<Workspace {userId} />
{/if}
