import { ComponentPropsWithRef } from 'react'

export function BookmarkFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 40.2 64' {...props}>
      <path d='M3.2,64c0.7,0,1.4-0.2,2-0.7c0.6-0.5,1.6-1.4,3-2.7l11.7-11.5c0.2-0.2,0.4-0.2,0.5,0L32,60.6c1.4,1.3,2.3,2.2,3,2.7 c0.6,0.5,1.3,0.7,2.1,0.7c1,0,1.8-0.3,2.3-0.9c0.5-0.6,0.8-1.5,0.8-2.7V8.5c0-2.8-0.7-5-2.1-6.4C36.7,0.7,34.6,0,31.8,0H8.4 C5.6,0,3.5,0.7,2.1,2.2C0.7,3.6,0,5.7,0,8.5v51.8c0,1.2,0.3,2.1,0.8,2.7C1.4,63.7,2.2,64,3.2,64z' />
    </svg>
  )
}
