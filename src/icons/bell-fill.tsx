import { ComponentPropsWithRef } from 'react'

export default function BellFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 57.4 64' {...props}>
      <path d='M4.6,51.9h48.2c1.4,0,2.6-0.3,3.4-1c0.8-0.7,1.2-1.6,1.2-2.7c0-1.5-0.6-3-1.9-4.4c-1.3-1.4-2.5-2.8-3.8-4.1 c-0.7-0.7-1.2-1.6-1.6-2.7c-0.4-1.1-0.7-2.3-0.8-3.6s-0.3-2.5-0.4-3.6c-0.1-5.8-1-10.7-2.7-14.6c-1.7-3.9-4.6-6.6-8.7-8.1 c-0.6-2-1.6-3.6-3.1-5C32.8,0.7,31,0,28.7,0c-2.2,0-4.1,0.7-5.7,2.1c-1.5,1.4-2.6,3-3.1,5c-4.1,1.5-6.9,4.2-8.7,8.1 C9.5,19,8.6,23.9,8.5,29.7c-0.1,1.2-0.2,2.4-0.4,3.6c-0.2,1.3-0.5,2.4-0.8,3.6c-0.4,1.1-0.9,2-1.6,2.7c-1.3,1.3-2.6,2.7-3.9,4.1 C0.6,45.2,0,46.6,0,48.1c0,1.1,0.4,2,1.2,2.7C2,51.5,3.2,51.9,4.6,51.9z' />
      <path d='M28.7,64c2.6,0,4.7-0.8,6.4-2.4c1.7-1.6,2.7-3.5,2.9-5.6H19.4c0.2,2.1,1.1,4,2.9,5.6C24,63.2,26.1,64,28.7,64z' />
    </svg>
  )
}
