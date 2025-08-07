import dts from 'rollup-plugin-dts'

const config = [
	{
		input: './dist/index.d.ts',
		output: [{ file: 'dist/index.d.ts', format: 'es' }],
		plugins: [dts()],
		external: ['node:url'],
	},
	{
		input: './dist/components/index.d.ts',
		output: [{ file: 'dist/components.d.ts', format: 'es' }],
		plugins: [dts()],
		external: ['node:url'],
	},
	{
		input: './dist/hooks/index.d.ts',
		output: [{ file: 'dist/hooks.d.ts', format: 'es' }],
		plugins: [dts()],
		external: ['node:url'],
	},
	{
		input: './dist/icons/index.d.ts',
		output: [{ file: 'dist/icons.d.ts', format: 'es' }], // Fixed: was hooks.d.ts
		plugins: [dts()],
		external: ['node:url'],
	},
	{
		input: './dist/types/index.d.ts',
		output: [{ file: 'dist/types.d.ts', format: 'es' }], // Fixed: was hooks.d.ts
		plugins: [dts()],
		external: ['node:url'],
	},
	{
		input: './dist/utils/index.d.ts',
		output: [{ file: 'dist/utils.d.ts', format: 'es' }], // Fixed: was hooks.d.ts
		plugins: [dts()],
		external: ['node:url'],
	},
]

export default config
