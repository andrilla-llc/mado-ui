// * Types
import { ReactNode } from 'react'

export type SubmitButtonProps = ButtonProps<HTMLButtonElement> & {
	/** The message to display when the form status is "error" */
	error?: ReactNode
	/** The message to display when the form status is "incomplete" */
	incomplete?: ReactNode
	/** The message to display when the form status is "loading" */
	loading?: ReactNode
	/** @deprecated Use `children` instead.
	 *
	 * ~~The message to display when the form status is "ready"~~
	 */
	ready?: never
	/** The message to display when the form status is "success" */
	success?: ReactNode
	/** The message to display when the form status is "readonly" */
	readonly?: ReactNode
}

// * Hooks
import { useFormStatus } from '../../hooks'

// * Components
import Button, { ButtonProps } from '../button'

// * Utilities
import { twMerge, twSort } from '../../utils'

export default function SubmitButton({
	children,
	className,
	error,
	incomplete,
	loading,
	success,
	theme,
	type = 'submit',
	ref,
	...props
}: SubmitButtonProps) {
	const [formStatus] = useFormStatus()

	const getFormStatusButtonClasses = () => {
		switch (formStatus) {
			case 'loading':
				return twSort('animate-pulse cursor-wait text-lg leading-6 font-black tracking-widest')
			case 'error':
			case 'success':
				return 'cursor-not-allowed'
			default:
				return undefined
		}
	}

	const formStatusButtonClasses = getFormStatusButtonClasses()

	const getFormStatusButtonTheme = () => {
		switch (formStatus) {
			case 'incomplete':
				return 'grey'
			case 'loading':
				return 'blue'
			case 'error':
				return 'red'
			case 'success':
				return 'green'
			default:
				return theme
		}
	}

	const formStatusButtonTheme = getFormStatusButtonTheme()

	const getButtonText = () => {
		switch (formStatus) {
			case 'incomplete':
				return incomplete || 'Complete Form'
			case 'loading':
				return (
					loading || (
						<>
							<span className='inline-block animate-wave animation-delay-300'>•</span>
							<span className='inline-block animate-wave animation-delay-150'>•</span>
							<span className='inline-block animate-wave'>•</span>
						</>
					)
				)
			case 'error':
				return (
					<>
						{error || 'Error'}{' '}
						<span className='absolute top-1/2 ml-1.5 translate-y-[calc(-50%-1.5px)] text-2xl'>&times;</span>
					</>
				)
			case 'success':
				return success || 'Successfully Submitted'
			default:
				return children || 'Submit'
		}
	}

	const buttonText = getButtonText()

	return (
		<Button<HTMLButtonElement>
			{...props}
			className={twMerge([formStatusButtonClasses, 'w-full', className])}
			ref={ref}
			theme={formStatusButtonTheme}
			type={type}
		>
			{buttonText}
		</Button>
	)
}
