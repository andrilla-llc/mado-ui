/** @type {import('postcss-load-config').Config} */
const config = {
	plugins: {
		'@tailwindcss/postcss': {
			content: ['./src/components/**/*.{js,jsx,ts,tsx}'],
		},
	},
}

export default config
