// * Types
import { AnyElementProps } from '../types'

export type ModalProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
	children: ReactNode | (({ openModal, closeModal }: { openModal: () => void; closeModal: () => void }) => ReactNode)
	closeButtonRef?: RefObject<HTMLButtonElement | null>
	dragToClose?: boolean
	onClose?: () => void
	onOpen?: () => void
	place?: 'center' | 'bottom'
}

// * React
import {
	cloneElement,
	ElementType,
	HTMLAttributes,
	MouseEventHandler,
	ReactElement,
	ReactNode,
	RefObject,
	TouchEventHandler,
	useEffect,
	useRef,
	useState,
} from 'react'
import { createPortal } from 'react-dom'

// * Components
import {
	Button as HeadlessButton,
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
	DialogTitleProps,
} from '@headlessui/react'
import Button from './button'
import { Xmark } from '../icons'

// * Utilities
import { easeOutExpo, findComponentByType, twMerge } from '../utils'

export function ModalTrigger<T extends ElementType = typeof HeadlessButton>({ as, ...props }: AnyElementProps<T>) {
	const Element = as || HeadlessButton

	return <Element {...props} />
}

export function ModalTitle(props: DialogTitleProps) {
	return <DialogTitle {...props} />
}

export function ModalDialog(props: HTMLAttributes<HTMLDivElement>) {
	return <div {...props} />
}

export function ModalClose<T extends ElementType = typeof HeadlessButton>({ as, ...props }: AnyElementProps<T>) {
	const Element = as || HeadlessButton

	return <Element {...props} />
}

export default function Modal({ children, className, onClose, onOpen, place = 'bottom' }: ModalProps) {
	const [bodyElement, setBodyElement] = useState<HTMLBodyElement | null>(null)

	useEffect(() => {
		if (!bodyElement && typeof window !== 'undefined') setBodyElement(document.body as HTMLBodyElement)
	}, [bodyElement])

	const [isOpen, setIsOpen] = useState(false)

	const dialogPanelRef = useRef<HTMLElement>(null),
		dragMoveBoxRef = useRef<HTMLDivElement>(null),
		// lastTouchYRef = useRef(0),
		startDragCoords = useRef({ x: 0, y: 0 })

	const [allowDragClose, setAllowDragClose] = useState(false),
		[readyToClose, setReadyToClose] = useState(false)

	const openModal = () => {
		console.log('open')
		setIsOpen(true)
		onOpen?.()
	}

	const closeModal = () => {
		console.log('close')
		setIsOpen(false)
		onClose?.()
	}

	const enableClose = (clientX: number, clientY: number) => {
		startDragCoords.current.x = clientX
		startDragCoords.current.y = clientY
		dialogPanelRef.current!.style.transitionDuration = '0s'

		setAllowDragClose(true)
	}

	const enableTouchClose: TouchEventHandler<HTMLButtonElement> = e => {
		const { touches } = e,
			touch = touches[0],
			{ clientY } = touch

		enableClose(0, clientY)
	}

	const enableMouseClose: MouseEventHandler<HTMLButtonElement> = e => {
		const { clientX, clientY } = e

		enableClose(clientX, clientY)
	}

	const handleMove = (clientX: number, clientY: number) => {
		if (!dialogPanelRef.current) return

		let deltaX = clientX - startDragCoords.current.x,
			deltaY = clientY - startDragCoords.current.y

		if (deltaX > 0) deltaX = easeOutExpo(Math.abs(deltaX), 0, 25, 5000)
		if (deltaX < 0) deltaX = -easeOutExpo(Math.abs(deltaX), 0, 25, 5000)
		if (deltaY < 0) deltaY = -easeOutExpo(Math.abs(deltaY), 0, 25, 2000)

		if (deltaY >= 100 && !readyToClose) {
			setReadyToClose(true)
		} else if (deltaY < 100 && readyToClose) {
			setReadyToClose(false)
		}

		const greaterThanMediaSmall = innerWidth > 640

		dialogPanelRef.current.style.translate = `calc(-50% + ${deltaX}px) ${greaterThanMediaSmall ? `calc(-50% + ${deltaY}px)` : `${deltaY}px`}`
	}

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = e => {
		if (!allowDragClose) return

		const { clientX, clientY } = e

		handleMove(clientX, clientY)
	}

	const disableDragClose = (clientY: number) => {
		const deltaY = clientY - startDragCoords.current.y

		dialogPanelRef.current!.style.transitionDuration = ''

		if (deltaY >= 100) {
			closeModal()
			setReadyToClose(false)
		} else {
			setTimeout(() => (dialogPanelRef.current!.style.removeProperty('translate'), 50))
		}
	}

	const disableMouseDragClose: MouseEventHandler<HTMLDivElement> = e => {
		if (allowDragClose) setAllowDragClose(false)

		const { clientY } = e

		disableDragClose(clientY)
	}

	const content = typeof children === 'function' ? children({ openModal, closeModal }) : children

	const dialogElement = findComponentByType(content, ModalDialog)

	if (!dialogElement) throw new Error('ModalDialog must be defined in Modal children')

	let triggerElement: ReactElement | null = null

	if (typeof children !== 'function') {
		triggerElement = findComponentByType(content, ModalTrigger)

		if (!triggerElement) throw new Error('ModalTrigger must be provided when not using render prop pattern')
	} else {
		triggerElement = findComponentByType(content, ModalTrigger)
	}

	return (
		<>
			{allowDragClose &&
				bodyElement &&
				createPortal(
					<div
						ref={dragMoveBoxRef}
						className='z-99 pointer-coarse:hidden fixed inset-0 h-dvh w-screen bg-transparent active:cursor-grabbing'
						onMouseMove={handleMouseMove}
						onMouseUp={disableMouseDragClose}
					></div>,
					bodyElement,
				)}

			{triggerElement &&
				cloneElement(triggerElement as ReactElement<HTMLAttributes<HTMLButtonElement>>, { onClick: openModal })}

			<Dialog
				open={isOpen}
				onClose={closeModal}
				className={[
					'isolate z-50',
					place === 'bottom' &&
						'after:fixed after:inset-x-0 after:bottom-0 after:-z-10 after:h-16 after:bg-neutral-50 sm:after:hidden',
				].join(' ')}
			>
				<DialogBackdrop
					transition
					className={[
						'duration-750 ease-exponential data-closed:opacity-0 fixed inset-0 cursor-pointer transition-[opacity_background-color_backdrop-filter_-webkit-backdrop-filter] delay-100',
						readyToClose
							? 'bg-neutral-50/5 backdrop-blur-[1px] dark:bg-neutral-950/5'
							: 'bg-neutral-50/25 backdrop-blur-sm dark:bg-neutral-950/25',
					].join(' ')}
				>
					<Button
						theme='blue'
						padding='none'
						rounded='full'
						className='group/button pointer-fine:hover:w-20 fixed right-4 top-4 h-7 w-7 overflow-x-hidden transition-[scale_width_filter]'
					>
						<div className='pointer-fine:group-hover/button:-translate-x-0.5 ease-exponential absolute right-1 top-1 flex items-center gap-1 pt-px transition-transform duration-300'>
							<span className='block text-xs font-medium uppercase leading-none text-neutral-50'>
								Close<span className='sr-only'> Modal</span>
							</span>

							<Xmark className='-top-px block size-5 rotate-90 scale-75 fill-white stroke-white stroke-1 transition-transform duration-300 ease-in-out group-hover/button:rotate-0' />
						</div>
					</Button>
				</DialogBackdrop>

				<DialogPanel
					ref={dialogPanelRef}
					transition
					className={twMerge(
						'duration-750 ease-exponential data-closed:opacity-0 data-closed:scale-50 fixed left-1/2 -translate-x-1/2 overflow-y-scroll bg-neutral-50 p-4 shadow-[0_-15px_50px_-12px] shadow-neutral-950/25 transition-[transform_translate_opacity] sm:w-[calc(100vw-2rem)] sm:max-w-fit sm:p-6 sm:shadow-2xl lg:p-8 dark:bg-neutral-900',
						place === 'center'
							? 'data-enter:translate-y-[calc(-50%+12rem)] data-leave:translate-y-[calc(-50%-8rem)] top-1/2 -translate-y-1/2 rounded-2xl'
							: 'rounded-t-4xl pointer-fine:top-1/2 pointer-fine:bottom-auto pointer-fine:-translate-y-1/2 pointer-fine:rounded-2xl data-enter:translate-y-full sm:data-enter:translate-y-[calc(-50%+12rem)] data-leave:translate-y-full sm:data-leave:translate-y-[calc(-50%-8rem)] sm:data-open:-translate-y-1/2 bottom-0 h-fit max-h-[calc(100dvh-4rem)] translate-y-0 sm:bottom-auto sm:top-1/2 sm:rounded-b-2xl sm:rounded-t-2xl',
						className,
					)}
					// onTouchStart={dragToClose ? handleTouchStart : undefined}
					// onTouchMove={handleTouchMove}
					// onTouchEnd={disableTouchDragClose}
				>
					<button
						onTouchStart={enableTouchClose}
						onMouseDown={enableMouseClose}
						className={[
							'after:ease-exponential absolute inset-x-0 top-0 z-10 flex h-6 cursor-grab items-center justify-center after:h-1 after:w-8 after:rounded-full after:transition-[transform_background-color] after:duration-500 active:cursor-grabbing',
							readyToClose
								? 'after:scale-x-200 after:scale-y-200 after:bg-ui-blue'
								: 'after:bg-ui-grey/50 active:after:bg-ui-grey pointer-fine:hover:after:scale-x-125 pointer-fine:hover:after:bg-neutral-500/75 pointer-fine:active:after:scale-x-150 pointer-fine:active:after:bg-ui-grey active:after:scale-x-150 active:after:scale-y-125',
						].join(' ')}
					>
						<span className='sr-only'>Drag down to close</span>
					</button>

					{dialogElement}
				</DialogPanel>
			</Dialog>
		</>
	)
}
