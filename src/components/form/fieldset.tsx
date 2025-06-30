// * Types
export type FieldsetProps = HeadlessFieldsetProps & {
	legend?: string
	legendProps?: Omit<LegendProps, 'children'> & {
		/** @deprecated Use the `legend` prop instead. */
		children?: never
	}
}

// * Headless UI
import {
	Fieldset as HeadlessFieldset,
	FieldsetProps as HeadlessFieldsetProps,
	Legend,
	LegendProps,
} from '@headlessui/react'

// * Utilities
import { twMerge } from '../../utils'

export default function Fieldset({ children, className, legend, legendProps, ...props }: FieldsetProps) {
	const { className: legendClassName, ...restLegendProps } = legendProps || {}

	return (
		<HeadlessFieldset
			{...props}
			className={bag => twMerge('contents', typeof className === 'function' ? className(bag) : className)}
		>
			{bag => (
				<>
					<Legend
						{...restLegendProps}
						className={twMerge(
							'text-lg font-bold sm:text-xl',
							typeof legendClassName === 'function' ? legendClassName(bag) : legendClassName,
						)}
					>
						{legend}
					</Legend>

					{typeof children === 'function' ? children(bag) : children}
				</>
			)}
		</HeadlessFieldset>
	)
}
