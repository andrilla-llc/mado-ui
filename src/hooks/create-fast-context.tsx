// * React
import { HTMLAttributes, useRef, createContext, useContext, useSyncExternalStore } from 'react'

export function createFastContext<Store>(defaultInitialState: Store) {
	function useStoreData(initialState: Store = defaultInitialState): {
		get: () => Store
		set: (value: Store | ((prevState: Store) => Store)) => void
		subscribe: (callback: () => void) => () => void
	} {
		const store = useRef(initialState),
			get = () => store.current,
			subscribers = useRef(new Set<() => void>())

		const set = (value: Store | ((prevState: Store) => Store)) => {
			if (typeof value === 'function') {
				store.current = (value as (prevState: Store) => Store)(store.current)
			} else {
				store.current = value
			}
			subscribers.current.forEach(callback => callback())
		}

		const subscribe = (callback: () => void) => {
			subscribers.current.add(callback)
			return () => subscribers.current.delete(callback)
		}

		return {
			get,
			set,
			subscribe,
		}
	}

	type UseStoreDataReturnType = ReturnType<typeof useStoreData>

	const StoreContext = createContext<UseStoreDataReturnType | null>(null)

	function Provider({
		initialValue = defaultInitialState,
		...props
	}: Pick<HTMLAttributes<HTMLElement>, 'children'> & { initialValue?: Store }) {
		return <StoreContext.Provider value={useStoreData(initialValue)} {...props} />
	}

	function useStore<SelectorOutput>(
		selector: (store: Store) => SelectorOutput,
		initialValue?: Store,
	): [SelectorOutput | undefined, ((value: Store | ((prevState: Store) => Store)) => void) | undefined] {
		const store = useContext(StoreContext)

		if (!store) {
			const localStoreValue = initialValue !== undefined ? initialValue : defaultInitialState

			const selectedValue = selector(localStoreValue)
			const noOpSet = () => console.warn('Attempting to set store value outside of Provider')

			return [selectedValue, noOpSet]
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			() => selector(initialValue !== undefined ? initialValue : defaultInitialState),
		)

		return [state, store.set]
	}

	return {
		Provider,
		useStore,
	}
}
