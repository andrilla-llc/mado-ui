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
	theme = 'blue',
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
		const classList = []

		switch (theme) {
			case 'blue':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-blue/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-blue before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'blue-gradient':
				classList.push(
					twSort(
						'bg-ui-blue text-white shadow-lg shadow-ui-blue/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'brown':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-brown/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-brown before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'brown-gradient':
				classList.push(
					twSort(
						'bg-ui-brown text-white shadow-lg shadow-ui-brown/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'green':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-green/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-green before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'green-gradient':
				classList.push(
					twSort(
						'bg-ui-green text-white shadow-lg shadow-ui-green/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'grey':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-grey/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-grey before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'grey-gradient':
				classList.push(
					twSort(
						'bg-ui-grey text-white shadow-lg shadow-ui-grey/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'sky-blue':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-sky-blue/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-sky-blue before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'sky-blue-gradient':
				classList.push(
					twSort(
						'bg-ui-sky-blue text-white shadow-lg shadow-ui-sky-blue/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'magenta':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-magenta/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-magenta before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'magenta-gradient':
				classList.push(
					twSort(
						'bg-ui-magenta text-white shadow-lg shadow-ui-magenta/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'neutral':
				classList.push(
					twSort(
						'pointer-fine:active:before:brightness-90text-white dark bg-zinc-200 text-black before:absolute before:inset-0 before:rounded-[inherit] before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 dark:bg-zinc-800 pointer-fine:hover:before:brightness-110',
					),
				)
				break
			case 'neutral-gradient':
				classList.push(
					twSort(
						'dark bg-linear-to-t from-zinc-300 via-zinc-200 to-zinc-100 text-black before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'orange':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-orange/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-orange before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'orange-gradient':
				classList.push(
					twSort(
						'bg-ui-orange text-white shadow-lg shadow-ui-orange/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'pink':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-pink/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-pink before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'pink-gradient':
				classList.push(
					twSort(
						'before:to-white/75/75 bg-ui-pink text-white shadow-lg shadow-ui-pink/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'purple':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-purple/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-purple before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'purple-gradient':
				classList.push(
					twSort(
						'bg-ui-purple text-white shadow-lg shadow-ui-purple/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'red':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-red/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-red before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'red-gradient':
				classList.push(
					twSort(
						'bg-ui-red text-white shadow-lg shadow-ui-red/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'violet':
				classList.push(
					twSort(
						'text-white shadow-lg shadow-ui-violet/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-violet before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'violet-gradient':
				classList.push(
					twSort(
						'bg-ui-violet text-white shadow-lg shadow-ui-violet/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black/75 before:via-transparent before:to-white/75 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'yellow':
				classList.push(
					twSort(
						'text-black shadow-lg shadow-ui-yellow/25 transition-transform before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-ui-yellow before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
			case 'yellow-gradient':
				classList.push(
					twSort(
						'bg-ui-yellow text-black shadow-lg shadow-ui-yellow/25 transition-transform before:absolute before:inset-0 before:rounded-[inherit] before:bg-linear-to-t before:from-black before:via-black/50 before:to-white/50 before:opacity-75 before:mix-blend-soft-light before:transition-[filter] before:duration-300 before:ease-exponential active:before:brightness-90 pointer-fine:hover:before:brightness-110 pointer-fine:active:before:brightness-90',
					),
				)
				break
		}

		return classList.join(' ')
	}

	const paddingClasses = getPaddingClasses(),
		roundedClasses = getRoundedClasses(),
		themeClasses = getThemeClasses()

	const buttonClasses = twMerge([
		'block w-fit min-w-fit text-center font-semibold duration-300 ease-exponential focus-visible:scale-101 active:scale-95 pointer-fine:hover:scale-101 pointer-fine:active:scale-99',
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
