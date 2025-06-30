// * Types
import { OneOf } from '../../../types'

type PasswordOptionList = {
	matchPreviousInput: boolean
	requireLowercaseCharacter: boolean
	requireNumber: boolean
	requireSpecialCharacter: boolean
	requireUppercaseCharacter: boolean
}

type TypeOfPasswordOrNot = OneOf<
	[
		{
			type?: 'password'
			passwordOptions?: Partial<PasswordOptionList>
		},
		{
			type?: Exclude<HTMLInputTypeAttribute, 'password'>
		},
	]
>

export type InputProps = Omit<HeadlessInputProps, 'name' | 'type'> &
	TypeOfPasswordOrNot & {
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
		ref?: RefObject<HTMLInputElement | null>
	}

// * React
import {
	ChangeEventHandler,
	FocusEventHandler,
	HTMLInputTypeAttribute,
	ReactNode,
	RefObject,
	useEffect,
	useId,
	useState,
} from 'react'

// * Hooks
import { defineField, Field as FieldContext, useFormContext } from '../../../hooks'

// * Headless UI
import {
	Description,
	DescriptionProps,
	Field,
	FieldProps,
	Input as HeadlessInput,
	InputProps as HeadlessInputProps,
	Label,
	LabelProps,
} from '@headlessui/react'

// * Components
import Button from '../../button'
import Tooltip, { TooltipPanel, TooltipTrigger } from '../../tooltip'
import { ExclamationmarkOctagon } from '../../../icons'

// * Utilities
import { formatPhoneNumber, isEmail, isPhoneNumber, toLowerCase, twMerge } from '../../../utils'

export default function Input({
	checked,
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
	type,
	value,
	...props
}: InputProps) {
	const [formContext, setFormContext] = useFormContext(),
		[errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

	if (placeholder === '*') placeholder = name + (required && !label ? '*' : '')
	if (label === '*') label = name

	const uniqueID = useId(),
		fieldContextID = toLowerCase(name, [, '_']) + '§' + uniqueID

	if (Boolean(formContext?.find(field => field.id === fieldContextID)?.invalid)) invalid = true

	const getFieldContextType = () => {
		switch (type) {
			case 'email':
				return 'email'
			case 'file':
				return 'file'
			case 'number':
				return 'number'
			case 'tel':
				return 'tel'
			case 'url':
				return 'url'
			default:
				return 'string'
		}
	}

	const fieldContextType = getFieldContextType()

	const initialFieldContext = defineField({
		type: fieldContextType,
		id: fieldContextID,
		invalid,
		name,
		required,
		value: value ? `${value}` : defaultValue ? `${defaultValue}` : '',
	})

	useEffect(() => {
		if (!setFormContext) return

		setFormContext(prevContext => {
			const otherFields = (prevContext || []).filter(field => field.id !== initialFieldContext.id)

			return [...otherFields, initialFieldContext]
		})

		return () => {
			setFormContext(prevContext => (prevContext || []).filter(field => field.id !== initialFieldContext.id))
		}
	}, [setFormContext])

	const fieldContext: FieldContext =
		formContext?.find(({ id: fieldID }) => fieldID === initialFieldContext.id) || initialFieldContext

	const validateField = (validValue: string) => {
		const noValue = !validValue || validValue === ''

		if (!required && noValue) return true

		const errorMessageList: string[] = []

		if (noValue) {
			errorMessageList.push('This field is required.')
			setErrorMessage(errorMessageList.join(' '))
			return false
		}

		switch (type) {
			case 'email':
				if (!isEmail(validValue)) errorMessageList.push('This is not a valid email.')
				break
			case 'number':
				if (isNaN(Number(validValue))) errorMessageList.push('This is not a valid number.')
				break
			case 'tel':
				if (!isPhoneNumber(validValue)) errorMessageList.push('This is not a valid phone number.')
				break
		}

		if (errorMessageList.length === 0) return true

		setErrorMessage(errorMessageList.join(' '))
		return false
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		if (disabled) {
			e.preventDefault()
			return
		}

		const { currentTarget } = e,
			{ value: newValue } = currentTarget

		setFormContext?.(prevContext => {
			if (!prevContext) return []

			const field = prevContext.find(({ id: fieldID }) => fieldID === initialFieldContext.id)

			if (!field) throw new Error(`Field with id "${initialFieldContext.id}" not found in form context.`)

			const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== initialFieldContext.id)

			const updatedField = { ...field, value: newValue }

			const invalidField = validateField(newValue) === false

			if (invalidField !== field.invalid) updatedField.invalid = invalidField

			return [...otherFields, updatedField]
		})

		onChange?.(e)
	}

	const handleBlur: FocusEventHandler<HTMLInputElement> = e => {
		if (disabled) {
			e.preventDefault()
			return
		}

		const { currentTarget } = e,
			{ value: newValue } = currentTarget

		if (required) validateField(newValue)

		switch (type) {
			case 'email':
				setFormContext?.(prevContext => {
					if (!prevContext) return []

					const field = prevContext.find(({ id: fieldID }) => fieldID === initialFieldContext.id)

					if (!field) throw new Error(`Field with id "${initialFieldContext.id}" not found in form context.`)

					const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== initialFieldContext.id)

					const updatedField = { ...field, value: newValue.toLowerCase() }

					return [...otherFields, updatedField]
				})
				break
			case 'tel':
				setFormContext?.(prevContext => {
					if (!prevContext) return []

					const field = prevContext.find(({ id: fieldID }) => fieldID === initialFieldContext.id)

					if (!field) throw new Error(`Field with id "${initialFieldContext.id}" not found in form context.`)

					const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== initialFieldContext.id)

					const updatedField = { ...field, value: formatPhoneNumber(newValue, '1') }

					return [...otherFields, updatedField]
				})
				break
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

			<div>
				<HeadlessInput
					{...props}
					className={bag =>
						twMerge(
							// Base styles
							'w-full rounded-xl border-1 border-neutral-500/50 bg-neutral-100 py-1 pl-2 text-neutral-950 outline-offset-1 outline-ui-sky-blue/95 transition-[background-color] duration-300 ease-exponential dark:bg-neutral-700 dark:text-neutral-50',
							// Pseudo styles
							'focus-visible:bg-neutral-50 focus-visible:outline-3 active:bg-neutral-200 dark:focus-visible:bg-neutral-600 dark:active:bg-neutral-800 pointer-fine:hover:bg-neutral-50 pointer-fine:active:bg-neutral-200 dark:pointer-fine:hover:bg-neutral-600 dark:pointer-fine:active:bg-neutral-800',
							// user-invalid styles
							'user-invalid:border-ui-red user-invalid:bg-[color-mix(in_oklab,var(--color-ui-red)_20%,var(--color-neutral-100))] user-invalid:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-100))] user-invalid:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-100))] dark:user-invalid:bg-[color-mix(in_oklab,var(--color-ui-red)_20%,var(--color-neutral-800))] dark:user-invalid:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-800))] dark:user-invalid:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-800))] user-invalid:pointer-fine:hover:bg-[color-mix(in_oklab,var(--color-ui-red)_10%,var(--color-neutral-100))] user-invalid:pointer-fine:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-100))] user-invalid:pointer-fine:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-100))] dark:user-invalid:pointer-fine:hover:bg-[color-mix(in_oklab,var(--color-ui-red)_10%,var(--color-neutral-800))] dark:user-invalid:pointer-fine:focus-visible:bg-[color-mix(in_oklab,var(--color-ui-red)_1%,var(--color-neutral-800))] dark:user-invalid:pointer-fine:active:bg-[color-mix(in_oklab,var(--color-ui-red)_25%,var(--color-neutral-800))]',
							// Custom styles
							typeof className === 'function' ? className(bag) : className,
						)
					}
					invalid={invalid}
					onBlur={handleBlur}
					onChange={handleChange}
					placeholder={placeholder}
					ref={ref}
					required={required}
					type={type}
					value={fieldContext?.value}
				/>

				{fieldContext.invalid && errorMessage && (
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
