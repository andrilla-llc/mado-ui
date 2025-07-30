import { ComponentPropsWithRef } from 'react'

export function FolderFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 51.6' {...props}>
      <path d='M0,42.8c0,2.9,0.7,5.1,2.2,6.6c1.5,1.5,3.7,2.2,6.6,2.2H56c2.5,0,4.5-0.7,5.9-2.2c1.4-1.5,2.1-3.7,2.1-6.6V19.7H0V42.8z' />
      <path d='M0,16h64v-2.1c0-2.9-0.7-5.1-2.2-6.5c-1.5-1.5-3.7-2.2-6.6-2.2H28.1c-1,0-1.8-0.1-2.4-0.4c-0.6-0.3-1.3-0.7-2-1.3l-1.7-1.4 c-0.9-0.8-1.8-1.3-2.7-1.6c-0.9-0.3-2-0.5-3.4-0.5h-8C5.3,0,3.4,0.7,2,2.1C0.7,3.5,0,5.6,0,8.5V16z' />
    </svg>
  )
}
