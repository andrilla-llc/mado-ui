// * Types
import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'

export type YouTubeLogoProps = Omit<ComponentPropsWithRef<'svg'>, 'viewBox'> &
	(
		| {
				cutout?: false
				targets?: Partial<{
					background: ComponentPropsWithoutRef<'path'>
					play: ComponentPropsWithoutRef<'path'>
				}>
		  }
		| {
				cutout: true
				targets?: Partial<{
					background: ComponentPropsWithoutRef<'path'>
				}>
		  }
	)

// * Utilities
import { twMerge } from '../../utils'

/**
 * # YouTube Logo
 *
 * ```ts
 * cutout: boolean = false
 * targets: {
 * 	 background: [data-name="background"],
 * 	 play: [data-name="play"]
 * }
 * ```
 */
export function YouTubeLogo({ className, cutout = false, targets, ...props }: YouTubeLogoProps) {
	return (
		<svg
			{...props}
			className={twMerge(
				cutout
					? 'fill-[rgb(255_0_0)]'
					: '[&_[data-name="background"]]:fill-[rgb(255_0_0)] [&_[data-name="play"]]:fill-white',
				className,
			)}
			viewBox='0 0 1024 718'
		>
			{cutout ? (
				<path
					{...targets?.background}
					data-name='background'
					d='M1001.4,112.302L1001.4,112.306C1035.22,248.444 1027.41,463.456 1002.06,604.85C990.119,648.968 955.546,683.541 911.428,695.48C831.967,717.152 512.141,717.152 512.141,717.152C512.141,717.152 192.312,717.152 112.847,695.48C68.73,683.54 34.159,648.967 22.221,604.85C-11.799,469.304 -2.475,254.156 21.561,112.962C33.498,68.844 68.069,34.269 112.187,22.328C191.652,0.656 511.489,0 511.489,0C511.489,0 831.311,0 910.776,21.672C954.892,33.612 989.464,68.185 1001.4,112.302ZM409.692,512.249L675.008,358.574L409.692,204.899L409.692,512.249Z'
				/>
			) : (
				<>
					<path
						{...targets?.background}
						data-name='background'
						d='M1001.4,112.302C989.464,68.185 954.892,33.612 910.776,21.672C831.311,0 511.489,0 511.489,0C511.489,0 191.652,0.656 112.187,22.328C68.069,34.269 33.498,68.844 21.561,112.962C-2.475,254.156 -11.799,469.304 22.221,604.85C34.159,648.967 68.73,683.54 112.847,695.48C192.312,717.152 512.141,717.152 512.141,717.152C512.141,717.152 831.967,717.152 911.428,695.48C955.546,683.541 990.119,648.968 1002.06,604.85C1027.41,463.456 1035.22,248.444 1001.4,112.306L1001.4,112.302Z'
					/>
					<path
						{...(targets && 'play' in targets ? targets?.play : {})}
						data-name='play'
						d='M409.692,512.249L675.008,358.574L409.692,204.899L409.692,512.249Z'
					/>
				</>
			)}
		</svg>
	)
}
