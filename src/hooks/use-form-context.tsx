// * Types
export type FieldType = 'array' | 'email' | 'file' | 'number' | 'object' | 'string' | 'tel' | 'textarea' | 'url'

export type StringField = {
	type: 'email' | 'file' | 'number' | 'string' | 'tel' | 'textarea' | 'url'
	value: string
	required?: boolean
	invalid?: boolean
}

export type ObjectField = { type: 'object'; fields: Field[] }

export type ArrayField = { type: 'array'; of: ArrayObjectOrNormalField }

type ArrayObjectOrNormalField = StringField | ArrayField | ObjectField

export type Field = ArrayObjectOrNormalField & {
	id: string
	name: string
}

export type FormContext = Field[]

// * React
import { ReactNode, useCallback } from 'react'

// * Hooks
import { createFastContext } from './create-fast-context'

/**
 * # Define Field
 *
 * This is a helper function to define a field in a form context with type safety.
 */
export function defineField(fieldDefinition: Field) {
	return fieldDefinition
}

export function isStringField(field: Field) {
	return Boolean(field.type !== 'object' && field.type !== 'array')
}

const { Provider, useStore } = createFastContext<FormContext>([])

export function FormContextProvider({ children }: { children?: ReactNode }) {
	return <Provider>{children}</Provider>
}

export function useFormContext() {
	const [formContext, setFormContext] = useStore(store => store)

	const registerField = useCallback((field: Field) => {
		setFormContext?.(prevContext => {
			const otherFields = (prevContext || []).filter(otherField => otherField.id !== field.id)

			return [...otherFields, field]
		})
	}, [])

	const removeField = useCallback((fieldID: string) => {
		setFormContext?.(prevContext => (prevContext || []).filter(field => field.id !== fieldID))
	}, [])

	const updateField = useCallback((fieldID: string, updates: Partial<Field>) => {
		setFormContext?.(prevContext => {
			const field = prevContext.find(({ id }) => id === fieldID)

			if (!field) throw new Error(`Field with id "${fieldID}" not found in form context.`)

			const otherFields = prevContext.filter(({ id }) => id !== fieldID)

			const updatedField = { ...field, ...updates } as Field

			return [...otherFields, updatedField]
		})
	}, [])

	return [formContext, { registerField, removeField, updateField }] as const
}
