// * Types
import { AnyElementProps, OneOf } from '../types'
import { AnchorHTMLAttributes, ElementType, MouseEventHandler, RefObject } from 'react'

// * Utilities
import { twMerge, twSort } from '../utils'
import { twJoin } from 'tailwind-merge'

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
	disabled?: boolean
	ref?: RefObject<HTMLAnchorElement | null>
}

export function Anchor({ className, disabled, href, onClick, ref, target, rel, ...props }: AnchorProps) {
	const isExternal = `${href}`.startsWith('http'),
		hasHash = `${href}`.includes('#')

	const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
		if (disabled) return e.preventDefault()

		onClick?.(e)

		setTimeout(() => history.replaceState({}, document.title, location.pathname), 100)
	}

	return (
		<a
			ref={ref}
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

export type LinkProps<T extends ElementType = typeof Anchor> = AnyElementProps<
	T,
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
				theme?:
					| 'blue'
					| 'brown'
					| 'green'
					| 'grey'
					| 'sky-blue'
					| 'magenta'
					| 'neutral'
					| 'orange'
					| 'pink'
					| 'purple'
					| 'red'
					| 'violet'
					| 'yellow'
			},
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
	'whitespace-nowrap transition-[transform_color] after:top-1/2 after:h-[calc(100%+0.05rem)] after:w-[calc(100%+0.25rem)] after:-translate-y-1/2 after:rounded after:ease-exponential active:text-zinc-50 pointer-fine:hover:text-zinc-50',
)

// Define theme-specific fill color transition classes
const getFillColorTransitionClasses = (theme: LinkProps['theme'] = 'blue') => {
	switch (theme) {
		case 'brown':
			return twJoin(fillClasses, 'after:bg-ui-brown after:transition-transform contrast-more:after:bg-ui-brown')
		case 'green':
			return twJoin(fillClasses, 'after:bg-ui-green after:transition-transform contrast-more:after:bg-ui-green')
		case 'grey':
			return twJoin(fillClasses, 'after:bg-ui-grey after:transition-transform contrast-more:after:bg-ui-grey')
		case 'sky-blue':
			return twJoin(fillClasses, 'after:bg-ui-sky-blue after:transition-transform contrast-more:after:bg-ui-sky-blue')
		case 'magenta':
			return twJoin(fillClasses, 'after:bg-ui-magenta after:transition-transform contrast-more:after:bg-ui-magenta')
		case 'neutral':
			return twJoin(
				fillClasses,
				'after:bg-zinc-700 after:transition-transform contrast-more:after:bg-zinc-700 dark:after:bg-zinc-300 dark:contrast-more:after:bg-zinc-300',
			)
		case 'orange':
			return twJoin(fillClasses, 'after:bg-ui-orange after:transition-transform contrast-more:after:bg-ui-orange')
		case 'pink':
			return twJoin(fillClasses, 'after:bg-ui-pink after:transition-transform contrast-more:after:bg-ui-pink')
		case 'purple':
			return twJoin(fillClasses, 'after:bg-ui-purple after:transition-transform contrast-more:after:bg-ui-purple')
		case 'red':
			return twJoin(fillClasses, 'after:bg-ui-red after:transition-transform contrast-more:after:bg-ui-red')
		case 'violet':
			return twJoin(fillClasses, 'after:bg-ui-violet after:transition-transform contrast-more:after:bg-ui-violet')
		case 'yellow':
			return twJoin(fillClasses, 'after:bg-ui-yellow after:transition-transform contrast-more:after:bg-ui-yellow')
		case 'blue':
		default:
			return twJoin(fillClasses, 'after:bg-ui-blue after:transition-transform contrast-more:after:bg-ui-blue')
	}
}

// Define theme-specific fill center classes
const getFillCenterClasses = (theme: LinkProps['theme'] = 'blue') => {
	switch (theme) {
		case 'brown':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-brown/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-brown pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-brown',
			)
		case 'green':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-green/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-green pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-green',
			)
		case 'grey':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-grey/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-grey pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-grey',
			)
		case 'sky-blue':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-sky-blue/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-sky-blue pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-sky-blue',
			)
		case 'magenta':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-magenta/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-magenta pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-magenta',
			)
		case 'neutral':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-zinc-700/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-zinc-700 dark:after:bg-zinc-300/0 dark:active:after:bg-zinc-300 pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-zinc-700 dark:pointer-fine:hover:after:bg-zinc-300',
			)
		case 'orange':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-orange/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-orange pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-orange',
			)
		case 'pink':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-pink/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-pink pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-pink',
			)
		case 'purple':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-purple/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-purple pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-purple',
			)
		case 'red':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-red/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-red pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-red',
			)
		case 'violet':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-violet/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-violet pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-violet',
			)
		case 'yellow':
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-yellow/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-yellow pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-yellow',
			)
		case 'blue':
		default:
			return twJoin(
				fillClasses,
				'after:scale-x-50 after:scale-y-[0.25] after:bg-ui-blue/0 after:transition-[transform_background-color] active:after:scale-x-100 active:after:scale-y-100 active:after:bg-ui-blue pointer-fine:hover:after:scale-x-100 pointer-fine:hover:after:scale-y-100 pointer-fine:hover:after:bg-ui-blue',
			)
	}
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

const getMultilineFillColorClasses = (theme: LinkProps['theme'] = 'blue') => {
	switch (theme) {
		case 'brown':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-brown to-ui-brown transition-[background-size_color] contrast-more:from-ui-brown contrast-more:to-ui-brown',
			)
		case 'green':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-green to-ui-green transition-[background-size_color] contrast-more:from-ui-green contrast-more:to-ui-green',
			)
		case 'grey':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-grey to-ui-grey transition-[background-size_color] contrast-more:from-ui-grey contrast-more:to-ui-grey',
			)
		case 'sky-blue':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-sky-blue to-ui-sky-blue transition-[background-size_color] contrast-more:from-ui-sky-blue contrast-more:to-ui-sky-blue',
			)
		case 'magenta':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-magenta to-ui-magenta transition-[background-size_color] contrast-more:from-ui-magenta contrast-more:to-ui-magenta',
			)
		case 'neutral':
			return twJoin(
				multilineFillBaseClasses,
				'from-zinc-700 to-zinc-700 transition-[background-size_color] contrast-more:from-zinc-700 contrast-more:to-zinc-700 dark:from-zinc-300 dark:to-zinc-300 dark:contrast-more:from-zinc-300 dark:contrast-more:to-zinc-300',
			)
		case 'orange':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-orange to-ui-orange transition-[background-size_color] contrast-more:from-ui-orange contrast-more:to-ui-orange',
			)
		case 'pink':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-pink to-ui-pink transition-[background-size_color] contrast-more:from-ui-pink contrast-more:to-ui-pink',
			)
		case 'purple':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-purple to-ui-purple transition-[background-size_color] contrast-more:from-ui-purple contrast-more:to-ui-purple',
			)
		case 'red':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-red to-ui-red transition-[background-size_color] contrast-more:from-ui-red contrast-more:to-ui-red',
			)
		case 'violet':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-violet to-ui-violet transition-[background-size_color] contrast-more:from-ui-violet contrast-more:to-ui-violet',
			)
		case 'yellow':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-yellow to-ui-yellow transition-[background-size_color] contrast-more:from-ui-yellow contrast-more:to-ui-yellow',
			)
		case 'blue':
		default:
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-blue to-ui-blue transition-[background-size_color] contrast-more:from-ui-blue contrast-more:to-ui-blue',
			)
	}
}

// Define theme-specific multiline fill classes
const getMultilineFillClasses = (theme: LinkProps['theme'] = 'blue') => {
	switch (theme) {
		case 'brown':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-brown/0 to-ui-brown/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-brown focus-visible:to-ui-brown focus-visible:bg-[size:100%_100%] active:from-ui-brown active:to-ui-brown active:bg-[size:100%_100%] contrast-more:from-ui-brown/0 contrast-more:to-ui-brown/0 focus-visible:contrast-more:from-ui-brown focus-visible:contrast-more:to-ui-brown active:contrast-more:from-ui-brown active:contrast-more:to-ui-brown pointer-fine:hover:from-ui-brown pointer-fine:hover:to-ui-brown pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-brown pointer-fine:hover:contrast-more:to-ui-brown',
			)
		case 'green':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-green/0 to-ui-green/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-green focus-visible:to-ui-green focus-visible:bg-[size:100%_100%] active:from-ui-green active:to-ui-green active:bg-[size:100%_100%] contrast-more:from-ui-green/0 contrast-more:to-ui-green/0 focus-visible:contrast-more:from-ui-green focus-visible:contrast-more:to-ui-green active:contrast-more:from-ui-green active:contrast-more:to-ui-green pointer-fine:hover:from-ui-green pointer-fine:hover:to-ui-green pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-green pointer-fine:hover:contrast-more:to-ui-green',
			)
		case 'grey':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-grey/0 to-ui-grey/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-grey focus-visible:to-ui-grey focus-visible:bg-[size:100%_100%] active:from-ui-grey active:to-ui-grey active:bg-[size:100%_100%] contrast-more:from-ui-grey/0 contrast-more:to-ui-grey/0 focus-visible:contrast-more:from-ui-grey focus-visible:contrast-more:to-ui-grey active:contrast-more:from-ui-grey active:contrast-more:to-ui-grey pointer-fine:hover:from-ui-grey pointer-fine:hover:to-ui-grey pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-grey pointer-fine:hover:contrast-more:to-ui-grey',
			)
		case 'sky-blue':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-sky-blue/0 to-ui-sky-blue/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-sky-blue focus-visible:to-ui-sky-blue focus-visible:bg-[size:100%_100%] active:from-ui-sky-blue active:to-ui-sky-blue active:bg-[size:100%_100%] contrast-more:from-ui-sky-blue/0 contrast-more:to-ui-sky-blue/0 focus-visible:contrast-more:from-ui-sky-blue focus-visible:contrast-more:to-ui-sky-blue active:contrast-more:from-ui-sky-blue active:contrast-more:to-ui-sky-blue pointer-fine:hover:from-ui-sky-blue pointer-fine:hover:to-ui-sky-blue pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-sky-blue pointer-fine:hover:contrast-more:to-ui-sky-blue',
			)
		case 'magenta':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-magenta/0 to-ui-magenta/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-magenta focus-visible:to-ui-magenta focus-visible:bg-[size:100%_100%] active:from-ui-magenta active:to-ui-magenta active:bg-[size:100%_100%] contrast-more:from-ui-magenta/0 contrast-more:to-ui-magenta/0 focus-visible:contrast-more:from-ui-magenta focus-visible:contrast-more:to-ui-magenta active:contrast-more:from-ui-magenta active:contrast-more:to-ui-magenta pointer-fine:hover:from-ui-magenta pointer-fine:hover:to-ui-magenta pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-magenta pointer-fine:hover:contrast-more:to-ui-magenta',
			)
		case 'neutral':
			return twJoin(
				multilineFillBaseClasses,
				'from-zinc-700/0 to-zinc-700/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-zinc-700 focus-visible:to-zinc-700 focus-visible:bg-[size:100%_100%] active:from-zinc-700 active:to-zinc-700 active:bg-[size:100%_100%] contrast-more:from-zinc-700/0 contrast-more:to-zinc-700/0 focus-visible:contrast-more:from-zinc-700 focus-visible:contrast-more:to-zinc-700 active:contrast-more:from-zinc-700 active:contrast-more:to-zinc-700 dark:from-zinc-300/0 dark:to-zinc-300/0 dark:focus-visible:from-zinc-300 dark:focus-visible:to-zinc-300 dark:active:from-zinc-300 dark:active:to-zinc-300 dark:contrast-more:from-zinc-300/0 dark:contrast-more:to-zinc-300/0 dark:focus-visible:contrast-more:from-zinc-300 dark:focus-visible:contrast-more:to-zinc-300 dark:active:contrast-more:from-zinc-300 dark:active:contrast-more:to-zinc-300 pointer-fine:hover:from-zinc-700 pointer-fine:hover:to-zinc-700 pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-zinc-700 pointer-fine:hover:contrast-more:to-zinc-700 dark:pointer-fine:hover:from-zinc-300 dark:pointer-fine:hover:to-zinc-300 dark:pointer-fine:hover:contrast-more:from-zinc-300 dark:pointer-fine:hover:contrast-more:to-zinc-300',
			)
		case 'orange':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-orange/0 to-ui-orange/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-orange focus-visible:to-ui-orange focus-visible:bg-[size:100%_100%] active:from-ui-orange active:to-ui-orange active:bg-[size:100%_100%] contrast-more:from-ui-orange/0 contrast-more:to-ui-orange/0 focus-visible:contrast-more:from-ui-orange focus-visible:contrast-more:to-ui-orange active:contrast-more:from-ui-orange active:contrast-more:to-ui-orange pointer-fine:hover:from-ui-orange pointer-fine:hover:to-ui-orange pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-orange pointer-fine:hover:contrast-more:to-ui-orange',
			)
		case 'pink':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-pink/0 to-ui-pink/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-pink focus-visible:to-ui-pink focus-visible:bg-[size:100%_100%] active:from-ui-pink active:to-ui-pink active:bg-[size:100%_100%] contrast-more:from-ui-pink/0 contrast-more:to-ui-pink/0 focus-visible:contrast-more:from-ui-pink focus-visible:contrast-more:to-ui-pink active:contrast-more:from-ui-pink active:contrast-more:to-ui-pink pointer-fine:hover:from-ui-pink pointer-fine:hover:to-ui-pink pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-pink pointer-fine:hover:contrast-more:to-ui-pink',
			)
		case 'purple':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-purple/0 to-ui-purple/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-purple focus-visible:to-ui-purple focus-visible:bg-[size:100%_100%] active:from-ui-purple active:to-ui-purple active:bg-[size:100%_100%] contrast-more:from-ui-purple/0 contrast-more:to-ui-purple/0 focus-visible:contrast-more:from-ui-purple focus-visible:contrast-more:to-ui-purple active:contrast-more:from-ui-purple active:contrast-more:to-ui-purple pointer-fine:hover:from-ui-purple pointer-fine:hover:to-ui-purple pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-purple pointer-fine:hover:contrast-more:to-ui-purple',
			)
		case 'red':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-red/0 to-ui-red/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-red focus-visible:to-ui-red focus-visible:bg-[size:100%_100%] active:from-ui-red active:to-ui-red active:bg-[size:100%_100%] contrast-more:from-ui-red/0 contrast-more:to-ui-red/0 focus-visible:contrast-more:from-ui-red focus-visible:contrast-more:to-ui-red active:contrast-more:from-ui-red active:contrast-more:to-ui-red pointer-fine:hover:from-ui-red pointer-fine:hover:to-ui-red pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-red pointer-fine:hover:contrast-more:to-ui-red',
			)
		case 'violet':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-violet/0 to-ui-violet/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-violet focus-visible:to-ui-violet focus-visible:bg-[size:100%_100%] active:from-ui-violet active:to-ui-violet active:bg-[size:100%_100%] contrast-more:from-ui-violet/0 contrast-more:to-ui-violet/0 focus-visible:contrast-more:from-ui-violet focus-visible:contrast-more:to-ui-violet active:contrast-more:from-ui-violet active:contrast-more:to-ui-violet pointer-fine:hover:from-ui-violet pointer-fine:hover:to-ui-violet pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-violet pointer-fine:hover:contrast-more:to-ui-violet',
			)
		case 'yellow':
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-yellow/0 to-ui-yellow/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-yellow focus-visible:to-ui-yellow focus-visible:bg-[size:100%_100%] active:from-ui-yellow active:to-ui-yellow active:bg-[size:100%_100%] contrast-more:from-ui-yellow/0 contrast-more:to-ui-yellow/0 focus-visible:contrast-more:from-ui-yellow focus-visible:contrast-more:to-ui-yellow active:contrast-more:from-ui-yellow active:contrast-more:to-ui-yellow pointer-fine:hover:from-ui-yellow pointer-fine:hover:to-ui-yellow pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-yellow pointer-fine:hover:contrast-more:to-ui-yellow',
			)
		case 'blue':
		default:
			return twJoin(
				multilineFillBaseClasses,
				'from-ui-blue/0 to-ui-blue/0 bg-[size:50%_0px] bg-[position:50%_50%] transition-[background-size_background-image_color] focus-visible:from-ui-blue focus-visible:to-ui-blue focus-visible:bg-[size:100%_100%] active:from-ui-blue active:to-ui-blue active:bg-[size:100%_100%] contrast-more:from-ui-blue/0 contrast-more:to-ui-blue/0 focus-visible:contrast-more:from-ui-blue focus-visible:contrast-more:to-ui-blue active:contrast-more:from-ui-blue active:contrast-more:to-ui-blue pointer-fine:hover:from-ui-blue pointer-fine:hover:to-ui-blue pointer-fine:hover:bg-[size:100%_100%] pointer-fine:hover:contrast-more:from-ui-blue pointer-fine:hover:contrast-more:to-ui-blue',
			)
	}
}

const getMultilineFillLiftClasses = (theme: LinkProps['theme'] = 'blue') => {
	return twJoin(
		getMultilineFillColorClasses(theme),
		'bg-[size:auto_0px] bg-[position:50%_100%] focus-visible:bg-[size:auto_100%] active:bg-[size:auto_100%] pointer-fine:hover:bg-[size:auto_100%]',
	)
}

const getMultilineFillXClasses = (theme: LinkProps['theme'] = 'blue') => {
	return twJoin(
		getMultilineFillColorClasses(theme),
		'bg-[size:0%_100%] focus-visible:bg-[size:100%_100%] active:bg-[size:100%_100%] pointer-fine:hover:bg-[size:100%_100%]',
	)
}

const getMultilineFillRtlClasses = (theme: LinkProps['theme'] = 'blue') => {
	return twJoin(getMultilineFillXClasses(theme), 'bg-[position:100%_auto]')
}

const getMultilineFillCenterClasses = (theme: LinkProps['theme'] = 'blue') => {
	return twJoin(getMultilineFillXClasses(theme), 'bg-[position:50%_auto]')
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
export default function Link({ as, className, ref, theme = 'blue', type, ...props }: LinkProps) {
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
				return getFillCenterClasses(theme)
			case 'fill-ltr':
				return twJoin([getFillColorTransitionClasses(theme), scaleXClasses, 'after:origin-left'])
			case 'fill-rtl':
				return twJoin([getFillColorTransitionClasses(theme), scaleXClasses, 'after:origin-right'])
			case 'fill-lift':
				return twJoin([getFillColorTransitionClasses(theme), scaleYClasses, 'after:origin-bottom'])
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
				return getMultilineFillClasses(theme)
			case 'multiline-fill-ltr':
				return getMultilineFillXClasses(theme)
			case 'multiline-fill-rtl':
				return getMultilineFillRtlClasses(theme)
			case 'multiline-fill-center':
				return getMultilineFillCenterClasses(theme)
			case 'multiline-fill-lift':
				return getMultilineFillLiftClasses(theme)
			default:
				return lineNormalClasses
		}
	}

	const linkClasses = getLinkClasses()

	const LinkElement = as || Anchor

	return <LinkElement {...props} className={twMerge(linkClasses, className)} ref={ref} />
}
