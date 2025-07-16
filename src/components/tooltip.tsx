// * Types
import { AnyElementProps } from '../types'

export type TooltipProps = {
	anchor?: Placement
	arrow?: boolean
	arrowClassName?: string
	children:
		| ReactNode
		| (({ openTooltip, closeTooltip }: { openTooltip: () => void; closeTooltip: () => void }) => ReactNode)
	delay?: number
	offset?: number
	onClose?: () => void
	onOpen?: () => void
	portal?: boolean
	maxWidth?: number
}

export type TooltipTriggerProps<T extends ElementType = 'button'> = AnyElementProps<T> & {
	asChild?: boolean
}

export type TooltipPanelProps<T extends ElementType = 'div'> = AnyElementProps<T>

// * React
import {
	cloneElement,
	ComponentProps,
	CSSProperties,
	ElementType,
	FocusEventHandler,
	Fragment,
	isValidElement,
	MouseEventHandler,
	ReactElement,
	ReactNode,
	TouchEventHandler,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

// * Floating UI
import {
	arrow as floatingArrow,
	autoUpdate,
	flip,
	offset as floatingOffset,
	Placement,
	shift,
	useFloating,
	size,
} from '@floating-ui/react-dom'

// * Components
import { Button as HeadlessButton, Transition } from '@headlessui/react'

// * Utilities
import { findComponentByType, twMerge } from '../utils'

export function TooltipTrigger<T extends ElementType = typeof HeadlessButton>({
	as,
	asChild = false,
	children,
	...props
}: TooltipTriggerProps<T>) {
	const TooltipTriggerElement = as || HeadlessButton

	if (asChild && isValidElement(children)) return cloneElement(children as ReactElement<any>, props)

	return <TooltipTriggerElement {...props}>{children}</TooltipTriggerElement>
}

export function TooltipPanel<T extends ElementType = 'div'>({
	as,
	children,
	className,
	style,
	...props
}: TooltipPanelProps<T>) {
	const TooltipPanelElement = as || 'div'

	return (
		<TooltipPanelElement
			{...props}
			className={twMerge(
				'absolute top-0 left-0 z-50 w-max rounded-md bg-neutral-50 px-2 py-1 text-sm text-neutral-950 opacity-0 shadow-lg outline-1 outline-neutral-400 data-portal:fixed data-ready:animate-fade-in dark:bg-neutral-800 dark:text-neutral-50 dark:shadow-none dark:-outline-offset-1 dark:outline-neutral-600',
				className,
			)}
			style={style}
		>
			{children}
		</TooltipPanelElement>
	)
}

export function Tooltip({
	anchor = 'top',
	arrow,
	arrowClassName,
	children,
	delay = 500,
	offset = 8,
	onClose,
	onOpen,
	portal,
}: TooltipProps) {
	const [isOpen, setIsOpen] = useState(false),
		timeoutRef = useRef<NodeJS.Timeout>(undefined),
		arrowRef = useRef<HTMLDivElement>(null)

	const [bodyElement, setBodyElement] = useState<HTMLBodyElement | null>(() =>
		typeof window !== 'undefined' ? (document.body as HTMLBodyElement) : null,
	)

	useEffect(() => {
		if (typeof window !== 'undefined' && !bodyElement) {
			const documentBody = document.body as HTMLBodyElement

			setBodyElement(documentBody)
		}
	}, [bodyElement, portal])

	const { refs, floatingStyles, isPositioned, placement, middlewareData } = useFloating({
		middleware: [
			floatingOffset(offset),
			flip({ padding: 20 }),
			shift({ padding: 20 }),
			size({
				apply({ availableHeight, availableWidth, elements }) {
					const height = `${Math.max(0, availableHeight) / 16}rem`,
						width = `${Math.min(418, availableWidth) / 16}rem`

					elements.floating.style.maxHeight = height
					elements.floating.style.maxWidth = width
				},
			}),
			...(arrowRef.current ? [floatingArrow({ element: arrowRef.current })] : []),
		],
		placement: anchor,
		strategy: portal ? 'fixed' : 'absolute',
		whileElementsMounted: autoUpdate,
		open: isOpen,
	})

	const openTooltip = useCallback(() => {
		clearTimeout(timeoutRef.current)

		if (delay > 0) {
			timeoutRef.current = setTimeout(() => {
				setIsOpen(true)
				onOpen?.()
			}, delay)
		} else {
			setIsOpen(true)
			onOpen?.()
		}
	}, [delay, onOpen])

	const closeTooltip = useCallback(() => {
		clearTimeout(timeoutRef.current)
		setIsOpen(false)
		onClose?.()
	}, [onClose])

	useEffect(() => {
		return () => {
			clearTimeout(timeoutRef.current)
		}
	}, [])

	const content = typeof children === 'function' ? children({ openTooltip, closeTooltip }) : children

	const triggerElement = findComponentByType<TooltipTriggerProps>(content, TooltipTrigger),
		contentElement = findComponentByType<TooltipPanelProps>(content, TooltipPanel)

	if (!contentElement) throw new Error('TooltipPanel must be defined in Tooltip children')

	if (!triggerElement && typeof children !== 'function')
		throw new Error('TooltipTrigger must be provided when not using render prop pattern')

	const arrowStyles: CSSProperties = {}

	const reversedAnchor = {
		top: 'bottom',
		right: 'left',
		bottom: 'top',
		left: 'right',
		'top-start': 'bottom left',
		'top-end': 'bottom right',
		'right-start': 'top left',
		'right-end': 'bottom left',
		'bottom-start': 'top left',
		'bottom-end': 'top right',
		'left-start': 'top right',
		'left-end': 'bottom right',
	}[placement]

	if (middlewareData.arrow && arrow) {
		const { x, y } = middlewareData.arrow

		const staticSide = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right',
		}[placement.split('-')[0]] as 'top' | 'right' | 'bottom' | 'left'

		if (staticSide) {
			arrowStyles[staticSide] = '-4px'
			if (x != null) arrowStyles.left = `${x}px`
			if (y != null) arrowStyles.top = `${y}px`
		}
	}

	const getArrowLocationClasses = () => {
		switch (placement) {
			case 'bottom':
			case 'bottom-end':
			case 'bottom-start':
				return '-translate-y-1'
			case 'top':
			case 'top-end':
			case 'top-start':
				return 'rotate-180 translate-y-1'
			case 'left':
			case 'left-end':
			case 'left-start':
				return 'rotate-90 translate-x-2'
			case 'right':
			case 'right-end':
			case 'right-start':
				return '-rotate-90 -translate-x-2'
		}
	}

	const arrowLocationClasses = getArrowLocationClasses()

	const handleMouseEnter: MouseEventHandler<HTMLButtonElement> = e => {
		openTooltip()
		triggerElement?.props.onMouseEnter?.(e)
	}

	const handleMouseLeave: MouseEventHandler<HTMLButtonElement> = e => {
		triggerElement?.props.onMouseLeave?.(e)
		closeTooltip()
	}

	const handleTouchStart: TouchEventHandler<HTMLButtonElement> = e => {
		openTooltip()
		triggerElement?.props.onTouchStart?.(e)
	}

	const handleFocus: FocusEventHandler<HTMLButtonElement> = e => {
		triggerElement?.props.onFocus?.(e)
		openTooltip()
	}

	const handleBlur: FocusEventHandler<HTMLButtonElement> = e => {
		triggerElement?.props.onBlur?.(e)
		closeTooltip()
	}

	const tooltipContent = (
		<>
			{isOpen &&
				contentElement &&
				cloneElement(contentElement as ReactElement<any>, {
					children: (
						<>
							{contentElement.props.children}

							{arrow && (
								<ArrowSvg
									className={twMerge('absolute', arrowLocationClasses, arrowClassName)}
									style={arrowStyles}
									data-tooltip-arrow
								/>
							)}
						</>
					),
					...(portal ? { 'data-portal': true } : {}),
					...(isPositioned ? { 'data-ready': true } : {}),
					onMouseEnter: openTooltip,
					onMouseLeave: closeTooltip,
					onTouchStart: handleTouchStart,
					ref: (node: HTMLDivElement | null) => {
						refs.setFloating(node)

						if (node && arrow) {
							const arrowElement = node.querySelector('[data-tooltip-arrow]') as HTMLDivElement

							if (arrowElement) arrowRef.current = arrowElement
						}
					},
					role: 'tooltip',
					style: {
						...contentElement.props.style,
						...floatingStyles,
						transformOrigin: reversedAnchor,
						pointerEvents: 'none',
					},
				})}
		</>
	)

	return (
		<>
			{triggerElement &&
				cloneElement(triggerElement as ReactElement<any>, {
					ref: refs.setReference,
					onMouseEnter: handleMouseEnter,
					onMouseLeave: handleMouseLeave,
					onFocus: handleFocus,
					onBlur: handleBlur,
					'aria-describedby': isOpen ? 'tooltip' : undefined,
				})}

			{portal ? bodyElement && createPortal(tooltipContent, bodyElement) : tooltipContent}
		</>
	)
}

function ArrowSvg({ className, ...props }: ComponentProps<'svg'>) {
	return (
		<svg viewBox='0 0 20 10' className={twMerge('h-2.5 w-5 fill-none', className)} {...props}>
			<path
				d='M9.66437 2.60207L4.80758 6.97318C4.07308 7.63423 3.11989 8 2.13172 8H0V10H20V8H18.5349C17.5468 8 16.5936 7.63423 15.8591 6.97318L11.0023 2.60207C10.622 2.2598 10.0447 2.25979 9.66437 2.60207Z'
				className='fill-neutral-50 dark:fill-neutral-800'
			/>
			<path
				d='M8.99542 1.85876C9.75604 1.17425 10.9106 1.17422 11.6713 1.85878L16.5281 6.22989C17.0789 6.72568 17.7938 7.00001 18.5349 7.00001L15.89 7L11.0023 2.60207C10.622 2.2598 10.0447 2.2598 9.66436 2.60207L4.77734 7L2.13171 7.00001C2.87284 7.00001 3.58774 6.72568 4.13861 6.22989L8.99542 1.85876Z'
				className='fill-neutral-400 dark:fill-none'
			/>
			<path
				d='M10.3333 3.34539L5.47654 7.71648C4.55842 8.54279 3.36693 9 2.13172 9H0V8H2.13172C3.11989 8 4.07308 7.63423 4.80758 6.97318L9.66437 2.60207C10.0447 2.25979 10.622 2.2598 11.0023 2.60207L15.8591 6.97318C16.5936 7.63423 17.5468 8 18.5349 8H20V9H18.5349C17.2998 9 16.1083 8.54278 15.1901 7.71648L10.3333 3.34539Z'
				className='dark:fill-neutral-600'
			/>
		</svg>
	)
}
