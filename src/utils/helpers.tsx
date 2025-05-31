import { Children, Fragment, isValidElement, ReactElement, ReactNode } from 'react'

export function findComponentByType(children: ReactNode, componentType: any): ReactElement | null {
	const childrenArray = Children.toArray(children)

	for (const child of childrenArray) {
		if (isValidElement(child) && child.type === componentType) return child
	}

	for (const child of childrenArray) {
		if (isValidElement(child)) {
			if (child.type === Fragment && (child as ReactElement<any>).props.children) {
				const found = findComponentByType((child as ReactElement<any>).props.children, componentType)
				if (found) return found
			} else if ((child as ReactElement<any>).props.children) {
				const found = findComponentByType((child as ReactElement<any>).props.children, componentType)
				if (found) return found
			}
		}
	}

	return null
}
