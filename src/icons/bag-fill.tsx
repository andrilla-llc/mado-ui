import { ComponentPropsWithRef } from 'react'

export default function BagFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 55.6 64' {...props}>
      <path d='M53.1,14.6c-1.6-1.6-4.1-2.4-7.4-2.4h-5c-0.1-2.2-0.7-4.2-1.9-6s-2.7-3.3-4.7-4.4C32.3,0.6,30.1,0,27.8,0 c-2.3,0-4.5,0.6-6.4,1.7c-1.9,1.1-3.5,2.6-4.7,4.4c-1.2,1.8-1.8,3.9-1.9,6h-5c-3.3,0-5.7,0.8-7.4,2.4C0.8,16.2,0,18.7,0,21.9v32.4 c0,3.2,0.8,5.7,2.5,7.3S6.6,64,9.8,64h36.8c2.8,0,5-0.8,6.6-2.4c1.6-1.6,2.3-4.1,2.3-7.3V21.9C55.6,18.7,54.7,16.2,53.1,14.6z M19.8,12.2c0-1.4,0.4-2.6,1.1-3.7c0.7-1.1,1.6-2,2.8-2.7c1.2-0.7,2.5-1,4-1c1.5,0,2.8,0.3,4,1c1.2,0.7,2.1,1.6,2.8,2.7 c0.7,1.1,1.1,2.4,1.1,3.7H19.8z' />
    </svg>
  )
}
