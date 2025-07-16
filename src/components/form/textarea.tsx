// * Types
export type TextareaProps = Omit<HeadlessTextareaProps, 'name'> & {
	description?: ReactNode
	descriptionProps?: Omit<DescriptionProps, 'children'> & {
		/** @deprecated Use the `description` prop instead. */
		children?: never
	}
	fieldProps?: Omit<FieldProps, 'children' | 'disabled'>
	label?: ReactNode
	labelProps?: Omit<LabelProps, 'children'> & {
		/** @deprecated Use the `label` prop instead. */
		children?: never
	}
	name: string
	ref?: RefObject<HTMLTextAreaElement | null>
}

// * React
import { ChangeEventHandler, FocusEventHandler, ReactNode, RefObject, useEffect, useId, useState } from 'react'

// * 窓 UI
import { defineField, StringField, useFieldsetContext, useFormContext } from '../../hooks'

// * Headless UI
import {
	Description,
	DescriptionProps,
	Field,
	FieldProps,
	Textarea as HeadlessTextarea,
	TextareaProps as HeadlessTextareaProps,
	Label,
	LabelProps,
} from '@headlessui/react'

// * Components
import { Tooltip, TooltipPanel, TooltipTrigger } from '../tooltip'
import { Button } from '../button'
import { ExclamationmarkOctagon } from '../../icons'

// * Utilities
import { toLowerCase, twMerge } from '../../utils'

export function Textarea({
	className,
	defaultValue,
	description,
	descriptionProps,
	disabled,
	fieldProps,
	invalid = true,
	label,
	labelProps,
	name,
	onBlur,
	onChange,
	placeholder,
	ref,
	required = true,
	value,
	...props
}: TextareaProps) {
	const [formContext, formContextFunctions] = useFormContext()
	const [fieldsetContext, fieldsetContextFunctions] = useFieldsetContext()
	const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

	if (placeholder === '*') placeholder = name + (required && !label ? '*' : '')
	if (label === '*') label = name

	const uniqueID = useId()
	const fieldContextID = toLowerCase(name, [' ', '_']) + '§' + uniqueID

	const isInFieldset = fieldsetContext && !fieldsetContext.decorative

	useEffect(() => {
		const initialFieldContext = defineField({
			type: 'textarea',
			id: fieldContextID,
			invalid,
			name,
			required,
			value: value ? `${value}` : defaultValue ? `${defaultValue}` : '',
		})

		if (isInFieldset) {
			fieldsetContextFunctions.registerField(initialFieldContext)

			return () => {
				fieldsetContextFunctions.removeField(initialFieldContext.id)
			}
		}

		formContextFunctions.registerField(initialFieldContext)

		return () => {
			formContextFunctions.removeField(initialFieldContext.id)
		}
	}, [isInFieldset])

	const fieldContext = (isInFieldset ? fieldsetContext.fieldList : formContext)?.find(
		({ id: fieldID }) => fieldID === fieldContextID,
	)

	const validateField = (validValue: string) => {
		const noValue = !validValue || validValue === ''

		if (!required && noValue) return true

		const errorMessageList: string[] = []

		if (noValue) {
			errorMessageList.push('This field is required.')
			setErrorMessage(errorMessageList.join(' '))
			return false
		}

		if (props.maxLength && validValue.length > Number(props.maxLength))
			errorMessageList.push(`This may not have more than ${props.maxLength} characters.`)

		if (props.minLength && validValue.length < Number(props.minLength))
			errorMessageList.push(`This must have at least ${props.minLength} characters.`)

		if (errorMessageList.length === 0) return true

		setErrorMessage(errorMessageList.join(' '))
		return false
	}

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
		if (disabled) {
			e.preventDefault()
			return
		}

		const { currentTarget } = e
		const { value: newValue } = currentTarget

		if (isInFieldset) {
			fieldsetContextFunctions.updateField(fieldContextID, {
				value: newValue,
				invalid: validateField(newValue) === false,
			})
		} else {
			formContextFunctions.updateField(fieldContextID, {
				value: newValue,
				invalid: validateField(newValue) === false,
			})
		}

		onChange?.(e)
	}

	const handleBlur: FocusEventHandler<HTMLTextAreaElement> = e => {
		if (disabled) {
			e.preventDefault()
			return
		}

		const { currentTarget } = e
		const { value: newValue } = currentTarget

		if (required) validateField(newValue)

		// No special processing needed for textarea like email/phone formatting
		const processedValue = newValue

		if (isInFieldset) {
			fieldsetContextFunctions.updateField(fieldContextID, { value: processedValue })
		} else {
			formContextFunctions.updateField(fieldContextID, { value: processedValue })
		}

		onBlur?.(e)
	}

	const restFieldProps: Omit<FieldProps, 'className' | 'disabled'> = fieldProps
		? Object.fromEntries(Object.entries(fieldProps).filter(([key]) => key !== 'className'))
		: {}

	const restLabelProps: Omit<LabelProps, 'className' | 'children'> = labelProps
		? Object.fromEntries(Object.entries(labelProps).filter(([key]) => key !== 'className'))
		: {}

	const restDescriptionProps: Omit<DescriptionProps, 'className' | 'children'> = descriptionProps
		? Object.fromEntries(Object.entries(descriptionProps).filter(([key]) => key !== 'className'))
		: {}

	return (
		<Field
			{...restFieldProps}
			className={bag =>
				twMerge(
					'grid gap-1',
					typeof fieldProps?.className === 'function' ? fieldProps?.className(bag) : fieldProps?.className,
				)
			}
			disabled={disabled}
		>
			{label && (
				<Label
					{...restLabelProps}
					className={bag =>
						twMerge(
							'text-sm font-medium',
							required ? 'after:text-ui-red after:content-["_*"]' : '',
							typeof labelProps?.className === 'function' ? labelProps?.className(bag) : labelProps?.className,
						)
					}
				>
					{label}
				</Label>
			)}

			<div className='z-10 -mb-1.5'>
				<HeadlessTextarea
					{...props}
					className={bag =>
						twMerge(
							// Base styles
							'field-sizing-content w-full resize-none rounded-xl border-1 border-neutral-500/50 bg-neutral-100 py-1 pl-2 text-neutral-950 outline-offset-1 outline-ui-sky-blue/95 transition-[background-color] duration-300 ease-exponential dark:bg-neutral-700 dark:text-neutral-50',
							// Pseudo styles
							'focus-visible:bg-neutral-50 focus-visible:outline-3 active:bg-neutral-200 dark:focus-visible:bg-neutral-600 dark:active:bg-neutral-800 pointer-fine:hover:bg-neutral-50 pointer-fine:active:bg-neutral-200 dark:pointer-fine:hover:bg-neutral-600 dark:pointer-fine:active:bg-neutral-800',
							// user-invalid styles
							'user-invalid:border-ui-red user-invalid:bg-[color-mix(in_oklab,var(--color-ui-red)_20%,var(--color-neutral-100))] user-invalid:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-100))] user-invalid:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-100))] dark:user-invalid:bg-[color-mix(in_oklab,var(--color-ui-red)_20%,var(--color-neutral-800))] dark:user-invalid:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-800))] dark:user-invalid:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-800))] user-invalid:pointer-fine:hover:bg-[color-mix(in_oklab,var(--color-ui-red)_10%,var(--color-neutral-100))] user-invalid:pointer-fine:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-100))] user-invalid:pointer-fine:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-100))] dark:user-invalid:pointer-fine:hover:bg-[color-mix(in_oklab,var(--color-ui-red)_10%,var(--color-neutral-800))] dark:user-invalid:pointer-fine:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-800))] dark:user-invalid:pointer-fine:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-800))]',
							// Custom styles
							typeof className === 'function' ? className(bag) : className,
						)
					}
					id={fieldContext?.id}
					invalid={invalid}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder={placeholder}
					ref={ref}
					required={required}
					value={(fieldContext as StringField)?.value || ''}
				/>

				{(fieldContext as StringField)?.invalid && errorMessage && (
					<Tooltip anchor='top-end' arrow portal>
						<TooltipTrigger
							as={Button}
							className='absolute top-1.25 right-1.25 z-10 size-6 min-w-0'
							padding='none'
							rounded='md'
							theme='red'
						>
							<ExclamationmarkOctagon className='absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 scale-70' />
						</TooltipTrigger>

						<TooltipPanel>{errorMessage}</TooltipPanel>
					</Tooltip>
				)}
			</div>

			{description && (
				<Description
					{...restDescriptionProps}
					className={bag =>
						twMerge(
							'text-xs',
							typeof descriptionProps?.className === 'function'
								? descriptionProps?.className(bag)
								: descriptionProps?.className,
						)
					}
				>
					{description}
				</Description>
			)}
		</Field>
	)
}
