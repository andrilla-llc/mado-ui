// * Types
import { defineField, Field, isStringField, StringField, useFormContext } from './use-form-context'

export type FieldsetContextValue = {
	fieldList: Field[]
	decorative: boolean
	id: string
	join?: string
	name: string
}

export type FieldsetContext = [
	FieldsetContextValue | undefined,
	{
		registerField: (field: Field) => void
		removeField: (fieldID: string) => void
		updateField: (fieldID: string, updates: Partial<Field>) => void
	},
]

// * React
import { ReactNode, useCallback, useEffect } from 'react'

// * Hooks
import { createFastContext } from './create-fast-context'

const { Provider, useStore } = createFastContext<FieldsetContextValue | undefined>(undefined)

export function FieldsetContextProvider({
	children,
	initialValue,
}: {
	children?: ReactNode
	initialValue?: FieldsetContextValue
}) {
	return <Provider initialValue={initialValue}>{children}</Provider>
}

export function useFieldsetContext(): FieldsetContext {
	const [fieldsetContext, setFieldsetContext] = useStore(store => store),
		[, formContextFunctions] = useFormContext()

	const registerField = useCallback((field: Field) => {
		setFieldsetContext?.(prev => {
			if (!prev) return prev

			const existingFieldIndex = prev.fieldList.findIndex(existingField => existingField.id === field.id)

			const newFieldList =
				existingFieldIndex >= 0
					? prev.fieldList.map((existingField, index) => (index === existingFieldIndex ? field : existingField))
					: [...prev.fieldList, field]

			return { ...prev, fieldList: newFieldList }
		})
	}, [])

	const removeField = useCallback((fieldID: string) => {
		setFieldsetContext?.(prev => {
			if (!prev) return prev

			return {
				...prev,
				fieldList: prev.fieldList.filter(field => field.id !== fieldID),
			}
		})
	}, [])

	const updateField = useCallback((fieldID: string, updates: Partial<Field>) => {
		setFieldsetContext?.(prev => {
			if (!prev) return prev

			return {
				...prev,
				fieldList: prev.fieldList.map(field => (field.id === fieldID ? ({ ...field, ...updates } as Field) : field)),
			}
		})
	}, [])

	const createFormContextEntry = useCallback((fieldsetEntry: FieldsetContextValue): Field => {
		if (fieldsetEntry.join) {
			const joinedValue = fieldsetEntry.fieldList
				.filter(field => isStringField(field) && (field as StringField).value !== '')
				.map(field => (field as StringField).value)
				.join(fieldsetEntry.join)

			return defineField({
				type: 'string',
				id: fieldsetEntry.id,
				name: fieldsetEntry.name,
				value: joinedValue,
				required: fieldsetEntry.fieldList.some(field => (field as StringField).required),
				invalid: fieldsetEntry.fieldList.some(field => (field as StringField).invalid),
			})
		}

		return defineField({
			type: 'object',
			id: fieldsetEntry.id,
			name: fieldsetEntry.name,
			fields: fieldsetEntry.fieldList,
		})
	}, [])

	useEffect(() => {
		if (!fieldsetContext || fieldsetContext.decorative) return

		const formContextEntry = createFormContextEntry(fieldsetContext)

		formContextFunctions.registerField(formContextEntry)

		return () => {
			formContextFunctions.removeField(fieldsetContext.id)
		}
	}, [fieldsetContext, formContextFunctions.registerField, formContextFunctions.removeField, createFormContextEntry])

	return [fieldsetContext, { registerField, removeField, updateField }]
}
