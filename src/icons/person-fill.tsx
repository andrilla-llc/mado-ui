import { ComponentPropsWithRef } from 'react'

export default function PersonFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 59.9 64' {...props}>
      <path d='M6.1,64h47.8c1.9,0,3.4-0.4,4.5-1.3c1.1-0.8,1.6-2,1.6-3.5c0-2.3-0.7-4.7-2.1-7.3c-1.4-2.5-3.4-4.9-6-7.1 c-2.6-2.2-5.7-4-9.4-5.4c-3.7-1.4-7.9-2.1-12.5-2.1c-4.6,0-8.8,0.7-12.5,2.1c-3.7,1.4-6.8,3.2-9.4,5.4s-4.6,4.6-6,7.1 C0.7,54.6,0,57,0,59.3c0,1.5,0.5,2.6,1.6,3.5S4.2,64,6.1,64z' />
      <path d='M30,31c2.6,0,4.9-0.7,7.1-2.1c2.2-1.4,3.9-3.3,5.2-5.6s2-5,2-8c0-2.9-0.7-5.5-2-7.8C40.9,5.1,39.2,3.3,37,2 c-2.2-1.3-4.5-2-7.1-2c-2.5,0-4.9,0.7-7,2c-2.2,1.4-3.9,3.2-5.2,5.5c-1.3,2.3-2,4.9-2,7.8c0,2.9,0.7,5.6,2,8c1.3,2.4,3,4.2,5.2,5.6 C25.1,30.3,27.4,31,30,31z' />
    </svg>
  )
}
