import { ComponentProps, ElementType, ForwardRefExoticComponent } from 'react'
import { JSX } from 'react/jsx-runtime'

export type AcceptsRef<T extends ElementType> = T extends keyof JSX.IntrinsicElements
	? true // Intrinsic elements always accept refs
	: T extends ForwardRefExoticComponent<any>
		? true // forwardRef components accept refs
		: T extends (props: infer P) => any
			? 'ref' extends keyof P
				? true // React 19 components with ref prop
				: false
			: false

export type AnyElementProps<T extends ElementType, Props extends { [key: string]: unknown } = {}> = AsElement<T> &
	Omit<ComponentProps<T>, keyof AsElement> &
	Props

export type AsElement<T extends ElementType = 'div'> = {
	/** Specify what element should be rendered */
	as?: T
}

export type MergeTypes<TypesArray extends unknown[], Result = object> = TypesArray extends [
	infer Head,
	...infer Remaining,
]
	? MergeTypes<Remaining, Result & Head>
	: Result

export type OneOf<
	TypesArray extends unknown[],
	Result = never,
	AllProps = MergeTypes<TypesArray>,
> = TypesArray extends [infer Head, ...infer Remaining]
	? OneOf<Remaining, Result | OnlyFirst<Head, AllProps>, AllProps>
	: Result

export type OnlyFirst<F, L> = F & { [Key in keyof Omit<L, keyof F>]?: never }
