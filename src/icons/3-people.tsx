import { ComponentPropsWithRef } from 'react'

export default function ThreePeople(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 184.1 87.8' {...props}>
      <path d='M61.4,87.8h61.3c3.9,0,6.6-0.5,8.1-1.6s2.3-2.7,2.3-4.9c0-3.1-1-6.4-2.9-9.9s-4.6-6.7-8.2-9.8c-3.6-3-7.9-5.5-12.9-7.4 c-5.1-1.9-10.8-2.9-17.1-2.9c-6.3,0-12,1-17.1,2.9s-9.4,4.4-13,7.4s-6.3,6.3-8.2,9.8s-2.8,6.8-2.8,9.9c0,2.1,0.8,3.8,2.3,4.9 C54.9,87.2,57.6,87.8,61.4,87.8z' />
      <path d='M92.1,42.6c3.5,0,6.7-1,9.7-2.9s5.3-4.5,7.2-7.7c1.8-3.3,2.7-6.9,2.7-11c0-4-0.9-7.6-2.7-10.8s-4.2-5.7-7.2-7.5 S95.6,0,92.1,0s-6.7,0.9-9.7,2.8s-5.3,4.4-7.2,7.6c-1.8,3.2-2.7,6.8-2.7,10.7c0,4,0.9,7.7,2.7,10.9c1.8,3.2,4.2,5.8,7.2,7.7 C85.4,41.6,88.7,42.6,92.1,42.6z' />
      <path d='M8.6,87.8h37.1c-1.3-1.9-1.9-4.1-1.8-6.7s0.7-5.3,1.8-8.2s2.7-5.6,4.7-8.3s4.3-5.1,7-7.1c-2.7-1.8-5.9-3.3-9.4-4.5 s-7.6-1.8-12.1-1.8c-5.5,0-10.5,0.9-14.9,2.7c-4.4,1.8-8.2,4.2-11.3,7.1c-3.1,2.9-5.5,6.2-7.2,9.6S0,77.5,0,80.9 c0,2.2,0.7,3.9,2,5.1C3.3,87.2,5.6,87.8,8.6,87.8z' />
      <path d='M35.8,43.7c3.1,0,5.9-0.8,8.4-2.5s4.6-3.9,6.2-6.8s2.3-6,2.3-9.5s-0.8-6.6-2.3-9.4c-1.6-2.8-3.6-4.9-6.2-6.5 s-5.4-2.4-8.4-2.4S30,7.4,27.4,9s-4.7,3.8-6.3,6.6c-1.6,2.8-2.4,5.9-2.3,9.4c0,3.5,0.8,6.6,2.3,9.5s3.6,5.1,6.2,6.7 C30,42.9,32.8,43.7,35.8,43.7z' />
      <path d='M175.5,87.8c3.1,0,5.3-0.6,6.6-1.8c1.3-1.2,2-2.9,2-5.1c0-3.4-0.8-6.8-2.5-10.3c-1.6-3.5-4-6.7-7.2-9.6 c-3.1-2.9-6.9-5.3-11.3-7.1c-4.4-1.8-9.4-2.7-14.9-2.7c-4.6,0-8.6,0.6-12.1,1.8c-3.5,1.2-6.7,2.7-9.4,4.5c2.6,2.1,5,4.4,7,7.1 s3.6,5.5,4.7,8.3c1.1,2.9,1.7,5.6,1.8,8.2c0.1,2.6-0.5,4.8-1.8,6.7H175.5z' />
      <path d='M148.3,43.7c3,0,5.8-0.8,8.4-2.5s4.7-3.9,6.2-6.7c1.6-2.8,2.3-6,2.3-9.5s-0.8-6.6-2.4-9.4s-3.7-5-6.2-6.6s-5.4-2.4-8.4-2.4 s-5.8,0.8-8.4,2.4s-4.7,3.7-6.2,6.5c-1.6,2.8-2.3,5.9-2.3,9.4s0.8,6.7,2.3,9.5c1.6,2.8,3.6,5.1,6.2,6.8 C142.5,42.9,145.3,43.7,148.3,43.7z' />
    </svg>
  )
}
