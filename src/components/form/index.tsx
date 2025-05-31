// * Types
import { ElementType, FormEvent, FormEventHandler, Fragment, useEffect } from 'react'
import { AnyElementProps, OneOf } from '../../types'

export type FormSubmitArgs = {
	event: FormEvent<HTMLFormElement>
	formContext: FormContext
}

export type FormProps<T extends ElementType = 'form'> = Omit<
	AnyElementProps<
		T,
		{
			controlled?: 'auto' | 'manual' | 'none'
			handleSubmit?: FormEventHandler<HTMLFormElement>
			initialStatus?: FormStatus
			onError?: (e: FormEvent<HTMLFormElement>, error: string) => void
			onSuccess?: (e: FormEvent<HTMLFormElement>) => void
		}
	>,
	'onSubmit'
> & {
	onSubmit?: ({
		event,
		formContext,
	}: FormSubmitArgs) =>
		| ({ error?: string; status?: 'error' } | { status?: 'success' })
		| Promise<{ error?: string; status?: 'error' } | { status?: 'success' }>
}

// * Form Status
import {
	FormContext,
	FormContextProvider,
	FormStatus,
	FormStatusProvider,
	useFormContext,
	useFormStatus,
} from '../../hooks'

// * Utilities
import { twMerge } from '../../utils'
// import { findComponentByType } from '../../utils'

function FormComponent<T extends ElementType = 'form'>({
	as,
	children,
	className,
	handleSubmit,
	onError,
	onSubmit,
	onSuccess,
	...props
}: Omit<FormProps<T>, 'controlled' | 'initialStatus'>) {
	const [formContext] = useFormContext(),
		[formStatus, setFormStatus] = useFormStatus()

	// const submitButton = findComponentByType(children, SubmitButton)

	useEffect(() => {
		if (!formContext) return

		if (formStatus !== 'incomplete' && formContext.find(({ invalid }) => invalid)) setFormStatus?.('incomplete')

		if (formStatus !== 'ready' && formContext.every(({ invalid }) => !invalid)) setFormStatus?.('ready')
	}, [formContext])

	const processSubmit: FormEventHandler<HTMLFormElement> =
		handleSubmit ||
		(async e => {
			e.preventDefault()
			e.stopPropagation()

			setFormStatus?.('loading')

			const response = await onSubmit?.({ event: e, formContext })

			if (response && ('error' in response || response.status === 'error')) {
				setFormStatus?.('error')
				onError?.({ event: e, error: response.error || 'An error occurred when submitting the form.' })
				return
			}

			if ((response && response.status === 'success') || !response) {
				setFormStatus?.('success')
				onSuccess?.({ event: e })
			}
		})

	const FormElement = (as as ElementType) || 'form'

	return (
		<FormElement {...props} className={twMerge(className, 'grid gap-3')} onSubmit={processSubmit}>
			{children}
		</FormElement>
	)
}

export default function Form<T extends ElementType = 'form'>({
	controlled = 'auto',
	initialStatus = 'incomplete',
	...props
}: FormProps<T>) {
	const FormContextOrNotProvider = controlled === 'auto' ? FormContextProvider : Fragment

	return (
		<FormStatusProvider initialStatus={initialStatus}>
			<FormContextOrNotProvider>
				<FormComponent {...props} />
			</FormContextOrNotProvider>
		</FormStatusProvider>
	)
}

import Input, { InputProps } from './input'
import SubmitButton, { SubmitButtonProps } from './submit-button'

export { Input, InputProps, SubmitButton, SubmitButtonProps }
