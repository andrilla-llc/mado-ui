import { ComponentPropsWithRef } from 'react'

export default function Magnifyingglass(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 63.4 64' {...props}>
      <path d='M62.3,57.5L46.4,41.6c3.3-4.4,5.3-9.8,5.3-15.7C51.8,11.6,40.2,0,25.9,0C11.6,0,0,11.6,0,25.9c0,14.3,11.6,25.9,25.9,25.9 c5.6,0,10.8-1.8,15-4.9l16,16c0.8,0.7,1.7,1.1,2.7,1.1c2.2,0,3.7-1.7,3.7-3.8C63.4,59.1,63,58.2,62.3,57.5z M25.9,46.2 c-11.3,0-20.3-9.1-20.3-20.3c0-11.2,9.1-20.3,20.3-20.3c11.2,0,20.3,9.1,20.3,20.3C46.2,37.1,37.1,46.2,25.9,46.2z' />
    </svg>
  )
}
