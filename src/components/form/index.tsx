// * Types
import { AnyElementProps } from '../../types'

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

// * React
import { ElementType, FormEvent, FormEventHandler, Fragment, ReactElement, useCallback, useEffect } from 'react'

// * Form Status
import {
	Field,
	FormContext,
	FormContextProvider,
	FormStatus,
	FormStatusProvider,
	useFormContext,
	useFormStatus,
} from '../../hooks'

// * Utilities
import { twMerge } from '../../utils'

function FormComponent<T extends ElementType = 'form'>({
	as,
	children,
	className,
	handleSubmit,
	onError,
	onSubmit,
	onSuccess,
	...props
}: Omit<FormProps<T>, 'controlled' | 'initialStatus'>): ReactElement {
	const [formContext] = useFormContext(),
		[formStatus, setFormStatus] = useFormStatus()

	const checkField = useCallback((field: Field): boolean => {
		if (field.type !== 'array' && field.type !== 'object' && !field.invalid) return true

		if (field.type === 'object') return field.fields.every(objectField => checkField(objectField))

		return false
	}, [])

	const everyFieldIsValid = useCallback(() => {
		if (!formContext) return false

		return formContext.every(field => checkField(field))
	}, [formContext, checkField])

	useEffect(() => {
		if (!formContext) return

		if (
			formStatus !== 'incomplete' &&
			formContext.find(context => context.type !== 'array' && context.type !== 'object' && context.invalid)
		)
			setFormStatus?.('incomplete')

		if (formStatus !== 'ready' && everyFieldIsValid()) setFormStatus?.('ready')
	}, [formContext, everyFieldIsValid])

	const processSubmit: FormEventHandler<HTMLFormElement> =
		handleSubmit ||
		(async e => {
			e.preventDefault()
			e.stopPropagation()

			setFormStatus?.('loading')

			const response = await onSubmit?.({ event: e, formContext })

			if (response && ('error' in response || response.status === 'error')) {
				setFormStatus?.('error')
				onError?.({ event: e, error: response.error || 'An error occurred when submitting the form.', formContext })
				return
			}

			if ((response && response.status === 'success') || !response) {
				setFormStatus?.('success')
				onSuccess?.({ event: e, formContext })
			}
		})

	const FormElement = (as as ElementType) || 'form'

	return (
		<FormElement {...props} className={twMerge(className, 'grid gap-3')} onSubmit={processSubmit}>
			{children}
		</FormElement>
	)
}

export function Form<T extends ElementType = 'form'>({
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

export * from './fieldset'
export * from './input'
export * from './submit-button'
export * from './textarea'
