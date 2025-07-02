// * Types
import { ElementType, ReactNode } from 'react'

export type DetailsBodyProps<TTag extends ElementType = 'div'> = Omit<DisclosurePanelProps<TTag>, 'className'> & {
	className?: string
}

export type DetailsProps<TTag extends ElementType = 'div'> = Omit<DisclosureProps<TTag>, 'className' | 'role'> & {
	className?: string
}

export type DetailsSummaryProps<TTag extends ElementType = typeof Button<typeof HeadlessButton>> = Omit<
	DisclosureButtonProps<TTag>,
	'as' | 'className' | 'role'
> & { arrow?: boolean | ReactNode; className?: string }

// * Headless UI
import {
	Button as HeadlessButton,
	Disclosure,
	DisclosureProps,
	DisclosureButton,
	DisclosureButtonProps,
	DisclosurePanel,
	DisclosurePanelProps,
} from '@headlessui/react'

// * Components
import Button from './button'
import { ChevronDown } from '../icons'

// * Utilities
import { twMerge } from '../utils'

export function DetailsSummary<TTag extends ElementType = typeof Button>({
	arrow = true,
	children,
	className,
	...props
}: DetailsSummaryProps<TTag>) {
	return (
		<DisclosureButton<typeof Button<typeof HeadlessButton>>
			{...props}
			as={Button<typeof HeadlessButton>}
			className={twMerge('w-full', className, Boolean(arrow) && 'grid grid-cols-[1fr_1rem] gap-2')}
			role='summary'
		>
			{bag => (
				<>
					{typeof children === 'function' ? children(bag) : children}

					{arrow &&
						(typeof arrow === 'boolean' ? (
							<ChevronDown className='absolute top-1/2 right-3 block w-4 -translate-y-1/2' />
						) : (
							arrow
						))}
				</>
			)}
		</DisclosureButton>
	)
}

export function DetailsBody<TTag extends ElementType = 'div'>({
	children,
	className,
	...props
}: DetailsBodyProps<TTag>) {
	return (
		<DisclosurePanel
			{...props}
			className={twMerge(
				'grid grid-rows-1fr transition-rows duration-500 ease-exponential data-closed:grid-rows-0fr',
				className,
			)}
			transition
		>
			{bag => (
				<div className='overflow-y-hidden px-2 pt-3 pb-1'>
					{typeof children === 'function' ? children(bag) : children}
				</div>
			)}
		</DisclosurePanel>
	)
}

export default function Details<TTag extends ElementType = 'div'>({
	as = 'div',
	className,
	...props
}: DetailsProps<TTag>) {
	return (
		<Disclosure
			{...props}
			as={as}
			className={twMerge('rounded-2xl bg-neutral-50/20 p-2 backdrop-blur-md backdrop-brightness-150', className)}
			role='details'
		/>
	)
}
