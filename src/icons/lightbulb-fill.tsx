import { ComponentPropsWithRef } from 'react'

export default function LightbulbFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 36.8 64' {...props}>
      <path d='M0,17c0,10.6,7,13.2,8.1,31.5c0.1,1,0.7,1.6,1.7,1.6H27c1.1,0,1.7-0.6,1.7-1.6c1.1-18.3,8.1-20.9,8.1-31.5 c0-9.5-8.1-17-18.4-17C8.1,0,0,7.5,0,17z' />
      <path d='M9.7,56h17.4c0.9,0,1.6-0.7,1.6-1.6c0-0.9-0.7-1.6-1.6-1.6H9.7c-0.9,0-1.6,0.7-1.6,1.6C8.1,55.3,8.8,56,9.7,56z' />
      <path d='M18.4,64c4.3,0,7.8-2.1,8.1-5.2H10.3C10.5,61.9,14.1,64,18.4,64z' />
    </svg>
  )
}
