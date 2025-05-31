import { ConfigExtension, DefaultClassGroupIds, DefaultThemeGroupIds, extendTailwindMerge } from 'tailwind-merge'

export type AdditionalmadoClassGroupIds =
	| 'animation-direction'
	| 'animation-fill'
	| 'animation-iteration'
	| 'animation-state'

const integerList = Array.from({ length: 100 }, (_, i) => `${i + 1}`)

export const twMerge = extendTailwindMerge<AdditionalmadoClassGroupIds>({
	extend: {
		theme: {
			color: [
				{
					ui: [
						'red',
						'orange',
						'yellow',
						'green',
						'sky-blue',
						'blue',
						'violet',
						'magenta',
						'purple',
						'brown',
						'grey',
						'pink',
					],
				},
			],
		},
		classGroups: {
			animate: [
				{
					animate: [
						'bounce',
						'double-spin',
						'drop-in',
						'flip',
						'flip-again',
						'grid-rows',
						'heartbeat',
						'ping',
						'pulse',
						'slide-up',
						'spin',
						'wave',
					],
				},
			],
			'animation-direction': [
				{
					'animation-direction': ['normal', 'reverse', 'alternate', 'alternate-reverse'],
				},
			],
			'animation-fill': [
				{
					'animation-fill': ['none', 'forwards', 'backwards', 'both'],
				},
			],
			'animation-iteration': [
				{
					'animation-iteration': [...integerList, 'infinite'],
				},
			],
			'animation-state': [
				{
					'animation-state': ['running', 'paused'],
				},
			],
			'grid-cols': [
				{
					'grid-cols': ['0fr', '1fr'],
				},
			],
			'grid-rows': [
				{
					'grid-rows': ['0fr', '1fr'],
				},
			],
			transition: ['transition-rows'],
		},
	},
})

export function extendMadoTailwindMerge<
	AdditionalClassGroupIds extends string = AdditionalmadoClassGroupIds,
	AdditionalThemeGroupIds extends string = never,
>(
	configExtension: ConfigExtension<
		DefaultClassGroupIds | AdditionalClassGroupIds,
		DefaultThemeGroupIds | AdditionalThemeGroupIds
	>,
) {
	const extend = configExtension.extend || {}
	const theme = extend.theme || {}
	const color = 'color' in theme ? theme.color : []
	const classGroups = extend.classGroups || {}

	const themeRest = { ...theme }
	if ('color' in themeRest) delete themeRest.color

	const extendRest = { ...extend }
	delete extendRest.theme
	delete extendRest.classGroups

	return extendTailwindMerge<AdditionalClassGroupIds, AdditionalThemeGroupIds>({
		extend: {
			theme: {
				color: [
					{
						ui: [
							'red',
							'orange',
							'yellow',
							'green',
							'sky-blue',
							'blue',
							'violet',
							'magenta',
							'purple',
							'brown',
							'grey',
							'pink',
						],
					},
					...(color as { [key: string]: string[] }[]),
				],
				...themeRest,
			} as { [key: string]: { [key: string]: string[] }[] } | any,
			classGroups: {
				animate: [
					{
						animate: [
							'bounce',
							'double-spin',
							'drop-in',
							'flip',
							'flip-again',
							'grid-rows',
							'heartbeat',
							'ping',
							'pulse',
							'slide-up',
							'spin',
							'wave',
						],
					},
				],
				'animation-direction': [
					{
						'animation-direction': ['normal', 'reverse', 'alternate', 'alternate-reverse'],
					},
				],
				'animation-fill': [
					{
						'animation-fill': ['none', 'forwards', 'backwards', 'both'],
					},
				],
				'animation-iteration': [
					{
						'animation-iteration': [...integerList, 'infinite'],
					},
				],
				'animation-state': [
					{
						'animation-state': ['running', 'paused'],
					},
				],
				'grid-cols': [
					{
						'grid-cols': ['0fr', '1fr'],
					},
				],
				'grid-rows': [
					{
						'grid-rows': ['0fr', '1fr'],
					},
				],
				transition: ['transition-rows'],
				...classGroups,
			} as { [key: string]: { [key: string]: string[] }[] } | any,
			...extendRest,
		},
		...configExtension,
	})
}
