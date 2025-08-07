// * Types
import { AnyElementProps } from '../types'
import { ElementType, ReactElement, ReactNode } from 'react'

export type DropDownButtonProps<TTag extends ElementType = 'button'> = Omit<
	MenuButtonProps<TTag>,
	'as' | 'className'
> & {
	arrow?: boolean | ReactNode
	as?: TTag | ElementType
	className?: string
}

export type DropDownItemProps<TTag extends ElementType = 'div'> = Omit<MenuItemProps<TTag>, 'as'> &
	AnyElementProps<TTag>

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

export type DropDownSeparatorProps<TTag extends ElementType = 'div'> = Omit<MenuSeparatorProps<TTag>, 'as'> &
	AnyElementProps<TTag>

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
}: DropDownButtonProps<TTag>): ReactElement {
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

export function DropDownItem<TTag extends ElementType = 'div'>({
	as,
	...props
}: DropDownItemProps<TTag>): ReactElement {
	return <MenuItem {...props} as={(as as MenuItemProps['as']) || 'div'} />
}

export function DropDownItems({
	anchor,
	children,
	className,
	containerClassName,
	style,
	...props
}: DropDownItemsProps): ReactElement {
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
				'grid grid-rows-1fr rounded-xl shadow-xl transition-rows duration-500 ease-exponential not-data-open:not-data-enter:not-data-leave:grid-rows-0fr data-closed:grid-rows-0fr',
				containerClassName,
			)}
			static={props.static}
			style={{ ...style, minWidth: 'var(--button-width)' }}
			transition
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
}: DropDownSectionProps): ReactElement {
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
									'text-[size:larger] font-bold text-current/80',
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

export function DropDownSeparator<TTag extends ElementType = 'div'>({
	as,
	className,
	...props
}: DropDownSeparatorProps<TTag>): ReactElement {
	return (
		<MenuSeparator
			{...props}
			as={(as as MenuSeparatorProps['as']) || 'div'}
			className={bag =>
				twMerge(
					'my-4 block h-px rounded-full bg-neutral-950/20',
					typeof className === 'function' ? className(bag) : className,
				)
			}
		/>
	)
}

export function DropDown(props: DropDownProps): ReactElement {
	return <Menu {...props} />
}
