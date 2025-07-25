import { ComponentPropsWithRef } from 'react'

export default function Banknote(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 40.1' {...props}>
      <path d='M62.1,0H1.9C0.8,0,0,0.8,0,1.9v36.2c0,1.2,0.8,2,1.9,2h60.1c1.2,0,1.9-0.8,1.9-2V1.9C64,0.8,63.2,0,62.1,0z M60.1,35.5 c0,0.5-0.2,0.7-0.7,0.7H4.6c-0.5,0-0.7-0.2-0.7-0.7V4.6c0-0.5,0.2-0.7,0.7-0.7h54.8c0.5,0,0.7,0.2,0.7,0.7V35.5z' />
      <path d='M56.1,6.5H7.9C7,6.5,6.5,7,6.5,7.9v24.2c0,0.9,0.5,1.4,1.4,1.4h48.2c0.9,0,1.4-0.5,1.4-1.4V7.9C57.5,7,57,6.5,56.1,6.5z M55,30.5c0,0.4-0.2,0.6-0.5,0.6h-45c-0.4,0-0.5-0.2-0.5-0.6v-21c0-0.4,0.2-0.6,0.5-0.6h45c0.4,0,0.5,0.2,0.5,0.6V30.5z' />
      <path d='M31.9,6.5c-5.1,0-9.2,5.2-9.2,13.5c0,8.3,4.1,13.5,9.2,13.5c5.2,0,9.4-5.2,9.4-13.5C41.3,11.7,37.1,6.5,31.9,6.5z M31.9,30.7c-3.5,0-6.4-4.1-6.4-10.7c0-6.6,2.9-10.6,6.4-10.6c3.6,0,6.6,4.1,6.6,10.6C38.5,26.6,35.5,30.7,31.9,30.7z' />
    </svg>
  )
}
