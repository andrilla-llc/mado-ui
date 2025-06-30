// * Types
import { ReactNode } from 'react'

export type SubmitButtonProps = Omit<
	ButtonProps<'button'> & { href?: never },
	'as' | 'customTheme' | 'href' | 'theme'
> & {
	customTheme?: {
		/** Example: `'[--theme-color:var(--color-blue-500)]'` */
		themeColor: string
		/**
		 * @deprecated Only `themeColor` is available.
		 *
		 * ~~This doesn't use any preset color theme classes.~~
		 */
		classes?: never
	}
	/** The message to display when the form status is "error" */
	error?: ReactNode
	/** The message to display when the form status is "incomplete" */
	incomplete?: ReactNode
	/** The message to display when the form status is "loading" */
	loading?: ReactNode
	/** The message to display when the form status is "readonly" */
	readonly?: ReactNode
	/**
	 * @deprecated Use `children` instead.
	 *
	 * ~~The message to display when the form status is "ready"~~
	 */
	ready?: never
	/** The message to display when the form status is "success" */
	success?: ReactNode
	/**
	 * @deprecated Use `customTheme.themeColor` instead.
	 *
	 * ~~Color theme.~~
	 */
	theme?: never
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
	customTheme,
	error,
	incomplete,
	loading,
	success,
	type = 'submit',
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

	const getDataFormState = () => {
		switch (formStatus) {
			case 'error':
				return { 'data-error': true }
			case 'incomplete':
				return { 'data-incomplete': true }
			case 'loading':
				return { 'data-loading': true }
			case 'readonly':
				return { 'data-readonly': true }
			case 'ready':
				return { 'data-ready': true }
			case 'success':
				return { 'data-success': true }
			default:
				return {}
		}
	}

	const dataFormState = getDataFormState()

	return (
		<Button<'button'>
			{...props}
			{...dataFormState}
			as='button'
			className={twMerge([formStatusButtonClasses, 'w-full text-white data-loading:text-black', className])}
			customTheme={{
				themeColor: twMerge(
					'data-error:[--theme-color:var(--color-ui-red)] data-incomplete:[--theme-color:var(--color-ui-grey)] data-loading:[--theme-color:var(--color-ui-yellow)] data-readonly:[--theme-color:var(--color-ui-grey)] data-ready:[--theme-color:var(--color-ui-blue)] data-success:[--theme-color:var(--color-ui-green)]',
					customTheme?.themeColor,
				),
			}}
			theme='custom'
			type={type as 'button' | 'reset' | 'submit'}
		>
			{buttonText}
		</Button>
	)
}
