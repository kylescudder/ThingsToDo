module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/tw-elements/dist/js/**/*.js'],
	theme: {
		borderWidth: {
			DEFAULT: '1px',
			3: '3px'
		}
	},
	plugins: [require('tw-elements/dist/plugin')],
	darkMode: 'class'
};