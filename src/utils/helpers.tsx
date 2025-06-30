import { Children, ElementType, Fragment, isValidElement, ReactElement, ReactNode } from 'react'

export function findComponentByType<P extends { children?: ReactNode; [key: string]: any } = { children?: ReactNode }>(
	children: ReactNode,
	componentType: ElementType,
): ReactElement<P> | null {
	const childrenArray = Children.toArray(children)

	for (const child of childrenArray) {
		if (isValidElement(child) && child.type === componentType) return child as ReactElement<P>
	}

	for (const child of childrenArray) {
		if (isValidElement(child)) {
			if (child.type === Fragment && (child as ReactElement<P>).props.children) {
				const found = findComponentByType<P>((child as ReactElement<P>).props.children, componentType)

				if (found) return found as ReactElement<P>
			} else if ((child as ReactElement<P>).props.children) {
				const found = findComponentByType<P>((child as ReactElement<P>).props.children, componentType)

				if (found) return found as ReactElement<P>
			}
		}
	}

	return null
}
