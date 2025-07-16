import { ComponentPropsWithRef } from 'react'

export default function ChevronRight(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 36 64' {...props}>
      <path d='M36,32c0-1-0.4-1.8-1.1-2.5L5.7,1C5,0.3,4.3,0,3.4,0C2.4,0,1.6,0.3,1,1C0.3,1.6,0,2.4,0,3.3S0.3,5,1,5.7L29.8,34v-4L1,58.3 c-0.7,0.6-1,1.4-1,2.3c0,1,0.3,1.8,1,2.4c0.6,0.7,1.4,1,2.4,1c0.9,0,1.7-0.3,2.3-1l29.2-28.5C35.7,33.7,36,32.9,36,32z' />
    </svg>
  )
}
