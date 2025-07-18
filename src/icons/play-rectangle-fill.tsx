import { ComponentPropsWithRef } from 'react'

export default function PlayRectangleFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 50' {...props}>
      <path d='M61.9,2.1C60.5,0.7,58.3,0,55.5,0h-47c-2.8,0-5,0.7-6.4,2.1C0.7,3.5,0,5.6,0,8.4v33.1c0,2.8,0.7,4.9,2.1,6.3 C3.6,49.3,5.7,50,8.5,50h47c2.9,0,5-0.7,6.4-2.1c1.4-1.4,2.1-3.5,2.1-6.3V8.4C64,5.6,63.3,3.5,61.9,2.1z M42.8,26.5l-16,9.4 c-0.6,0.4-1.2,0.4-1.8,0.2s-1-0.7-1-1.4V15.2c0-0.7,0.3-1.1,0.9-1.4s1.2-0.2,1.9,0.2l16,9.4c0.6,0.3,0.9,0.8,0.8,1.5 C43.6,25.6,43.3,26.1,42.8,26.5z' />
    </svg>
  )
}
