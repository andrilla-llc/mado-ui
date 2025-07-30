import { ComponentPropsWithRef } from 'react'

export function CircleFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 64' {...props}>
      <circle r='32' cx='32' cy='32' />
    </svg>
  )
}
