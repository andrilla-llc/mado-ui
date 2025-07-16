import { ComponentPropsWithRef } from 'react'

export default function DocFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
	return (
		<svg viewBox='0 0 50.2 64' {...props}>
			<path d='M9.2,64h31.7c3.1,0,5.4-0.8,6.9-2.4c1.5-1.6,2.3-3.9,2.3-7V27.6H28.6c-3.8,0-5.6-1.9-5.6-5.7V0H9.2C6.2,0,3.9,0.8,2.3,2.4 C0.8,3.9,0,6.3,0,9.4v45.3c0,3.1,0.8,5.5,2.3,7C3.9,63.2,6.2,64,9.2,64z' />
			<path d='M28.7,23.5h21.2c-0.1-0.6-0.3-1.3-0.8-1.9c-0.4-0.6-1-1.3-1.7-2L30.9,2.8c-0.7-0.7-1.4-1.3-2-1.7c-0.6-0.4-1.3-0.7-1.9-0.8 v21.5C27,22.9,27.6,23.5,28.7,23.5z' />
		</svg>
	)
}
