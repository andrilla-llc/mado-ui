// * Types
import { Url, UrlObject } from 'node:url'
import { ElementType } from 'react'
import { AnyElementProps, ColorTheme, OneOf } from '../types'

type LinkOrOther<TTag extends ElementType = typeof HeadlessButton> = OneOf<
	[AnyElementProps<TTag> & { href?: never }, AnyElementProps<typeof Anchor> & { href?: string | Url | UrlObject }]
>

export type ButtonPadding = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonBorderRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export type ButtonProps<TTag extends ElementType = typeof HeadlessButton> = LinkOrOther<TTag> &
	ColorTheme & {
		/** Customizes the theme color to a sensible gradient. */
		gradient?: boolean
		/** The size of the element based on padding. */
		padding?: ButtonPadding
		/** The size of the border radius. */
		rounded?: ButtonBorderRadius
	}

export type ExtendedButtonConfig = {
	/** Modifies the default(s) for what element is rendered. The `as` prop on the component still overrides the default(s) set here. */
	as?:
		| ElementType
		| {
				/** Modifies the base link element when `href` is present. */
				link?: ElementType
				/** Modifies the base button element. */
				default?: ElementType
		  }
	/** Adds default classes. */
	className?: string
	defaultTheme?: ColorTheme['theme'] | string
	/** Sets the default for the `gradient` prop. */
	gradient?: boolean
	/** Sets the default for the `padding` prop. */
	padding?: ButtonPadding
	/** Sets the default for the `rounded` prop. */
	rounded?: ButtonBorderRadius
	/** Add more theme options. */
	theme?: {
		[themeName: string]: {
			/** Custom theme configuration */
			customTheme: NonNullable<ColorTheme['customTheme']>
			/** Additional CSS classes to apply */
			className?: string
		}
	}
}

type ExtendedThemeNames<T extends ExtendedButtonConfig> =
	T['theme'] extends Record<string, unknown> ? keyof T['theme'] : never

export type ExtendedButtonProps<
	TExtendedConfig extends ExtendedButtonConfig,
	TTag extends ElementType = typeof HeadlessButton,
> = Omit<ButtonProps<TTag>, 'theme' | 'customTheme'> & {
	theme?: ButtonProps<TTag>['theme'] | ExtendedThemeNames<TExtendedConfig>
	customTheme?: ButtonProps<TTag>['customTheme']
}

// * Components
import { Anchor } from './link'
import { Button as HeadlessButton } from '@headlessui/react'

// * Utilities
import { twMerge, twSort } from '../utils'

/**
 * # Button
 * - A pre-styled button with utility props for easy customization depending on use case.
 */
export function Button<TTag extends ElementType = typeof HeadlessButton>({
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

	if ('href' in props && !props.as && props.href)
		return <HeadlessButton<typeof Anchor> {...props} as={Anchor} className={buttonClasses} />

	return <HeadlessButton<'button'> {...props} className={buttonClasses} />
}

/**
 * # createButton
 * Creates an extended Button component with additional theme options.
 *
 * @param extendedThemes - Configuration object defining new themes
 * @returns A new Button component with extended theme support
 *
 * @example
 * ```tsx
 * const MyButton = createButton({
 *   as: {
 *     default: 'div',
 *     link: NextLink
 *   },
 *   className: 'min-w-64',
 *   padding: 'sm',
 *   rounded: 'full',
 *   theme: {
 *     primary: {
 *       customTheme: { themeColor: '[--theme-color:var(--color-primary-500)]' },
 *       className: 'text-white'
 *     }
 *   }
 * })
 * ```
 */
export function createButton<TExtendedConfig extends ExtendedButtonConfig>(config: TExtendedConfig) {
	return function ExtendedButton<TTag extends ElementType = typeof HeadlessButton>({
		theme,
		className,
		customTheme,
		gradient,
		padding,
		rounded,
		as,
		...props
	}: ExtendedButtonProps<TExtendedConfig, TTag>) {
		const finalGradient = gradient !== undefined ? gradient : config.gradient,
			finalPadding = padding !== undefined ? padding : config.padding,
			finalRounded = rounded !== undefined ? rounded : config.rounded,
			finalTheme = theme !== undefined ? theme : config.defaultTheme

		const configClassName = config.className

		const shouldOverrideElement = !Boolean(as) && Boolean(config.as)

		const getOverrideElement = () => {
			if (!config.as) return undefined

			if (typeof config.as === 'function' || typeof config.as === 'string') return config.as

			const hasHref = 'href' in props && props.href
			if (hasHref && config.as.link) {
				return config.as.link
			} else if (!hasHref && config.as.default) {
				return config.as.default
			}

			return undefined
		}

		const buttonProps: Omit<
			ExtendedButtonProps<TExtendedConfig, TTag>,
			'as' | 'theme' | 'customTheme' | 'gradient' | 'padding' | 'rounded' | 'className'
		> & { as?: ElementType } = {
			...props,
			className: undefined,
			customTheme: undefined,
			gradient: finalGradient,
			padding: finalPadding,
			rounded: finalRounded,
		}

		if (shouldOverrideElement) {
			const overrideElement = getOverrideElement()

			if (overrideElement) buttonProps.as = overrideElement
		} else if (as) buttonProps.as = as

		if (finalTheme && typeof finalTheme === 'string' && config.theme && finalTheme in config.theme) {
			const extendedTheme = config.theme[finalTheme]

			return (
				<Button
					{...buttonProps}
					theme='custom'
					customTheme={customTheme || extendedTheme.customTheme}
					className={twMerge(configClassName, extendedTheme.className, className)}
				/>
			)
		}

		return (
			<Button
				{...buttonProps}
				theme={finalTheme as ButtonProps<TTag>['theme']}
				className={twMerge(configClassName, className)}
				customTheme={customTheme}
			/>
		)
	}
}
