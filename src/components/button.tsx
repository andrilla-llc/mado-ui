// * Types
import { ButtonHTMLAttributes, RefObject } from 'react'
import { OneOf } from '../types'

type HtmlButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { ref?: RefObject<HTMLButtonElement | null> }

type LinkOrButtonProps<T extends HTMLButtonElement | HTMLAnchorElement | unknown> = [T] extends [HTMLButtonElement]
	? HtmlButtonProps
	: [T] extends [HTMLAnchorElement]
		? AnchorProps
		: OneOf<[AnchorProps, HtmlButtonProps]>

export type ButtonProps<T extends HTMLButtonElement | HTMLAnchorElement | unknown> = LinkOrButtonProps<T> & {
	/** The size of the element based on padding. */
	padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	/** The size of the border-1 radius. */
	rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
	/** Color theme. */
	theme?:
		| 'blue'
		| 'blue-gradient'
		| 'brown'
		| 'brown-gradient'
		| 'green'
		| 'green-gradient'
		| 'grey'
		| 'grey-gradient'
		| 'sky-blue'
		| 'sky-blue-gradient'
		| 'magenta'
		| 'magenta-gradient'
		| 'neutral'
		| 'neutral-gradient'
		| 'orange'
		| 'orange-gradient'
		| 'pink'
		| 'pink-gradient'
		| 'primary'
		| 'primary-gradient'
		| 'primary-light'
		| 'purple'
		| 'purple-gradient'
		| 'red'
		| 'red-gradient'
		| 'violet'
		| 'violet-gradient'
		| 'yellow'
		| 'yellow-gradient'
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
export default function Button<T extends HTMLButtonElement | HTMLAnchorElement | unknown = unknown>({
	className,
	padding = 'md',
	rounded = 'lg',
	theme = 'primary',
	ref,
	...props
}: ButtonProps<T>) {
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

	const getThemeClasses = () => {
		switch (theme) {
			case 'blue':
				return twSort(
					'before:bg-ui-blue shadow-ui-blue/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'blue-gradient':
				return twSort(
					'bg-ui-blue shadow-ui-blue/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'brown':
				return twSort(
					'before:bg-ui-brown shadow-ui-brown/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'brown-gradient':
				return twSort(
					'bg-ui-brown shadow-ui-brown/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'green':
				return twSort(
					'before:bg-ui-green shadow-ui-green/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'green-gradient':
				return twSort(
					'bg-ui-green shadow-ui-green/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'grey':
				return twSort(
					'before:bg-ui-grey shadow-ui-grey/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'grey-gradient':
				return twSort(
					'bg-ui-grey shadow-ui-grey/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'sky-blue':
				return twSort(
					'before:bg-ui-sky-blue shadow-ui-sky-blue/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'sky-blue-gradient':
				return twSort(
					'bg-ui-sky-blue shadow-text-white lg shadow-ui-sky-blue/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'magenta':
				return twSort(
					'before:bg-ui-magenta shadow-ui-magenta/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'magenta-gradient':
				return twSort(
					'bg-ui-magenta shadow-ui-magenta/25 before:bg-linear-to-t active:before transition-transform:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white mix-blend-soft-light shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:text-white before:opacity-75',
				)
			case 'neutral':
				return twSort(
					'before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90text-white dark bg-zinc-200 text-black before:absolute before:inset-0 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90 dark:bg-zinc-800',
				)
			case 'neutral-gradient':
				return twSort(
					'bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 dark from-zinc-300 via-zinc-200 to-zinc-100 text-black before:transition-[filter] before:duration-300 active:before:brightness-90 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700',
				)
			case 'orange':
				return twSort(
					'before:bg-ui-orange shadow-ui-orange/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'orange-gradient':
				return twSort(
					'bg-ui-orange shadow-ui-orange/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'pink':
				return twSort(
					'before:bg-ui-pink shadow-ui-pink/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'pink-gradient':
				return twSort(
					'bg-ui-pink shadow-ui-pink/25 before:bg-linear-to-t before:to-white/75/75 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'primary-light':
				return twSort(
					'bg-primary-50 text-primary-600 active:bg-primary-600 active:text-primary-50 pointer-fine:hover:bg-primary-600 pointer-fine:hover:text-primary-50 pointer-fine:active:bg-primary-700 transition-[transform_background-color_color_box-shadow]',
				)
			case 'primary-gradient':
				return twSort(
					'bg-linear-to-t from-primary-700 via-primary-500 to-primary-300 bg-size-y-[200%] shadow-primary-600/25 pointer-fine:hover:[background-position:50%_0%] transition-[transform_background-position] [background-position:50%_50%] active:[background-position:50%_75%]',
				)
			case 'purple':
				return twSort(
					'before:bg-ui-purple shadow-ui-purple/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'purple-gradient':
				return twSort(
					'bg-ui-purple shadow-ui-purple/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'red':
				return twSort(
					'before:bg-ui-red shadow-ui-red/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'red-gradient':
				return twSort(
					'bg-ui-red shadow-ui-red/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'violet':
				return twSort(
					'before:bg-ui-violet shadow-ui-violet/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'violet-gradient':
				return twSort(
					'bg-ui-violet shadow-ui-violet/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-white shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'yellow':
				return twSort(
					'before:bg-ui-yellow shadow-ui-yellow/25 before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-black shadow-lg transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'yellow-gradient':
				return twSort(
					'bg-ui-yellow shadow-ui-yellow/25 before:bg-linear-to-t before:ease-exponential pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90 text-black shadow-lg transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:from-black before:via-black/50 before:to-white/50 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 active:before:brightness-90',
				)
			case 'primary':
			default:
				return twSort(
					'bg-primary-500 shadow-primary-700/25 active:bg-primary-600 pointer-fine:hover:bg-primary-400 pointer-fine:active:bg-primary-600 text-white shadow-lg transition-[transform_background-color_box-shadow]',
				)
		}
	}

	const paddingClasses = getPaddingClasses(),
		roundedClasses = getRoundedClasses(),
		themeClasses = getThemeClasses()

	const buttonClasses = twMerge([
		'ease-exponential focus-visible:scale-101 pointer-fine:hover:scale-101 pointer-fine:active:scale-99 block w-fit min-w-fit text-center font-semibold duration-300 active:scale-95',
		paddingClasses,
		roundedClasses,
		themeClasses,
		className,
	])

	return 'href' in props && typeof props.href === 'string' ? (
		<Anchor ref={ref as RefObject<HTMLAnchorElement | null>} {...(props as AnchorProps)} className={buttonClasses} />
	) : (
		<HeadlessButton
			ref={ref as RefObject<HTMLButtonElement | null>}
			{...(props as HtmlButtonProps)}
			className={buttonClasses}
		/>
	)
}
