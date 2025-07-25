import { ComponentPropsWithRef } from 'react'

export default function SolarPanel(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
    <svg viewBox='0 0 64 58' {...props}>
      <path d='M5.5,58h39.7c2.8,0,4.7-1.6,5.4-4.2l13-46.9c1.1-4.2-1-6.9-5.2-6.9H18.7c-2.8,0-4.7,1.6-5.4,4.2L0.3,51 C-0.9,55.2,1.3,58,5.5,58z M5,51.5l5.7-20.5H29l-6.3,22.3H6.4C5.2,53.2,4.7,52.6,5,51.5z M12,26.2l5.5-19.7c0.3-1.2,1.1-1.8,2.3-1.8 h16.5l-6,21.5H12z M27.6,53.2l6.2-22.3h18.4l-5.7,20.5c-0.4,1.2-1.1,1.8-2.3,1.8H27.6z M35.1,26.2l6-21.5h16.4 c1.2,0,1.8,0.6,1.4,1.8l-5.5,19.7H35.1z' />
    </svg>
  )
}
