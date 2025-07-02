// * Types
import { ElementType, ReactNode } from 'react'

export type DropDownButtonProps<TTag extends ElementType = 'button'> = Omit<
	MenuButtonProps<TTag>,
	'as' | 'className'
> & {
	arrow?: boolean | ReactNode
	as?: TTag | ElementType
	className?: string
}

export type DropDownItemProps = MenuItemProps

export type DropDownItemsProps = Omit<MenuItemsProps, 'className' | 'transition'> & {
	className?: string
	containerClassName?: string
}

export type DropDownProps = MenuProps

export type DropDownSectionProps = MenuSectionProps & {
	label?: string
	labelProps?: Omit<MenuHeadingProps, 'children'> & {
		/** @deprecated Use `label` instead. */
		children?: never
	}
	separatorAbove?: boolean
	separatorBelow?: boolean
}

export type DropDownSeparatorProps = MenuSeparatorProps

// * Headless UI
import {
	Menu,
	MenuButton,
	MenuButtonProps,
	MenuHeading,
	MenuHeadingProps,
	MenuItem,
	MenuItemProps,
	MenuItems,
	MenuItemsProps,
	MenuProps,
	MenuSection,
	MenuSectionProps,
	MenuSeparator,
	MenuSeparatorProps,
} from '@headlessui/react'

// * Components
import { ChevronDown } from '../icons'

// * Utilities
import { twMerge } from '../utils'
import { twJoin } from 'tailwind-merge'

export function DropDownButton<TTag extends ElementType = 'button'>({
	arrow = true,
	as,
	children,
	className,
	...props
}: DropDownButtonProps<TTag>) {
	return (
		<MenuButton {...props} as={as || 'button'} className={twJoin('group/button', className)}>
			{children}

			{arrow &&
				(typeof arrow === 'boolean' ? (
					<ChevronDown className='-top-px -mr-1 ml-2 w-4 animate-flip-again group-data-open/button:animate-flip' />
				) : (
					arrow
				))}
		</MenuButton>
	)
}

export function DropDownItem({ as, ...props }: DropDownItemProps) {
	return <MenuItem as={as || 'div'} {...props} />
}

export function DropDownItems({
	anchor,
	children,
	className,
	containerClassName,
	style,
	...props
}: DropDownItemsProps) {
	const getAnchorProps = () => {
		let initialAnchor: typeof anchor = { gap: '1rem', padding: '1rem', to: 'bottom start' }

		if (anchor) {
			if (typeof anchor === 'string') initialAnchor.to = anchor

			if (typeof anchor === 'object') initialAnchor = { ...initialAnchor, ...anchor }
		}

		return initialAnchor
	}

	const anchorProps = getAnchorProps()

	return (
		<MenuItems
			{...props}
			anchor={anchorProps}
			className={twMerge(
				'grid grid-rows-1fr rounded-xl shadow-xl transition-rows duration-500 ease-exponential data-closed:grid-rows-0fr',
				containerClassName,
			)}
			transition
			style={{ ...style, minWidth: 'var(--button-width)' }}
		>
			{bag => (
				<div className='overflow-y-scroll'>
					<div
						className={twMerge(
							'rounded-xl bg-neutral-50/20 px-6 py-5 backdrop-blur-md backdrop-brightness-150',
							className,
						)}
					>
						{typeof children === 'function' ? children(bag) : children}
					</div>
				</div>
			)}
		</MenuItems>
	)
}

export function DropDownSection({
	children,
	label,
	labelProps,
	separatorAbove,
	separatorBelow,
	...props
}: DropDownSectionProps) {
	const { labelClassName, ...restLabelProps } = { labelClassName: labelProps?.className || '', ...labelProps }

	return (
		<MenuSection {...props}>
			{sectionBag => (
				<>
					{separatorAbove && <DropDownSeparator />}

					{label && (
						<MenuHeading
							{...restLabelProps}
							className={headingBag =>
								twMerge(
									'text-[size:larger] font-bold',
									typeof labelClassName === 'function' ? labelClassName(headingBag) : labelClassName,
								)
							}
						>
							{label}
						</MenuHeading>
					)}

					{typeof children === 'function' ? children(sectionBag) : children}

					{separatorBelow && <DropDownSeparator />}
				</>
			)}
		</MenuSection>
	)
}

export function DropDownSeparator({ className, ...props }: DropDownSeparatorProps) {
	return (
		<MenuSeparator
			{...props}
			className={bag =>
				twMerge(
					'my-4 block h-px rounded-full bg-neutral-950/20',
					typeof className === 'function' ? className(bag) : className,
				)
			}
		/>
	)
}

export default function DropDown(props: DropDownProps) {
	return <Menu {...props} />
}
