import { ComponentPropsWithRef } from 'react'

export function PlayFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
  return (
		<svg viewBox="0 0 57 64" {...props}>
	    <path d="M-0,58.454C-0,62.219 2.163,64 4.77,64C5.895,64 7.11,63.644 8.251,63.02L52.662,37.083C55.817,35.222 56.911,34.016 56.911,32C56.911,29.984 55.817,28.778 52.662,26.917L8.251,0.979C7.11,0.356 5.895,0 4.77,0C2.163,0 -0,1.781 -0,5.547L-0,58.454Z" />
	  </svg>
  )
}
