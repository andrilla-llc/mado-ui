// * Types
import { OneOf } from '../../types'

type IsolatedValue<T extends ValueOption | ValueOption[]> = { defaultValue?: T } | { value?: T }

type MultipleOrSingleValue = OneOf<
	[
		{
			multiple: true
		} & IsolatedValue<ValueOption[]>,
		{
			multiple?: false
		} & IsolatedValue<ValueOption>,
	]
>

export type SelectProps = Omit<ListboxProps, 'defaultValue' | 'multiple' | 'name' | 'value'> &
	Pick<FieldProps, 'disabled'> &
	MultipleOrSingleValue & {
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
		optionList: ListboxSelectedOptionProps['options']
		ref?: RefObject<HTMLInputElement | null>
		required?: boolean
	}

type ValueOption = string | { id: string; render?: ReactNode; value: string }

// * React
import { ReactElement, ReactNode, RefObject, useEffect, useId } from 'react'

// * Hooks
import { defineField, Field as SomeField, StringField, useFieldsetContext, useFormContext } from '../../hooks'

// * Components
import {
	Description,
	DescriptionProps,
	Field,
	FieldProps,
	Label,
	LabelProps,
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	ListboxProps,
	ListboxSelectedOption,
	ListboxSelectedOptionProps,
} from '@headlessui/react'

// * Utilities
import { toLowerCase, twMerge } from '../../utils'

function extractStringValue(value: ValueOption | ValueOption[]): string {
	if (Array.isArray(value)) return value.join(', ')

	if (typeof value === 'string') return value

	return value.value
}

export function Select({
	defaultValue,
	description,
	descriptionProps,
	disabled,
	fieldProps,
	invalid,
	label,
	labelProps,
	multiple,
	name,
	onChange,
	optionList,
	required,
	value,
	...props
}: SelectProps): ReactElement {
	const [formContext, formContextFunctions] = useFormContext(),
		[fieldsetContext, fieldsetContextFunctions] = useFieldsetContext()

	if (label === '*') label = name

	const uniqueID = useId(),
		fieldContextID = toLowerCase(name, [, '_']) + '§' + uniqueID

	const isInFieldset = fieldsetContext && !fieldsetContext.decorative

	const fieldContext = (isInFieldset ? fieldsetContext.fieldList : formContext)?.find(
		({ id: fieldID }) => fieldID === fieldContextID,
	)

	useEffect(() => {
		const initialFieldContext = multiple
			? defineField({
					type: 'array',
					of: value
						? (value as ValueOption[]).map(item => ({
								type: 'string',
								value: typeof item === 'string' ? item : item.value,
							}))
						: defaultValue
							? (defaultValue as ValueOption[]).map(item => ({
									type: 'string',
									value: typeof item === 'string' ? item : item.value,
								}))
							: [],
					id: fieldContextID,
					invalid,
					name,
					required,
				})
			: defineField({
					type: 'string',
					id: fieldContextID,
					invalid,
					name,
					required,
					value: value ? extractStringValue(value) : defaultValue ? extractStringValue(defaultValue) : '',
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

	const handleChange = (newValue: string) => {
		if (disabled) return

		const isInvalid = newValue === '' || !newValue

		if (isInFieldset) {
			fieldsetContextFunctions.updateField(fieldContextID, {
				invalid: isInvalid,
				value: newValue,
			})
		} else {
			formContextFunctions.updateField(fieldContextID, { value: newValue, invalid: isInvalid })
		}

		onChange?.(newValue)
	}

	const restFieldProps: Omit<FieldProps, 'children' | 'className' | 'disabled'> = fieldProps
		? Object.fromEntries(Object.entries(fieldProps).filter(([key]) => key !== 'className'))
		: {}

	const restLabelProps: Omit<LabelProps, 'children' | 'className'> = labelProps
		? Object.fromEntries(Object.entries(labelProps).filter(([key]) => key !== 'className'))
		: {}

	const restDescriptionProps: Omit<DescriptionProps, 'children' | 'className'> = descriptionProps
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

			<Listbox {...props} onChange={handleChange} value={(fieldContext as SomeField<StringField>).value}>
				<ListboxButton>
					<ListboxSelectedOption options={optionList} placeholder={`Select ${multiple ? 'Any' : 'One'}`} />
				</ListboxButton>

				<ListboxOptions></ListboxOptions>
			</Listbox>

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
