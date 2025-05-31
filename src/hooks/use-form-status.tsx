// * Types
import { ReactNode, Suspense } from 'react'

export type FormStatus = 'error' | 'incomplete' | 'loading' | 'ready' | 'success' | 'readonly'

// * Hooks
import createFastContext from './create-fast-context'

const DEFAULT_STATUS: FormStatus = 'incomplete'

const { Provider, useStore } = createFastContext<FormStatus>(DEFAULT_STATUS)

export function FormStatusProvider({
	children,
	initialStatus = DEFAULT_STATUS,
}: {
	children?: ReactNode
	initialStatus?: FormStatus
}) {
	return (
		<Suspense>
			<Provider initialValue={initialStatus}>{children}</Provider>
		</Suspense>
	)
}

export function useFormStatus() {
	return useStore(store => store)
}
