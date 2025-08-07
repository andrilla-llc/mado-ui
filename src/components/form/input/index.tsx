// * Types
import { OneOf } from '../../../types'

type DateMinMax =
	| Date
	| [number, DateTimeObject['month'], DateTimeObject['day']]
	| Pick<DateTimeObject, 'day' | 'month' | 'year'>

type DateTimeMinMax =
	| Date
	| [
			number,
			DateTimeObject['month'],
			DateTimeObject['day'],
			DateTimeObject['hour'],
			DateTimeObject['minute'],
			DateTimeObject['second'],
	  ]
	| DateTimeObject

type TimeMinMax =
	| [DateTimeObject['hour'], DateTimeObject['minute'], DateTimeObject['second']]
	| Pick<DateTimeObject, 'hour' | 'minute' | 'second'>

type WeekMinMax = [number, WeekNumber]

type InputType = OneOf<
	[
		{
			type?: 'date'
			min?: DateMinMax
			max?: DateMinMax
		},
		{
			type?: 'datetime' | 'datetime-local'
			min?: DateTimeMinMax
			max?: DateTimeMinMax
		},
		{
			type?: 'number'
			max?: number
			min?: number
		},
		{
			type?: 'password'
			options?: Partial<PasswordOptions>
		},
		{
			type?: 'tel'
			options?: Partial<PhoneOptions>
		},
		{
			type?: 'time'
			min?: TimeMinMax
			max?: TimeMinMax
		},
		{
			type?: 'week'
			min?: WeekMinMax
			max?: WeekMinMax
		},
		{
			type?: Exclude<
				HTMLInputTypeAttribute,
				'date' | 'datetime' | 'datetime-local' | 'number' | 'password' | 'tel' | 'time' | 'week'
			>
		},
	]
>

export type InputProps = Omit<HeadlessInputProps, 'max' | 'min' | 'name' | 'type'> &
	InputType & {
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

type PasswordOptions = {
	matchPreviousInput: boolean
	requireLowercaseCharacter: boolean
	requireNumber: boolean
	requireSpecialCharacter: boolean
	requireUppercaseCharacter: boolean
}

type PhoneOptions = {
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

// * React
import {
	ChangeEventHandler,
	FocusEventHandler,
	HTMLInputTypeAttribute,
	ReactElement,
	ReactNode,
	RefObject,
	useEffect,
	useId,
	useState,
} from 'react'

// * Hooks
import { defineField, isStringField, StringField, useFieldsetContext, useFormContext } from '../../../hooks'

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
import { Button } from '../../button'
import { Tooltip, TooltipPanel, TooltipTrigger } from '../../tooltip'
import { ExclamationmarkOctagon } from '../../../icons'

// * Utilities
import {
	DateTimeObject,
	formatPhoneNumber,
	getMonthIndexFromName,
	getUserReadableDate,
	isEmail,
	isPhoneNumber,
	toLowerCase,
	twMerge,
	WeekNumber,
} from '../../../utils'

const specialCharacterRegex = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~€‚ƒ„…†‡‰‹‘’“”•–—™›¡¢£¥§©«¬®°±¶º»¿×÷]/)

export function Input({
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
	max,
	min,
	name,
	onBlur,
	onChange,
	options,
	placeholder,
	ref,
	required = true,
	type,
	value,
	...props
}: InputProps): ReactElement {
	const [formContext, formContextFunctions] = useFormContext(),
		[fieldsetContext, fieldsetContextFunctions] = useFieldsetContext(),
		[errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

	if (type === 'password' && !placeholder) placeholder = '••••••••' + (required && !label ? '*' : '')
	if (placeholder === '*') placeholder = name + (required && !label ? '*' : '')
	if (label === '*') label = name

	const uniqueID = useId(),
		fieldContextID = toLowerCase(name, [, '_']) + '§' + uniqueID

	const isInFieldset = fieldsetContext && !fieldsetContext.decorative

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

	const fieldContext = (isInFieldset ? fieldsetContext.fieldList : formContext)?.find(
		({ id: fieldID }) => fieldID === fieldContextID,
	)

	useEffect(() => {
		const initialFieldContext = defineField({
			type: fieldContextType,
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
			case 'date':
				const valueAsTime = new Date().getTime()

				if (min && !(min instanceof Date) && typeof min !== 'number') {
					if (Array.isArray(min)) {
						const monthIndex = typeof min[1] === 'number' ? min[1] - 1 : getMonthIndexFromName(min[1])

						min = new Date(min[0], monthIndex, min[2])
					} else if ('year' in min && 'month' in min && 'day' in min) {
						const monthIndex = typeof min.month === 'number' ? min.month - 1 : getMonthIndexFromName(min.month)

						min = new Date(min.year, monthIndex, min.day)
					}

					if (valueAsTime < (min as Date).getTime())
						errorMessageList.push(`Value cannot be lower than ${getUserReadableDate(min as Date)}.`)
				}

				if (max && !(max instanceof Date) && typeof max !== 'number') {
					if (Array.isArray(max)) {
						const monthIndex = typeof max[1] === 'number' ? max[1] - 1 : getMonthIndexFromName(max[1])

						max = new Date(max[0], monthIndex, max[2])
					} else if ('year' in max && 'month' in max && 'day' in max) {
						const monthIndex = typeof max.month === 'number' ? max.month - 1 : getMonthIndexFromName(max.month)

						max = new Date(max.year, monthIndex, max.day)
					}

					if (valueAsTime > (max as Date).getTime())
						errorMessageList.push(`Value cannot be higher than ${getUserReadableDate(max as Date)}.`)
				}

				break
			case 'number':
				const valueAsNumber = Number(validValue)

				if (isNaN(valueAsNumber)) errorMessageList.push('This is not a valid number.')

				if (typeof max === 'number' && valueAsNumber > max) errorMessageList.push(`Value cannot be higher than ${max}.`)

				if (typeof min === 'number' && valueAsNumber < min) errorMessageList.push(`Value cannot be lower than ${min}.`)
				break
			case 'password':
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
									(previousInput as StringField).value !== validValue
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
									(previousInput as StringField).value !== validValue
								)
									errorMessageList.push('Passwords must match.')
							}
						}
					}

					if (requireLowercaseCharacter && !/[a-z]/g.test(validValue))
						errorMessageList.push('You must include a lowercase character.')

					if (requireNumber && !/[0-9]/g.test(validValue)) errorMessageList.push('You must include a number.')

					if (requireSpecialCharacter && !specialCharacterRegex.test(validValue))
						errorMessageList.push('You must include a special character.')

					if (requireUppercaseCharacter && !/[A-Z]/g.test(validValue))
						errorMessageList.push('You must include an uppercase character.')
				}
				break
			case 'tel':
				if (!isPhoneNumber(validValue)) errorMessageList.push('This is not a valid phone number.')
				break
		}

		if (props.maxLength && validValue.length > Number(props.maxLength))
			errorMessageList.push(`This may not have more than ${props.maxLength} characters.`)

		if (props.minLength && validValue.length < Number(props.minLength))
			errorMessageList.push(`This must have at least ${props.minLength} characters.`)

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

		if (isInFieldset) {
			fieldsetContextFunctions.updateField(fieldContextID, {
				value: newValue,
				invalid: validateField(newValue) === false,
			})
		} else {
			formContextFunctions.updateField(fieldContextID, { value: newValue, invalid: validateField(newValue) === false })
		}

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

		let processedValue = newValue

		switch (type) {
			case 'email':
				processedValue = newValue.toLowerCase()
				break
			case 'tel':
				processedValue = formatPhoneNumber(newValue, options as Partial<PhoneOptions>)
				break
		}

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
