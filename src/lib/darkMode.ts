export const darkModeSet = () => {
	// Change the icons inside the button based on previous settings
	if (localStorage.getItem('color-theme') === 'dark') {
		setDarkTheme();
	}
}
const toggleDarkMode = () => {
		const themeToggleBtn = document.querySelector('.toggle--label') as HTMLLabelElement;

	if (themeToggleBtn !== null) {
		themeToggleBtn.addEventListener('click',() => {
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
}
export const setToggle = () => {
	toggleDarkMode()
	const themeToggleCheckbox = document.querySelector('.toggle--checkbox') as HTMLInputElement;
	if (localStorage.getItem('color-theme') === 'dark') {
		themeToggleCheckbox.checked = true;
	}
}
const setLightTheme = () => {
	document.documentElement.classList.remove('dark');
	localStorage.setItem('color-theme', 'light');
}
const setDarkTheme = () => {
	document.documentElement.classList.add('dark');
	localStorage.setItem('color-theme', 'dark');
}