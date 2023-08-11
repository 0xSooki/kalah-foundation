/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	plugins: [require('daisyui')],
	darkMode: 'class',
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		themes: [
			{
				default: {
					primary: '#64230D',
					secondary: '#FCF2C1',
				},
			},
		],
	},
	theme: {
		fontFamily: {
			rubik: ['Rubik Mono One', 'sans-serif'],
		},
		extend: {
			width: { 18: '72px' },
			height: { 18: '72px' },
			colors: {
				brand: '#FF822C',
				darkest: '#240C04',
				dark: '#64230D',
				mid: '#FDE047',
				light: '#FCF2C1',
				lightest: '#fcf6d7',
			},
		},
	},
}
