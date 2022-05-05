export const darkModeSet = () => {
	const themeToggleBtn = document.querySelector('.toggle--label') as HTMLLabelElement;
	const themeToggleCheckbox = document.querySelector('.toggle--checkbox') as HTMLInputElement;

	if (themeToggleBtn !== null) {
		themeToggleBtn.addEventListener('click', function () {
			// if set via local storage previously
			if (localStorage.getItem('color-theme')) {
				if (
					localStorage.getItem('color-theme') === 'light' ||
					(!('color-theme' in localStorage) &&
						window.matchMedia('(prefers-color-scheme: dark)').matches)
				) {
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
		setDarkTheme();
		themeToggleCheckbox.checked = true;
	}
	function setLightTheme() {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('color-theme', 'light');
	}
	function setDarkTheme() {
		document.documentElement.classList.add('dark');
		localStorage.setItem('color-theme', 'dark');
	}
}