import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default {
	input: 'src/index.ts',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			file: 'dist/index.esm.js',
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
}
