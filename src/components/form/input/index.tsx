// * Types
import { ChangeEventHandler, HTMLInputTypeAttribute, RefObject, useEffect, useId, useRef } from 'react'
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
		description?: string
		descriptionProps?: Omit<DescriptionProps, 'children'> & {
			/** @deprecated Use the `description` prop instead. */
			children?: never
		}
		fieldProps?: Omit<FieldProps, 'children' | 'disabled'>
		label?: string
		labelProps?: Omit<LabelProps, 'children'> & {
			/** @deprecated Use the `label` prop instead. */
			children?: never
		}
		name: string
		ref?: RefObject<HTMLInputElement | null>
	}

// * Hooks
import { defineField, Field as FieldContext, useFormContext, useFormStatus } from '../../../hooks'

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

// * Utilities
import { isEmail, isPhoneNumber, toLowerCase, twMerge } from '../../../utils'

function validateField(value: string, { required, type }: FieldContext) {
	const noValue = !value || value === ''

	if (!required && noValue) return true

	if (noValue) return false

	switch (type) {
		case 'email':
			return isEmail(value)
		case 'number':
			return !isNaN(Number(value))
		case 'tel':
			return isPhoneNumber(value)
		default:
			return true
	}
}

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
	onChange,
	placeholder,
	ref,
	required = true,
	type,
	value,
	...props
}: InputProps) {
	const [formContext, setFormContext] = useFormContext(),
		[, setFormStatus] = useFormStatus()

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

	const fieldContext = defineField({
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
			const otherFields = (prevContext || []).filter(field => field.id !== fieldContext.id)

			return [...otherFields, fieldContext]
		})

		return () => {
			setFormContext(prevContext => (prevContext || []).filter(field => field.id !== fieldContext.id))
		}
	}, [setFormContext])

	const debounceTimerRef = useRef<NodeJS.Timeout>(undefined)

	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		if (disabled) {
			e.preventDefault()
			return
		}

		clearTimeout(debounceTimerRef.current)

		const { currentTarget } = e,
			{ value: newValue } = currentTarget

		setFormContext?.(prevContext => {
			if (!prevContext) return []

			const field = prevContext.find(({ id: fieldID }) => fieldID === fieldContext.id)

			if (!field) throw new Error(`Field with id "${fieldContext.id}" not found in form context.`)

			const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== fieldContext.id)

			const updatedField = { ...field, value: newValue }

			return [...otherFields, updatedField]
		})

		debounceTimerRef.current = setTimeout(() => {
			const field = formContext?.find(({ id: fieldID }) => fieldID === fieldContext.id)

			if (!field) return

			const invalid = validateField(newValue, field) === false

			if (invalid !== field.invalid)
				setFormContext?.(prevContext => {
					if (!prevContext) return []

					const field = prevContext.find(({ id: fieldID }) => fieldID === fieldContext.id)

					if (!field) throw new Error(`Field with id "${fieldContext.id}" not found in form context.`)

					const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== fieldContext.id)

					const updatedField = { ...field, invalid }

					return [...otherFields, updatedField]
				})
		}, 500)

		onChange?.(e)
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

			<HeadlessInput
				{...props}
				className={bag =>
					twMerge(
						'pointer-fine:hover:bg-neutral-50 dark:pointer-fine:hover:bg-neutral-600 pointer-fine:active:bg-neutral-200 dark:pointer-fine:active:bg-neutral-800 border-1 outline-ui-sky-blue/95 focus-visible:outline-3 ease-exponential rounded-xl border-neutral-500/50 bg-neutral-100 py-1 pl-2 text-neutral-950 outline-offset-1 transition-[background-color] duration-300 focus-visible:bg-neutral-50 active:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-50 dark:focus-visible:bg-neutral-600 dark:active:bg-neutral-800',
						typeof className === 'function' ? className(bag) : className,
					)
				}
				invalid={invalid}
				onChange={handleChange}
				placeholder={placeholder}
				ref={ref}
				type={type}
			/>

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
