import { ComponentPropsWithRef } from 'react'

/**
 * # 𝕏 Logo
 */
export function XLogo(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
	return (
		<svg {...props} viewBox='0 0 1024 926'>
			<path d='M806.464,0L963.472,0L620.432,392.08L1024,925.6L708.016,925.6L460.528,602.016L177.328,925.6L20.224,925.6L387.136,506.24L0,0L324,0L547.712,295.76L806.464,0ZM751.344,831.616L838.352,831.616L276.736,89.04L183.36,89.04L751.344,831.616Z' />
		</svg>
	)
}
