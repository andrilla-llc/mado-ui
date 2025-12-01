// * Types
import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'

export type LinkedInLogoProps = Omit<ComponentPropsWithRef<'svg'>, 'viewBox'> &
	(
		| {
				cutout: true
				targets?: Partial<{
					background: ComponentPropsWithoutRef<'path'>
				}>
		  }
		| {
				cutout?: false
				targets?: Partial<{
					background: Omit<ComponentPropsWithoutRef<'path'>, 'data-name' | 'd'>
					in: Omit<ComponentPropsWithoutRef<'rect'>, 'data-name' | 'height' | 'width' | 'x' | 'y'>
				}>
		  }
	)

// * Utilities
import { twMerge } from '../../utils'

/**
 * # LinkedIn Logo
 *
 * ```ts
 * cutout: boolean
 * targets: {
 * 	 in: [data-name="in"]
 * 	 background: [data-name="background"]
 * }
 * ```
 */
export function LinkedInLogo({ className, cutout, targets, ...props }: LinkedInLogoProps) {
	return (
		<svg
			{...props}
			className={twMerge(
				cutout
					? 'fill-[rgb(10_102_194)]'
					: '[&_[data-name="background"]]:fill-[rgb(10_102_194)] [&_[data-name="in"]]:fill-white',
				className,
			)}
			viewBox='0 0 1024 1024'
		>
			{!cutout && <rect {...targets?.in} data-name='in' x='112' y='112' width='800' height='800' />}
			<path
				{...targets?.background}
				data-name='background'
				d='M872.496,872.511L720.772,872.511L720.772,634.899C720.772,578.239 719.76,505.299 641.86,505.299C562.836,505.299 550.744,567.035 550.744,630.775L550.744,872.495L399.024,872.495L399.024,383.871L544.676,383.871L544.676,450.647L546.716,450.647C576.374,399.935 631.721,369.536 690.428,371.715C844.208,371.715 872.56,472.867 872.56,604.459L872.496,872.511ZM227.824,317.083C179.196,317.091 139.768,277.675 139.76,229.047C139.752,180.419 179.164,140.991 227.792,140.983C276.42,140.971 315.848,180.387 315.856,229.015C315.865,277.317 276.126,317.072 227.824,317.083M303.688,872.515L151.804,872.515L151.804,383.871L303.684,383.871L303.684,872.511L303.688,872.515ZM948.136,0.075L75.564,0.075C34.324,-0.389 0.504,32.647 0,73.887L0,950.099C0.488,991.359 34.304,1024.43 75.56,1024L948.136,1024C989.48,1024.51 1023.43,991.439 1024,950.099L1024,73.819C1023.41,32.499 989.46,-0.533 948.136,0.007'
			/>
		</svg>
	)
}
