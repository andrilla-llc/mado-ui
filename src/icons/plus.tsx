import { ComponentPropsWithRef } from 'react'

export function Plus(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 62.7 64' {...props}>
      <path d='M31.4,64c1.9,0,3.4-1.5,3.4-3.3V35.4h24.6c1.8,0,3.4-1.6,3.4-3.4c0-1.9-1.6-3.4-3.4-3.4H34.8V3.3c0-1.8-1.6-3.3-3.4-3.3 C29.5,0,28,1.5,28,3.3v25.3H3.4C1.6,28.6,0,30.1,0,32c0,1.9,1.6,3.4,3.4,3.4H28v25.3C28,62.5,29.5,64,31.4,64z' />
    </svg>
  )
}
