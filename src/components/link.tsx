// * Types
import { AnyElementProps, OneOf } from '../types'
import { ElementType, MouseEventHandler, RefObject } from 'react'

// * Utilities
import { twMerge, twSort } from '../utils'
import { twJoin } from 'tailwind-merge'

export type AnchorProps<TTag extends ElementType = 'a'> = AnyElementProps<TTag> & {
	disabled?: boolean
}

export function Anchor<TTag extends ElementType = 'a'>({
	as,
	className,
	disabled,
	href,
	onClick,
	target,
	rel,
	...props
}: AnchorProps<TTag>) {
	const isExternal = `${href}`.startsWith('http'),
		hasHash = `${href}`.includes('#')

	const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
		if (disabled) return e.preventDefault()

		onClick?.(e)

		setTimeout(() => history.replaceState({}, document.title, location.pathname), 100)
	}

	const AnchorElement = as || 'a'

	return (
		<AnchorElement
			{...props}
			aria-disabled={disabled}
			className={twMerge(className, disabled && 'pointer-events-none')}
			href={href}
			target={target || (isExternal ? '_blank' : '_self')}
			onClick={hasHash ? handleClick : onClick}
			rel={
				rel !== undefined
					? rel === 'nofollow'
						? `${rel} noreferrer noopener`
						: `${rel} prefetch`
					: isExternal
						? 'nofollow noreferrer noopener'
						: 'prefetch'
			}
		/>
	)
}

type ThemeColorOrClasses = OneOf<
	[
		{
			/**
			 * - Fill Example: `'after:[--theme-color:var(--color-blue-500)]'`
			 * - Multiline Fill Example: `'[--theme-color:var(--color-blue-500)]'`
			 */
			themeColor: string
		},
		{
			/** This doesn't use any preset color theme classes. */
			classes: string
		},
	]
>

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
			customTheme: ThemeColorOrClasses
		},
	]
>

export type LinkProps<TTag extends ElementType = typeof Anchor> = AnyElementProps<
	TTag,
	OneOf<
		[
			{
				type?:
					| 'center'
					| 'lift'
					| 'ltr'
					| 'multiline'
					| 'multiline-center'
					| 'multiline-lift'
					| 'multiline-ltr'
					| 'multiline-rtl'
					| 'multiline-static'
					| 'normal'
					| 'rtl'
					| 'static'
			},
			{
				type?:
					| 'fill'
					| 'fill-lift'
					| 'fill-ltr'
					| 'fill-rtl'
					| 'multiline-fill'
					| 'multiline-fill-center'
					| 'multiline-fill-ltr'
					| 'multiline-fill-lift'
					| 'multiline-fill-rtl'
			} & ColorTheme,
		]
	>
>

// * Styles
const baseClasses = twSort(
	'isolate inline-block cursor-pointer duration-300 ease-exponential after:absolute after:left-1/2 after:-z-10 after:-translate-x-1/2 after:duration-500 active:scale-95 active:after:opacity-100',
)

const lineStaticClasses = twJoin(
	baseClasses,
	'whitespace-nowrap after:-bottom-0.5 after:w-[calc(100%+0.15rem)] after:rounded-full after:border-1 after:border-current',
)

const lineClasses = twJoin(
	lineStaticClasses,
	'whitespace-nowrap transition-transform after:transition-transform after:ease-exponential',
)

const scaleXClasses = 'after:scale-x-0 pointer-fine:hover:after:scale-x-100 active:after:scale-x-100'
const scaleYClasses = 'after:scale-y-0 pointer-fine:hover:after:scale-y-100 active:after:scale-y-100'

const lineNormalClasses = twJoin([
	lineClasses,
	scaleYClasses,
	'after:origin-bottom after:translate-y-0.5 active:after:translate-y-0 pointer-fine:hover:after:translate-y-0',
])

const lineLtrClasses = twJoin([lineClasses, scaleXClasses, 'after:origin-left'])

const lineRtlClasses = twJoin([lineClasses, scaleXClasses, 'after:origin-right'])

const lineCenterClasses = twJoin([lineClasses, scaleXClasses])

const lineLiftClasses = twJoin([
	lineClasses,
	scaleYClasses,
	'after:origin-bottom after:translate-y-1 after:scale-x-75 active:after:translate-y-0 active:after:scale-x-100 pointer-fine:hover:after:translate-y-0 pointer-fine:hover:after:scale-x-100',
])

const fillClasses = twJoin(
	baseClasses,
	'whitespace-nowrap transition-[transform,color] after:top-1/2 after:h-[calc(100%+0.05rem)] after:w-[calc(100%+0.25rem)] after:-translate-y-1/2 after:rounded after:ease-exponential active:text-zinc-50 pointer-fine:hover:text-zinc-50',
)

// Define theme-specific fill color transition classes
const getFillColorTransitionClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	let fillColorTransitionClasses = twJoin(fillClasses, 'transition-transform after:bg-(--theme-color)')

	switch (theme) {
		case 'blue':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-blue)]')
			break
		case 'brown':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-brow)]')
			break
		case 'green':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-green)]')
			break
		case 'grey':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-grey)]')
			break
		case 'sky-blue':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-sky-blue)]')
			break
		case 'magenta':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-magenta)]')
			break
		case 'orange':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-orange)]')
			break
		case 'pink':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-pink)]')
			break
		case 'purple':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-purple)]')
			break
		case 'red':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-red)]')
			break
		case 'violet':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-violet)]')
			break
		case 'yellow':
			fillColorTransitionClasses = twJoin(fillColorTransitionClasses, 'after:[--theme-color:var(--color-ui-yellow)]')
			break
		case 'custom':
			if (customTheme && customTheme.themeColor && !customTheme.themeColor.includes('after:[--theme-color:'))
				throw new Error(
					'`customTheme.themeColor` must modify the `--theme-color` variable on the ::after pseudo element. Otherwise, please use `customTheme.classes`.',
				)

			fillColorTransitionClasses = customTheme!.themeColor
				? twMerge(fillColorTransitionClasses, customTheme!.themeColor)
				: twMerge(fillClasses, customTheme!.classes)
			break
	}

	return fillColorTransitionClasses
}

// Define theme-specific fill center classes
const getFillCenterClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	let fillCenterColorClasses = twJoin(
		fillClasses,
		'after:scale-x-50 after:scale-y-[0.25] after:bg-(--theme-color)/0 after:transition-[transform,background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-(--theme-color) pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-(--theme-color)',
	)

	switch (theme) {
		case 'blue':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-blue)]')
			break
		case 'brown':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-brown)]')
			break
		case 'green':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-green)]')
			break
		case 'grey':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-grey)]')
			break
		case 'sky-blue':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-sky-blue)]')
			break
		case 'magenta':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-magenta)]')
			break
		case 'orange':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-orange)]')
			break
		case 'pink':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-pink)]')
			break
		case 'purple':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-purple)]')
			break
		case 'red':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-red)]')
			break
		case 'violet':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-violet)]')
			break
		case 'yellow':
			fillCenterColorClasses = twJoin(fillCenterColorClasses, 'after:[--theme-color:var(--color-ui-yellow)]')
			break
		case 'custom':
			if (customTheme && customTheme.themeColor && !customTheme.themeColor.includes('after:[--theme-color:'))
				throw new Error(
					'`customTheme.themeColor` must modify the `--theme-color` variable on the ::after pseudo element. Otherwise, please use `customTheme.classes`.',
				)

			fillCenterColorClasses = customTheme!.themeColor
				? twMerge(fillCenterColorClasses, customTheme!.themeColor)
				: twMerge(fillClasses, customTheme!.classes)
			break
	}

	return fillCenterColorClasses
}

const multilineBaseClasses = twSort('bg-linear-to-r from-current to-current bg-no-repeat active:scale-95')

const multilineLineStaticClasses = 'underline'
const multilineNormalClasses = twSort('underline-offset-1 active:underline pointer-fine:hover:underline')

const multilineClasses = twJoin(multilineBaseClasses, 'duration-500 ease-exponential')

const multilineLineClasses = twJoin(multilineClasses, 'bg-[position:0%_100%] px-px pb-px transition-[background-size]')

const multilineXClasses = twJoin(
	multilineLineClasses,
	'bg-[size:0%_2px] focus-visible:bg-[size:100%_2px] active:bg-[size:100%_2px] pointer-fine:hover:bg-[size:100%_2px]',
)

const multilineLineRtlClasses = twJoin([multilineXClasses, 'bg-[position:100%_100%]'])

const multilineLineCenterClasses = twJoin([multilineXClasses, 'bg-[position:50%_100%]'])

const multilineLineLiftClasses = twJoin(
	multilineLineClasses,
	'bg-[size:auto_0px] focus-visible:bg-[size:auto_2px] active:bg-[size:auto_2px] pointer-fine:hover:bg-[size:auto_2px]',
)

const multilineFillBaseClasses = twJoin(
	multilineBaseClasses,
	'rounded px-0.5 py-0.75 focus-visible:text-zinc-50 active:text-zinc-50 pointer-fine:hover:text-zinc-50',
)

const getMultilineFillColorClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	let multilineFillColorClasses = twJoin(
		multilineFillBaseClasses,
		'from-(--theme-color) to-(--theme-color) transition-[background-size,color]',
	)

	switch (theme) {
		case 'blue':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-blue)]')
			break
		case 'brown':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-brown)]')
			break
		case 'green':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-green)]')
			break
		case 'grey':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-grey)]')
			break
		case 'sky-blue':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-sky-blue)]')
			break
		case 'magenta':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-magenta)]')
			break
		case 'orange':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-orange)]')
			break
		case 'pink':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-pink)]')
			break
		case 'purple':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-purple)]')
			break
		case 'red':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-red)]')
			break
		case 'violet':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-violet)]')
			break
		case 'yellow':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-yellow)]')
			break
		case 'custom':
			if (customTheme && customTheme.themeColor && !customTheme.themeColor.includes('[--theme-color:'))
				throw new Error(
					'`customTheme.themeColor` must modify the `--theme-color` variable. Otherwise, please use `customTheme.classes`.',
				)

			multilineFillColorClasses = customTheme!.themeColor
				? twMerge(multilineFillColorClasses, customTheme!.themeColor)
				: twMerge(multilineFillBaseClasses, customTheme!.classes)
			break
	}

	return multilineFillColorClasses
}

const getMultilineFillClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	let multilineFillColorClasses = twJoin(
		multilineFillBaseClasses,
		'from-(--theme-color)/0 to-(--theme-color)/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size,background-image,color] focus-visible:from-(--theme-color) focus-visible:to-(--theme-color) focus-visible:bg-[size:100%_100%] active:from-(--theme-color) active:to-(--theme-color) active:bg-[size:100%_100%] contrast-more:from-(--theme-color)/0 pointer-fine:hover:from-(--theme-color) pointer-fine:hover:to-(--theme-color) pointer-fine:hover:bg-[size:100%_100%]',
	)

	switch (theme) {
		case 'blue':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-blue)]')
			break
		case 'brown':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-brown)]')
			break
		case 'green':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-green)]')
			break
		case 'grey':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-grey)]')
			break
		case 'sky-blue':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-sky-blue)]')
			break
		case 'magenta':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-magenta)]')
			break
		case 'orange':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-orange)]')
			break
		case 'pink':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-pink)]')
			break
		case 'purple':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-purple)]')
			break
		case 'red':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-red)]')
			break
		case 'violet':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-violet)]')
			break
		case 'yellow':
			multilineFillColorClasses = twJoin(multilineFillColorClasses, '[--theme-color:var(--color-ui-yellow)]')
			break
		case 'custom':
			if (customTheme && customTheme.themeColor && !customTheme.themeColor.includes('[--theme-color:'))
				throw new Error(
					'`customTheme.themeColor` must modify the `--theme-color` variable. Otherwise, please use `customTheme.classes`.',
				)

			multilineFillColorClasses = customTheme!.themeColor
				? twMerge(multilineFillColorClasses, customTheme!.themeColor)
				: twMerge(multilineFillBaseClasses, customTheme!.classes)
			break
	}

	return multilineFillColorClasses
}

const getMultilineFillLiftClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	return twJoin(
		getMultilineFillColorClasses(theme, customTheme),
		'bg-[size:auto_0px] bg-[position:50%_100%] focus-visible:bg-[size:auto_100%] active:bg-[size:auto_100%] pointer-fine:hover:bg-[size:auto_100%]',
	)
}

const getMultilineFillXClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	return twJoin(
		getMultilineFillColorClasses(theme, customTheme),
		'bg-[size:0%_100%] focus-visible:bg-[size:100%_100%] active:bg-[size:100%_100%] pointer-fine:hover:bg-[size:100%_100%]',
	)
}

const getMultilineFillRtlClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	return twJoin(getMultilineFillXClasses(theme, customTheme), 'bg-[position:100%_auto]')
}

const getMultilineFillCenterClasses = (theme: LinkProps['theme'] = 'blue', customTheme?: ThemeColorOrClasses) => {
	return twJoin(getMultilineFillXClasses(theme, customTheme), 'bg-[position:50%_auto]')
}

/**
 * # Link
 *
 * - A component for rendering links with various styles and options.
 * - Utilizes the Next.js `Link` component and provides additional functionality.
 *
 * ---
 *
 * ## Styles
 *
 * This component includes various classes to style the link. The styles are divided into two types:
 *
 * - Line styles: These styles add a line underneath the link, and include variations for different positions and orientations.
 * - Fill styles: These styles add a background color behind the link, and include variations for different positions and orientations.
 * - Multiline styles: These styles seek to accomplish the same as the line and fill styles, while offering multiline support.
 *
 * ---
 *
 * ## Examples
 *
 * @example
 *   <Link href='/about' type='ltr' title='About Us'>Learn more about our company</Link>
 *
 * @example
 *   <Link href='/about' type='fill-ltr' title='About Us'>Learn more about our company</Link>
 *
 * @example
 *   <Link href='/about' type='fill-ltr' theme='red' title='About Us'>Learn more about our company</Link>
 */
export default function Link<TTag extends ElementType = typeof Anchor>({
	as,
	className,
	customTheme,
	theme = 'blue',
	type,
	...props
}: LinkProps<TTag>) {
	const getLinkClasses = () => {
		switch (type) {
			case 'static':
				return lineStaticClasses
			case 'ltr':
				return lineLtrClasses
			case 'rtl':
				return lineRtlClasses
			case 'center':
				return lineCenterClasses
			case 'lift':
				return lineLiftClasses
			case 'fill':
				return getFillCenterClasses(theme, customTheme)
			case 'fill-ltr':
				return twJoin([getFillColorTransitionClasses(theme, customTheme), scaleXClasses, 'after:origin-left'])
			case 'fill-rtl':
				return twJoin([getFillColorTransitionClasses(theme, customTheme), scaleXClasses, 'after:origin-right'])
			case 'fill-lift':
				return twJoin([getFillColorTransitionClasses(theme, customTheme), scaleYClasses, 'after:origin-bottom'])
			case 'multiline':
				return multilineNormalClasses
			case 'multiline-static':
				return multilineLineStaticClasses
			case 'multiline-ltr':
				return multilineXClasses
			case 'multiline-rtl':
				return multilineLineRtlClasses
			case 'multiline-center':
				return multilineLineCenterClasses
			case 'multiline-lift':
				return multilineLineLiftClasses
			case 'multiline-fill':
				return getMultilineFillClasses(theme, customTheme)
			case 'multiline-fill-ltr':
				return getMultilineFillXClasses(theme, customTheme)
			case 'multiline-fill-rtl':
				return getMultilineFillRtlClasses(theme, customTheme)
			case 'multiline-fill-center':
				return getMultilineFillCenterClasses(theme, customTheme)
			case 'multiline-fill-lift':
				return getMultilineFillLiftClasses(theme, customTheme)
			default:
				return lineNormalClasses
		}
	}

	const linkClasses = getLinkClasses()

	const LinkElement = as || Anchor

	return <LinkElement {...props} className={twMerge(linkClasses, className)} />
}

export type ExtendedLinkConfig = {
	/** Modifies the default element that is rendered. The `as` prop on the component still overrides the default set here. */
	as?: ElementType
	/** Adds default classes. */
	className?: string
	/** Sets the default theme. */
	defaultTheme?: ColorTheme['theme'] | string
	/** Sets the default for the `type` prop. */
	type?: LinkProps['type']
	/** Add more theme options. */
	theme?: {
		[themeName: string]: {
			/** Custom theme configuration - supports both multiline and regular link theme formats */
			customTheme: Omit<ThemeColorOrClasses, 'themeColor'> & {
				themeColor?: {
					/** Example: `'after:[--theme-color:var(--color-blue-500)]'` */
					fill: string
					/** Example: `'[--theme-color:var(--color-blue-500)]'` */
					multilineFill: string
				}
			}
			/** Additional CSS classes to apply */
			className?: string
		}
	}
}

export type ExtendedThemeNames<T extends ExtendedLinkConfig> =
	T['theme'] extends Record<string, unknown> ? keyof T['theme'] : never

export type ExtendedLinkProps<
	TExtendedConfig extends ExtendedLinkConfig,
	TTag extends ElementType = typeof Anchor,
> = Omit<LinkProps<TTag>, 'theme' | 'customTheme'> & {
	theme?: LinkProps<TTag>['theme'] | ExtendedThemeNames<TExtendedConfig>
	customTheme?: LinkProps<TTag>['customTheme']
}

/**
 * # createLink
 * Creates an extended Link component with additional theme options.
 *
 * @param config - Configuration object defining new themes and defaults
 * @returns A new Link component with extended theme support
 *
 * @example
 * ```tsx
 * const MyLink = createLink({
 *   as: NextLink,
 *   className: 'font-bold',
 *   type: 'fill',
 *   theme: {
 *     primary: {
 *       customTheme: {
 *         fill: 'after:[--theme-color:var(--color-primary-500)]',
 *         multilineFill: '[--theme-color:var(--color-primary-500)]'
 *       },
 *       className: 'text-white'
 *     }
 *   }
 * })
 * ```
 */
export function createLink<TExtendedConfig extends ExtendedLinkConfig>(config: TExtendedConfig) {
	return function ExtendedLink<TTag extends ElementType = typeof Anchor>({
		theme,
		className,
		customTheme,
		type,
		as,
		...props
	}: ExtendedLinkProps<TExtendedConfig, TTag>) {
		const finalType: string | undefined = type !== undefined ? type : config.type,
			finalTheme = theme !== undefined ? theme : config.defaultTheme

		const configClassName = config.className

		const shouldOverrideElement = !Boolean(as) && Boolean(config.as)

		const linkProps: Omit<
			ExtendedLinkProps<TExtendedConfig, TTag>,
			'as' | 'theme' | 'customTheme' | 'type' | 'className'
		> & { as?: ElementType } = {
			...props,
			className: undefined,
			customTheme: undefined,
			type: finalType,
		}

		if (shouldOverrideElement) {
			linkProps.as = config.as
		} else if (as) {
			linkProps.as = as
		}

		if (finalTheme && typeof finalTheme === 'string' && config.theme && finalTheme in config.theme) {
			const extendedTheme = config.theme[finalTheme]

			if (customTheme)
				return (
					<Link
						{...linkProps}
						theme='custom'
						customTheme={customTheme}
						className={twMerge(configClassName, extendedTheme.className, className)}
					/>
				)

			let resolvedCustomTheme: ThemeColorOrClasses

			if (extendedTheme.customTheme.themeColor) {
				const isMultilineType = finalType ? finalType.includes('multiline') : false

				resolvedCustomTheme = {
					themeColor: isMultilineType
						? extendedTheme.customTheme.themeColor.multilineFill
						: extendedTheme.customTheme.themeColor.fill,
				}
			} else {
				resolvedCustomTheme = {
					classes: extendedTheme.customTheme.classes!,
				}
			}

			return (
				<Link
					{...linkProps}
					theme='custom'
					customTheme={resolvedCustomTheme}
					className={twMerge(configClassName, extendedTheme.className, className)}
				/>
			)
		}

		return (
			<Link
				{...linkProps}
				theme={finalTheme as LinkProps<TTag>['theme']}
				className={twMerge(configClassName, className)}
				customTheme={customTheme}
			/>
		)
	}
}
