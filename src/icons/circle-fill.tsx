import { SVGProps } from 'react'

export default function CircleFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 64 64' {...props}>
      <circle r='32' cx='32' cy='32' />
    </svg>
  )
}
