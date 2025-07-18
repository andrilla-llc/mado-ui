import { ComponentPropsWithRef } from 'react'

export default function Checkmark(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
	return (
		<svg aria-label='✓' viewBox='0 0 67.1 66.1' {...props}>
			<path d='M25.9,66.1c1.9,0,3.4-0.8,4.5-2.5L66,7.3c0.4-0.7,0.7-1.2,0.9-1.8C67,5,67.1,4.5,67.1,4c0-1.2-0.4-2.2-1.1-2.9 C65.3,0.4,64.3,0,63.1,0c-0.9,0-1.6,0.2-2.1,0.5c-0.6,0.3-1.1,0.9-1.7,1.8L25.7,56.2L8,32.4c-1-1.4-2.3-2.1-3.8-2.1 c-1.2,0-2.2,0.4-3,1.1c-0.8,0.8-1.2,1.8-1.2,3c0,0.5,0.1,1,0.3,1.6c0.2,0.5,0.5,1.1,1,1.6l20,25.9C22.6,65.3,24.1,66.1,25.9,66.1z' />
		</svg>
	)
}
