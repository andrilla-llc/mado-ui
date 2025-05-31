import { SVGProps } from 'react'

export default function ChevronLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 36 64' {...props}>
      <path d='M0,32c0,1,0.4,1.8,1.1,2.5L30.3,63c0.7,0.7,1.4,1,2.3,1c1,0,1.8-0.3,2.4-1c0.7-0.6,1-1.4,1-2.3c0-0.9-0.3-1.7-1-2.4L6.2,30 v4L35,5.7c0.7-0.6,1-1.4,1-2.3c0-1-0.3-1.8-1-2.4c-0.6-0.7-1.4-1-2.4-1c-0.9,0-1.7,0.3-2.3,1L1.1,29.5C0.3,30.3,0,31.1,0,32z' />
    </svg>
  )
}
