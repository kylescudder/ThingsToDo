<script lang="ts">
	import { onMount } from 'svelte';
	import { setToggle } from '../lib/darkMode';

	onMount(() => {
		setToggle();
	});
</script>

<input type="checkbox" id="toggle" class="toggle--checkbox" />
<label for="toggle" class="toggle--label float-right mr-2">
	<span class="toggle--label-background" />
</label>
