import { ComponentPropsWithRef } from 'react'

export default function ChevronDown(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 36' {...props}>
      <path d='M32,36c1,0,1.8-0.4,2.5-1.1L63,5.7c0.7-0.7,1-1.4,1-2.3c0-1-0.3-1.8-1-2.4c-0.6-0.7-1.4-1-2.3-1s-1.7,0.3-2.4,1L30,29.8H34 L5.7,1C5.1,0.3,4.3,0,3.4,0C2.4,0,1.6,0.3,1,1C0.3,1.6,0,2.4,0,3.4c0,0.9,0.3,1.7,1,2.3l28.5,29.2C30.3,35.7,31.1,36,32,36z' />
    </svg>
  )
}
