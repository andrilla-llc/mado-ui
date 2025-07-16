import { ComponentPropsWithRef } from 'react'

export default function CurvePointLeft(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 26.7 64' {...props}>
      <path d='M0,32c0,5.1,26.7,17.8,26.7,32V0C26.7,14.2,0,26.9,0,32z' />
    </svg>
  )
}
