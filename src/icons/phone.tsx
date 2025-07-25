import { ComponentPropsWithRef } from 'react'

export default function Phone(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 64' {...props}>
      <path d='M62.9,48.1c-0.7-1.1-1.8-2.1-3.2-3.1l-9.5-6.6c-1.5-1-3-1.5-4.6-1.5c-1.6,0-3.1,0.7-4.5,2l-2.5,2.5 c-0.4,0.4-0.7,0.6-1.1,0.6c-0.3,0-0.7-0.1-1-0.3c-0.9-0.6-2.1-1.5-3.6-2.8c-1.5-1.3-2.9-2.6-4.1-3.8c-1.3-1.3-2.5-2.6-3.6-3.9 c-1.1-1.3-2-2.5-2.7-3.5c-0.2-0.4-0.3-0.7-0.3-1.1c0-0.3,0.2-0.7,0.6-1.1l2.5-2.5c1.4-1.4,2-2.9,2-4.5c0-1.6-0.5-3.2-1.6-4.7 l-6.6-9.5c-1-1.5-2.1-2.5-3.2-3.2c-1.1-0.7-2.2-1-3.4-1.1c-2.1,0-4.2,0.9-6.4,2.9C5.9,3,5.8,3.1,5.7,3.3C5.5,3.4,5.4,3.5,5.3,3.6 c-1.8,1.6-3.2,3.5-4,5.5c-0.8,2-1.2,4.4-1.2,7.3c0,4.7,1.4,9.7,4.2,15.2s6.8,10.8,12.1,16.1c3.5,3.5,7.1,6.5,10.7,8.9 c3.6,2.4,7.2,4.3,10.7,5.5s6.8,1.9,9.9,1.9c2.9,0,5.3-0.4,7.3-1.2c2-0.8,3.8-2.2,5.5-4c0.1-0.1,0.2-0.3,0.4-0.4 c0.1-0.1,0.2-0.3,0.4-0.4c1-1.1,1.7-2.2,2.2-3.3c0.5-1.1,0.7-2.1,0.7-3.1C64,50.3,63.6,49.2,62.9,48.1z M57.1,54.5 c-0.1,0.1-0.2,0.2-0.2,0.3s-0.2,0.2-0.2,0.3c-1.1,1.3-2.4,2.3-4,2.9c-1.5,0.6-3.2,1-5,1c-2.8,0-5.8-0.6-8.9-1.9s-6.4-3-9.6-5.3 c-3.2-2.2-6.2-4.8-9-7.6c-2.9-2.8-5.4-5.9-7.7-9.1c-2.3-3.2-4.1-6.5-5.4-9.7s-2-6.3-1.9-9c0-1.8,0.4-3.5,1-5 c0.6-1.5,1.6-2.8,2.9-3.9C9,7.3,9.1,7.2,9.2,7.2C9.3,7.1,9.4,7,9.5,6.9c1-0.9,2-1.3,3-1.3c1,0,1.9,0.5,2.4,1.4l6.3,9.5 c0.3,0.5,0.5,1,0.5,1.6c0,0.5-0.3,1.1-0.8,1.6l-2.9,2.9c-1.1,1.1-1.7,2.3-1.7,3.6c0,1.3,0.4,2.5,1.3,3.6c0.9,1.3,2.1,2.7,3.6,4.3 c1.4,1.6,2.8,3.1,4,4.3c0.8,0.9,1.8,1.8,2.9,2.8c1.1,1,2.2,1.9,3.2,2.9c1.1,0.9,2,1.7,2.9,2.3c1.1,0.8,2.3,1.2,3.6,1.2 c1.3,0,2.5-0.6,3.6-1.7l2.9-2.9c0.5-0.5,1-0.7,1.6-0.8c0.5,0,1.1,0.2,1.6,0.5l9.5,6.3c0.5,0.3,0.8,0.7,1,1.1s0.3,0.9,0.3,1.3 C58.4,52.5,57.9,53.5,57.1,54.5z' />
    </svg>
  )
}
