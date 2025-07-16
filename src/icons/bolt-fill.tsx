import { ComponentPropsWithRef } from 'react'

export default function BoltFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 40.3 64' {...props}>
      <path d='M0,35.6c0,0.5,0.2,1,0.6,1.4C1,37.3,1.5,37.5,2,37.5h16.2L9.7,60.7c-0.4,1-0.3,1.8,0.1,2.4c0.4,0.6,1,0.9,1.7,0.9 c0.7,0,1.4-0.4,2.1-1.2l26-32.5c0.5-0.6,0.7-1.3,0.7-1.8c0-0.5-0.2-1-0.6-1.4c-0.4-0.4-0.9-0.6-1.5-0.6H22.1l8.6-23.2 c0.4-1,0.3-1.8-0.1-2.4c-0.4-0.6-1-0.9-1.7-0.9c-0.8,0-1.5,0.4-2.1,1.2l-26,32.5C0.2,34.4,0,35,0,35.6z' />
    </svg>
  )
}
