// * Types
import { ChangeEventHandler, FocusEventHandler } from 'react'
import { BaseInputComponentProps, ValidationHandler } from './input-types'

export type PasswordOptions = {
	matchPreviousInput: boolean
	requireLowercaseCharacter: boolean
	requireNumber: boolean
	requireSpecialCharacter: boolean
	requireUppercaseCharacter: boolean
}

export type PhoneOptions = {
	countryCode: string
	/**
	 * @example
	 * format: 'continuous'
	 * returns: 5555555555
	 *
	 * @example
	 * format: 'dot'
	 * returns: 555.555.5555
	 *
	 * @example
	 * format: 'hyphenated'
	 * returns: 555-555-5555
	 *
	 * @example
	 * format: 'space'
	 * returns: 555 555 5555
	 *
	 * @example
	 * format: 'standard' (default)
	 * returns: (555) 555-5555
	 */
	format: 'continuous' | 'dot' | 'hyphenated' | 'none' | 'space' | 'standard'
}

export type TextInputProps = BaseInputComponentProps

// * Hooks
import { Field, isStringField, StringField, useFieldsetContext, useFormContext } from '../../../hooks'

// * Components
import { Input as HeadlessInput } from '@headlessui/react'

// * Utilities
import { formatPhoneNumber, isEmail, isPhoneNumber, twMerge } from '../../../utils'

const specialCharacterRegex = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~€‚ƒ„…†‡‰‹‘’“”•–—™›¡¢£¥§©«¬®°±¶º»¿×÷]/)

export function TextInput({
	className,
	fieldContextID,
	handleBlur,
	handleChange,
	options,
	placeholder,
	type,
	...props
}: TextInputProps) {
	const [formContext] = useFormContext(),
		[fieldsetContext] = useFieldsetContext()

	const isInFieldset = fieldsetContext && !fieldsetContext.decorative

	const fieldContext = (isInFieldset ? fieldsetContext.fieldList : formContext)?.find(
		({ id: fieldID }) => fieldID === fieldContextID,
	)

	if (type === 'password' && !placeholder) placeholder = '••••••••'

	const FORMAT_FUNCTIONS: { [key: string]: (value: string) => string } = {
		email: (value: string) => value.toLowerCase(),
		tel: (value: string) => formatPhoneNumber(value, options as Partial<PhoneOptions>),
	}

	const VALIDATION_HANDLERS: { [key: string]: ValidationHandler } = {
		email: ({ multiple, value }) => {
			if (multiple) {
				const emailList = value.split(',').map(item => item.trim()),
					notEmailList: string[] = []

				emailList.forEach(item => {
					if (!isEmail(item)) notEmailList.push(item)
				})

				if (notEmailList.length > 0) {
					const multipleInvalid = notEmailList.length > 1

					return `${multipleInvalid ? 'These email addresses are' : 'This email address is'} invalid: ${notEmailList.join(', ')}`
				}

				return
			}

			if (!isEmail(value)) return 'This is not a valid email address.'
		},
		password: ({ value }) => {
			const errorMessageList: string[] = []

			if (options) {
				const {
					matchPreviousInput,
					requireLowercaseCharacter,
					requireNumber,
					requireSpecialCharacter,
					requireUppercaseCharacter,
				} = options as Partial<PasswordOptions>

				if (matchPreviousInput && formContext && formContext.length >= 2) {
					if (isInFieldset && fieldsetContext.fieldList.length > 1) {
						const currentInputIndex = fieldsetContext.fieldList.findIndex(
							({ id: fieldID }) => fieldID === fieldContext?.id,
						)

						if (currentInputIndex > 0) {
							const previousInput = fieldsetContext.fieldList.find((_, index) => index === currentInputIndex - 1)

							if (
								previousInput &&
								isStringField(previousInput) &&
								(previousInput as Field<StringField>).value !== value
							)
								errorMessageList.push('Passwords must match.')
						}
					} else {
						const currentInputIndex = formContext.findIndex(({ id: fieldID }) => fieldID === fieldContext?.id)

						if (currentInputIndex > 0) {
							const previousInput = formContext.find((_, index) => index === currentInputIndex - 1)

							if (
								previousInput &&
								isStringField(previousInput) &&
								(previousInput as Field<StringField>).value !== value
							)
								errorMessageList.push('Passwords must match.')
						}
					}
				}

				if (requireLowercaseCharacter && !/[a-z]/g.test(value))
					errorMessageList.push('You must include a lowercase character.')

				if (requireNumber && !/[0-9]/g.test(value)) errorMessageList.push('You must include a number.')

				if (requireSpecialCharacter && !specialCharacterRegex.test(value))
					errorMessageList.push('You must include a special character.')

				if (requireUppercaseCharacter && !/[A-Z]/g.test(value))
					errorMessageList.push('You must include an uppercase character.')
			}

			return errorMessageList.length > 0 ? errorMessageList.join(' ') : undefined
		},
		tel: ({ value }) => {
			if (!isPhoneNumber(value)) return 'This is not a valid phone number.'
		},
	}

	const onChange: ChangeEventHandler<HTMLInputElement> = e => {
		const validation = type ? VALIDATION_HANDLERS[type] : undefined

		handleChange({ e, validation })
	}

	const onBlur: FocusEventHandler<HTMLInputElement> = e => {
		const format = type ? FORMAT_FUNCTIONS[type] : undefined,
			validation = type ? VALIDATION_HANDLERS[type] : undefined

		handleBlur({ e, format, validation })
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
