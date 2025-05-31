// * Types
import { ReactNode } from 'react'

export type FieldType = 'array' | 'email' | 'file' | 'number' | 'object' | 'string' | 'tel' | 'textarea' | 'url'

type ArrayObjectOrNormalField =
	| { type: 'email' | 'file' | 'number' | 'string' | 'tel' | 'textarea' | 'url' }
	| { type: 'array'; of: ArrayObjectOrNormalField }
	| { type: 'object'; fields: Field[] }

export type Field = ArrayObjectOrNormalField & {
	id: string
	invalid?: boolean
	name: string
	required?: boolean
	value: string
}

export type FormContext = Field[]

// * Hooks
import createFastContext from './create-fast-context'

/**
 * # Define Field
 *
 * This is a helper function to define a field in a form context with type safety.
 */
export function defineField(fieldDefinition: Field) {
	return fieldDefinition
}

const { Provider, useStore } = createFastContext<FormContext>([])

export function FormContextProvider({ children }: { children?: ReactNode }) {
	return <Provider>{children}</Provider>
}

export function useFormContext() {
	return useStore(store => store)
}
