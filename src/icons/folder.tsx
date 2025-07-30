import { ComponentPropsWithRef } from 'react'

export function Folder(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 51.8' {...props}>
      <path d='M54.9,5.1H28.2c-1.7,0-2.9-0.5-4.2-1.6l-1.8-1.4C20.3,0.5,18.7,0,16,0H8C3,0,0,2.9,0,8.9v33.9c0,6,3,9,9.1,9h46.8 c5.1,0,8.1-3,8.1-9V14.1C64,8.1,61,5.1,54.9,5.1z M58.9,42.5c0,2.7-1.5,4-4,4H9.2c-2.6,0-4-1.4-4-4.1V9.1c0-2.6,1.4-4,4-4h5.5 c1.7,0,2.9,0.5,4.2,1.6l1.8,1.4c1.8,1.5,3.4,2.1,6.1,2.1h28c2.6,0,4,1.4,4,4.1V42.5z' />
      <rect width='57.7' height='4.8' x='3' y='16' />
    </svg>
  )
}
