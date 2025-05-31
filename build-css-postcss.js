import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'
import fs from 'fs'

async function buildCSS() {
	try {
		const css = fs.readFileSync('./src/css/index.css')

		if (!fs.existsSync('./css')) fs.mkdirSync('./css', { recursive: true })

		const res = await postcss([
			tailwindcss({
				content: ['./src/components/**/*.{js,jsx,ts,tsx}'],
			}),
		]).process(css, {
			from: './src/css/index.css',
			to: './css/index.css',
		})

		fs.writeFileSync('./css/index.css', res.css)
	} catch (error) {
		console.error('Error building CSS:', error)
	}
}

buildCSS()

const watchMode = process.argv.includes('--watch') || process.argv.includes('-w')

if (watchMode) {
	fs.watch('./src/components', { recursive: true }, (eventType, filename) => {
		if (filename && filename.match(/\.(js|jsx|ts|tsx)$/)) buildCSS()
	})

	fs.watch('./src/css', { recursive: true }, (eventType, filename) => {
		if (filename && filename.match(/\.css$/)) buildCSS()
	})
}
