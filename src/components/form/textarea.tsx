// * Types
import { ChangeEventHandler, ReactNode, RefObject, useEffect, useId, useRef } from 'react'

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

// * Hooks
import { defineField, Field as FieldContext, useFormContext } from '../../hooks'

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

// * Utilities
import { toLowerCase, twMerge } from '../../utils'

function validateField(value: string, { required }: FieldContext) {
	const noValue = !value || value === ''

	if (!required && noValue) return true

	if (noValue) return false

	return true
}

export default function Textarea({
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
	const [formContext, setFormContext] = useFormContext()

	if (placeholder === '*') placeholder = name + (required && !label ? '*' : '')
	if (label === '*') label = name

	const uniqueID = useId(),
		fieldContextID = toLowerCase(name, [, '_']) + '§' + uniqueID

	if (Boolean(formContext?.find(field => field.id === fieldContextID)?.invalid)) invalid = true

	const initialFieldContext = defineField({
		type: 'textarea',
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

	const debounceTimerRef = useRef<NodeJS.Timeout>(undefined)

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
		if (disabled) {
			e.preventDefault()
			return
		}

		clearTimeout(debounceTimerRef.current)

		const { currentTarget } = e,
			{ value: newValue } = currentTarget

		setFormContext?.(prevContext => {
			if (!prevContext) return []

			const field = prevContext.find(({ id: fieldID }) => fieldID === initialFieldContext.id)

			if (!field) throw new Error(`Field with id "${initialFieldContext.id}" not found in form context.`)

			const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== initialFieldContext.id)

			const updatedField = { ...field, value: newValue }

			return [...otherFields, updatedField]
		})

		debounceTimerRef.current = setTimeout(() => {
			const field = formContext?.find(({ id: fieldID }) => fieldID === initialFieldContext.id)

			if (!field) return

			const invalid = validateField(newValue, field) === false

			if (invalid !== field.invalid)
				setFormContext?.(prevContext => {
					if (!prevContext) return []

					const field = prevContext.find(({ id: fieldID }) => fieldID === initialFieldContext.id)

					if (!field) throw new Error(`Field with id "${initialFieldContext.id}" not found in form context.`)

					const otherFields = prevContext.filter(({ id: fieldID }) => fieldID !== initialFieldContext.id)

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

			<HeadlessTextarea
				{...props}
				className={bag =>
					twMerge(
						// Base styles
						'field-sizing-content resize-none rounded-xl border-1 border-neutral-500/50 bg-neutral-100 py-1 pl-2 text-neutral-950 outline-offset-1 outline-ui-sky-blue/95 transition-[background-color] duration-300 ease-exponential dark:bg-neutral-700 dark:text-neutral-50',
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
				placeholder={placeholder}
				ref={ref}
				required={required}
				value={fieldContext?.value}
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
