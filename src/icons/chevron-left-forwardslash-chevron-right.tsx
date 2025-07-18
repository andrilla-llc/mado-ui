import { ComponentPropsWithRef } from 'react'

export default function ChevronLeftForwardslashChevronRight(
  props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>,
) {
  return (
    <svg viewBox='0 0 64 43.2' {...props}>
      <path d='M0,21.6c0,0.6,0.3,1.3,0.8,1.7L16,37.1c1,0.9,2.3,0.9,3,0c0.8-0.9,0.7-2.2-0.2-3L5.1,21.6L18.8,9.1c0.9-0.8,1-2.1,0.2-3 s-2.1-0.9-3,0L0.8,19.9C0.3,20.3,0,20.9,0,21.6z' />
      <path d='M25.8,43.1c1.2,0.3,2.3-0.3,2.7-1.5l11.4-39c0.3-1.1-0.2-2.2-1.4-2.5c-1.2-0.3-2.2,0.2-2.6,1.6L24.6,40.5 C24.1,41.6,24.5,42.8,25.8,43.1z' />
      <path d='M64,21.6c0-0.6-0.3-1.3-0.8-1.7L47.9,6.1c-1-0.9-2.2-0.9-3,0s-0.7,2.2,0.2,3l13.8,12.5L45.1,34.1c-0.9,0.8-1,2.1-0.2,3 s2,0.9,3,0l15.3-13.8C63.8,22.8,64,22.2,64,21.6z' />
    </svg>
  )
}
