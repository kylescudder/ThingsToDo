<script lang="ts">
import { onMount } from "svelte";

	onMount(() => {
		var themeToggleBtn = document.querySelector('.toggle--label') as HTMLLabelElement;
		var themeToggleCheckbox = document.querySelector('.toggle--checkbox') as HTMLInputElement;

		if (themeToggleBtn !== null) {
			themeToggleBtn.addEventListener('click', function() {
				// if set via local storage previously
				if (localStorage.getItem('color-theme')) {
					if (localStorage.getItem('color-theme') === 'light' || !('color-theme' in localStorage)) {
						setDarkTheme();
					} else {
						setLightTheme();
					}
				} else {
					if (document.documentElement.classList.contains('dark')) {
						document.documentElement.classList.remove('dark');
						localStorage.setItem('color-theme', 'light');
					} else {
						document.documentElement.classList.add('dark');
						localStorage.setItem('color-theme', 'dark');
					}
				}
			});
		}
		// Change the icons inside the button based on previous settings
		if (localStorage.getItem('color-theme') === 'dark') {
				setDarkTheme()
				themeToggleCheckbox.checked = true
		}
		function setLightTheme() {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('color-theme','light');
		}
		function setDarkTheme() {
			document.documentElement.classList.add('dark');
			localStorage.setItem('color-theme','dark');
		}
	})
</script>
<input type="checkbox" id="toggle" class="toggle--checkbox" />
<label for="toggle" class="toggle--label float-right mr-2">
	<span class="toggle--label-background" />
</label>