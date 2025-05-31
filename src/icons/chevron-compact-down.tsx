import { SVGAttributes } from 'react'

export default function ChevronCompactDown(props: Omit<SVGAttributes<SVGSVGElement>, 'viewBox' | 'children'>) {
	return (
		<svg viewBox='0 0 64 18' {...props}>
			<path d='M37.2,16.4L61.7,6.8C63.1,6.3 64,5 64,3.7C64,1.6 62.5,0 60.4,0C58.3,0 57.9,0.6 57,0.9L32,10.7L7,0.9C6.1,0.6 4.7,0 3.6,0C1.5,0 0,1.6 0,3.7C0,5.8 0.9,6.2 2.3,6.8L26.8,16.4C28.5,17 30.5,17.8 32,17.8C33.5,17.8 35.6,17 37.2,16.4Z' />
		</svg>
	)
}
