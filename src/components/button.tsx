// * Types
import { ElementType } from 'react'
import { AnyElementProps, OneOf } from '../types'

type ColorTheme = OneOf<
	[
		{
			/** Color theme. */
			theme?:
				| 'blue'
				| 'brown'
				| 'green'
				| 'grey'
				| 'sky-blue'
				| 'magenta'
				| 'orange'
				| 'pink'
				| 'purple'
				| 'red'
				| 'violet'
				| 'yellow'
		},
		{
			/** Color theme. */
			theme?: 'custom'
			customTheme: OneOf<
				[
					{
						/** Example: `'[--theme-color:var(--color-blue-500)]'` */
						themeColor: string
					},
					{
						/** This doesn't use any preset color theme classes. */
						classes: string
					},
				]
			>
		},
	]
>

type LinkOrOther<TTag extends ElementType> =
	| (AnyElementProps<TTag> & { href?: never })
	| (AnchorProps & { href: string })

export type ButtonProps<TTag extends ElementType> = LinkOrOther<TTag> &
	ColorTheme & {
		/** Customizes the theme color to a sensible gradient. */
		gradient?: boolean
		/** The size of the element based on padding. */
		padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
		/** The size of the border-1 radius. */
		rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
	}

// * Components
import { Anchor, AnchorProps } from './link'
import { Button as HeadlessButton } from '@headlessui/react'

// * Utilities
import { twMerge, twSort } from '../utils'

/**
 * # Button
 * - A pre-styled button with utility props for easy customization depending on use case.
 */
export default function Button<TTag extends ElementType = typeof HeadlessButton>({
	className,
	customTheme,
	gradient = false,
	padding = 'md',
	rounded = 'lg',
	theme = 'blue',
	...props
}: ButtonProps<TTag>) {
	const getPaddingClasses = () => {
		switch (padding) {
			case 'xs':
				return 'px-2 py-0.5'
			case 'sm':
				return 'px-4 py-1'
			case 'md':
				return 'px-6 py-1.5'
			case 'lg':
				return 'px-8 py-2'
			case 'xl':
				return 'px-12 py-3'
		}
	}

	const getRoundedClasses = () => {
		switch (rounded) {
			case 'xs':
				return 'rounded-sm'
			case 'sm':
				return 'rounded-md'
			case 'md':
				return 'rounded-lg'
			case 'lg':
				return 'rounded-xl'
			case 'xl':
				return 'rounded-3xl'
			case 'full':
				return 'rounded-full'
		}
	}

	const getThemeColorVariable = () => {
		switch (theme) {
			case 'blue':
				return twSort('text-white [--theme-color:var(--color-ui-blue)]')
			case 'brown':
				return twSort('text-white [--theme-color:var(--color-ui-brown)]')
			case 'green':
				return twSort('text-white [--theme-color:var(--color-ui-green)]')
			case 'grey':
				return twSort('text-white [--theme-color:var(--color-ui-grey)]')
			case 'magenta':
				return twSort('text-white [--theme-color:var(--color-ui-magenta)]')
			case 'orange':
				return twSort('text-white [--theme-color:var(--color-ui-orange)]')
			case 'pink':
				return twSort('text-white [--theme-color:var(--color-ui-pink)]')
			case 'purple':
				return twSort('text-white [--theme-color:var(--color-ui-purple)]')
			case 'red':
				return twSort('text-white [--theme-color:var(--color-ui-red)]')
			case 'sky-blue':
				return twSort('text-white [--theme-color:var(--color-ui-sky-blue)]')
			case 'violet':
				return twSort('text-white [--theme-color:var(--color-ui-violet)]')
			case 'yellow':
				return twSort('text-black [--theme-color:var(--color-ui-yellow)]')
			case 'custom':
				if (customTheme && customTheme.themeColor && !customTheme.themeColor.includes('[--theme-color:'))
					throw new Error(
						'`customTheme.themeColor` must modify the `--theme-color` variable. Otherwise, please use `customTheme.classes`.',
					)

				return customTheme!.themeColor || customTheme!.classes
		}
	}

	const paddingClasses = getPaddingClasses(),
		roundedClasses = getRoundedClasses(),
		themeColorVariable = getThemeColorVariable()

	const themeClasses =
		customTheme && customTheme.classes
			? customTheme.classes
			: [
					gradient
						? twSort(
								'bg-linear-to-t from-[color-mix(in_oklab,var(--theme-color),var(--color-black)_20%)] via-(--theme-color) to-[color-mix(in_oklab,var(--theme-color),var(--color-white)_20%)] bg-[size:100%_200%] transition-[scale,background-position-y] [background-position-y:50%] active:[background-position-y:100%] data-focus:[background-position-y:0%] pointer-fine:hover:[background-position-y:0%] pointer-fine:hover:active:[background-position-y:100%]',
							)
						: twSort(
								'bg-(--theme-color) transition-[scale,background-color] active:bg-[color-mix(in_oklab,var(--theme-color),var(--color-black)_10%)] data-focus:bg-[color-mix(in_oklab,var(--theme-color),var(--color-white)_10%)] pointer-fine:hover:bg-[color-mix(in_oklab,var(--theme-color),var(--color-white)_10%)] pointer-fine:hover:active:bg-[color-mix(in_oklab,var(--theme-color),var(--color-black)_10%)]',
							),
					'shadow-(--theme-color)/25',
				].join(' ')

	const buttonClasses = twMerge([
		'block w-fit min-w-fit text-center font-semibold shadow-lg duration-300 ease-exponential active:scale-99 data-focus:scale-101 pointer-fine:hover:scale-101 pointer-fine:hover:active:scale-99',
		paddingClasses,
		roundedClasses,
		themeColorVariable,
		themeClasses,
		className,
	])

	const ButtonElement = 'as' in props ? (props.as as ElementType) : props.href ? Anchor : HeadlessButton<TTag>

	const { as, ...restProps } = 'as' in props ? props : { ...props, as: undefined }

	return <ButtonElement {...restProps} className={buttonClasses} />
}
