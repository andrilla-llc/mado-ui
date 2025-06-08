import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

const createConfig = (input, outputName) => ({
	input,
	output: [
		{
			file: `dist/${outputName}.js`,
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: `dist/${outputName}.esm.js`,
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [
		peerDepsExternal(),
		postcss({
			extensions: ['.css'],
			extract: 'css/index.css',
			minimize: true,
			config: {
				path: './postcss.config.mjs',
			},
			input: 'src/css/index.css',
			verbose: true,
		}),
		resolve(),
		typescript({ tsconfig: './tsconfig.json' }),
	],
	external: ['react', 'react-dom', '@headlessui/react', 'tailwind-merge'],
})

export default [
	createConfig('src/index.ts', 'index'),
	createConfig('src/components.ts', 'components'),
	createConfig('src/hooks.ts', 'hooks'),
	createConfig('src/icons.ts', 'icons'),
	createConfig('src/utils.ts', 'utils'),
]
