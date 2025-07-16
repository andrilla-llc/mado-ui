import { ComponentPropsWithRef, ElementType, RefObject } from 'react'

export type AnyElementProps<TTag extends ElementType, Props extends { [key: string]: unknown } = {}> = AsElement<TTag> &
	Omit<ComponentPropsWithRef<TTag>, keyof AsElement> &
	Props

export type AsElement<TTag extends ElementType = 'div'> = {
	/** Specify what element should be rendered */
	as?: TTag
}

export type ColorTheme = OneOf<
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
