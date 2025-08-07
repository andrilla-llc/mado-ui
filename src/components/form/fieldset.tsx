// * Types
import { OneOf } from '../../types'

type NameOrLegend = OneOf<
	[
		{
			legend: string
			legendProps?: Omit<LegendProps, 'children'> & {
				/** @deprecated Use the `legend` prop instead. */
				children?: never
			}
		},
		{ name: string },
	]
>

export type FieldsetProps = Omit<HeadlessFieldsetProps, 'name'> &
	NameOrLegend & {
		/** When true, the fieldset will only be used for decoration and will not affect the `formContext`. */
		decorative?: boolean
		/**
		 * Joins all values in the fieldset into a single string value.
		 *
		 * @example
		 * ```tsx
		 * <Fieldset legend='Full Name' join=' '>
		 *   <Input name='First Name />
		 *   <Input name='Last Name />
		 * </Fieldset>
		 * ```
		 * `[{ name: 'First Name', value: 'Johnny' }, { name: 'Last Name', value: 'Appleseed' }]`
		 *
		 * ↓
		 *
		 * `[{ name: 'Full Name', value: 'Johnny Appleseed' }]`
		 */
		join?: string
	}

// * Mado UI
import { FieldsetContextProvider } from '../../hooks'

// * React
import { ReactElement, useId } from 'react'

// * Headless UI
import {
	Fieldset as HeadlessFieldset,
	FieldsetProps as HeadlessFieldsetProps,
	Legend,
	LegendProps,
} from '@headlessui/react'

// * Utilities
import { twMerge, toLowerCase } from '../../utils'

export function Fieldset({
	children,
	className,
	decorative = false,
	join,
	legend,
	legendProps,
	name,
	...props
}: FieldsetProps): ReactElement {
	const uniqueID = useId()

	const fieldsetId = toLowerCase(legend || name!, [' ', '_']) + '§' + uniqueID

	const { className: legendClassName, ...restLegendProps } = legendProps || {}

	name = legend || name!

	return (
		<FieldsetContextProvider
			initialValue={{
				decorative,
				fieldList: [],
				id: fieldsetId,
				join,
				name,
			}}
		>
			<HeadlessFieldset
				{...props}
				name={name}
				className={bag => twMerge('contents', typeof className === 'function' ? className(bag) : className)}
			>
				{bag => (
					<>
						{legend && (
							<Legend
								{...restLegendProps}
								className={twMerge(
									'text-xl font-bold text-current/80',
									typeof legendClassName === 'function' ? legendClassName(bag) : legendClassName,
								)}
							>
								{legend}
							</Legend>
						)}

						{typeof children === 'function' ? children(bag) : children}
					</>
				)}
			</HeadlessFieldset>
		</FieldsetContextProvider>
	)
}
