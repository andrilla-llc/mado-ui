// * Types
export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	customize?: Partial<{
		h1: string
		h2: string
		h3: string
		h4: string
		h5: string
		h6: string
	}>
	ref?: RefObject<HTMLHeadingElement | null>
}

// * React
import { Children, HTMLAttributes, ReactNode, RefObject, isValidElement } from 'react'

// * Utilities
import { twMerge, twSort } from '../utils'

function getTextFromChildren(children: ReactNode) {
	let text = ''

	Children.forEach(children, child => {
		if (typeof child === 'string' || typeof child === 'number') {
			text += child
		} else if (isValidElement(child)) {
			text += getTextFromChildren((child.props as { [key: string]: any }).children)
		}
	})

	return text
}

/**
 * # Heading
 * A heading component that renders HTML heading elements (h1-h6) with appropriate styling.
 * Automatically generates an ID for the heading based on its content if none is provided.
 */
export default function Heading({ as = 'h2', children, customize, className, id, ref, ...props }: HeadingProps) {
	const H = as

	const targetableID = id || getTextFromChildren(children).replace(/\s+/g, '-').toLowerCase()

	const getBaseClasses = () => {
		switch (as) {
			case 'h1':
				return customize?.h1 || twSort('pb-2.5 text-6xl font-black last:pb-0')
			case 'h3':
				return customize?.h3 || twSort('pb-2 text-4xl font-extralight last:pb-0')
			case 'h4':
				return customize?.h4 || twSort('pb-2 text-3xl font-extrabold last:pb-0')
			case 'h5':
				return customize?.h5 || twSort('pb-1.5 text-2xl font-semibold last:pb-0')
			case 'h6':
				return customize?.h6 || twSort('pb-1 text-xl font-bold last:pb-0')
			default:
				return customize?.h2 || twSort('pb-2.5 text-5xl font-medium last:pb-0')
		}
	}

	const baseClasses = getBaseClasses()

	return (
		<H ref={ref} id={targetableID} {...props} className={twMerge(baseClasses, className)}>
			{children}
		</H>
	)
}
