// * Types
import { ChangeEventHandler, FocusEventHandler } from 'react'
import { BaseInputComponentProps, ValidationHandler } from './input-types'

export type NumberInputProps = BaseInputComponentProps

// * Hooks
import { Field, StringField, useFieldsetContext, useFormContext } from '../../../hooks'

// * Components
import { Input as HeadlessInput } from '@headlessui/react'

// * Utilities
import { twMerge } from '../../../utils'

export function NumberInput({
	className,
	fieldContextID,
	handleBlur,
	handleChange,
	options,
	placeholder,
	type,
	...props
}: NumberInputProps) {
	const [formContext] = useFormContext(),
		[fieldsetContext] = useFieldsetContext()

	const isInFieldset = fieldsetContext && !fieldsetContext.decorative

	const fieldContext = (isInFieldset ? fieldsetContext.fieldList : formContext)?.find(
		({ id: fieldID }) => fieldID === fieldContextID,
	)

	const validation: ValidationHandler = ({ max, min, value }) => {
		const valueAsNumber = Number(value)

		if (isNaN(valueAsNumber)) return 'This is not a valid number.'

		if (typeof max === 'number' && valueAsNumber > max) return `Value cannot be higher than ${max}.`

		if (typeof min === 'number' && valueAsNumber < min) return `Value cannot be lower than ${min}.`
	}

	const onChange: ChangeEventHandler<HTMLInputElement> = e => {
		handleChange({ e, validation })
	}

	const onBlur: FocusEventHandler<HTMLInputElement> = e => {
		handleBlur({ e, validation })
	}

	return (
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
			onBlur={onBlur}
			onChange={onChange}
			placeholder={placeholder}
			type={type}
			value={(fieldContext as Field<StringField>)?.value || ''}
		/>
	)
}
