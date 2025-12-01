// * Types
import { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react'

export type FacebookLogoProps = Omit<ComponentPropsWithRef<'svg'>, 'viewBox'> &
	(
		| ({
				variant?: 'circle'
		  } & (
				| {
						cutout: true
						targets?: Partial<{
							background: Omit<ComponentPropsWithoutRef<'path'>, 'data-name'>
						}>
				  }
				| {
						cutout?: false
						targets?: Partial<{
							background: Omit<ComponentPropsWithoutRef<'circle'>, 'data-name'>
							f: Omit<ComponentPropsWithoutRef<'path'>, 'data-name'>
						}>
				  }
		  ))
		| { variant: 'f'; cutout?: never; targets?: never }
	)

// * Utilities
import { twMerge } from '../../utils'

/**
 * # Facebook Logo
 *
 * ```ts
 * cutout: boolean = false
 * targets: {
 * 	 background: [data-name="background"],
 * 	 f: [data-name="f"]
 * }
 * variant: 'circle' | 'f' = 'circle'
 * ```
 */
export function FacebookLogo({ className, cutout = false, targets, variant = 'circle', ...props }: FacebookLogoProps) {
	return (
		<svg
			{...props}
			className={twMerge(
				variant === 'circle' && cutout
					? 'fill-[url(#facebook-gradient)]'
					: '[&_[data-name="background"]]:fill-[url(#facebook-gradient)] [&_[data-name="f"]]:fill-white',
				variant === 'f' && 'fill-[url(#facebook-gradient)]',
				className,
			)}
			viewBox={`0 0 ${variant === 'circle' ? '1024' : '551'} ${variant === 'circle' && cutout ? '1017' : '1024'}`}
		>
			{variant === 'circle' &&
				(cutout ? (
					<path
						{...targets?.background}
						data-name='background'
						d='M426.672,1016.91C184.64,976.24 0,765.504 0,512C0,229.424 229.424,0 512,0C794.576,0 1024,229.424 1024,512C1024,765.504 839.36,976.24 597.328,1016.91L597.328,651.376L711.104,651.376L733.872,509.152L597.328,509.152L597.328,409.6C597.328,369.776 611.552,338.496 674.128,338.496L739.552,338.496L739.552,207.648C702.576,201.952 662.752,196.272 625.776,196.272C509.152,196.272 426.672,267.376 426.672,395.376L426.672,509.152L298.672,509.152L298.672,651.376L426.672,651.376L426.672,1016.91Z'
					/>
				) : (
					<>
						<circle {...targets?.background} data-name='background' cx='512' cy='512' r='512' />
						<path
							{...(targets && 'f' in targets ? targets?.f : {})}
							data-name='f'
							d='M426.672,1016.91L426.672,651.376L298.672,651.376L298.672,509.152L426.672,509.152L426.672,395.376C426.672,267.376 509.152,196.272 625.776,196.272C662.752,196.272 702.576,201.952 739.552,207.648L739.552,338.496L674.128,338.496C611.552,338.496 597.328,369.776 597.328,409.6L597.328,509.152L733.872,509.152L711.104,651.376L597.328,651.376L597.328,1016.91C569.584,1021.57 541.072,1024 512,1024C482.928,1024 454.416,1021.57 426.672,1016.91Z'
						/>
					</>
				))}
			{variant === 'f' && (
				<path d='M159.712,1024L159.712,567.888L0,567.888L0,390.432L159.712,390.432L159.712,248.448C159.712,88.736 262.656,0 408.176,0C454.304,0 504,7.104 550.144,14.192L550.144,177.472L468.512,177.472C390.432,177.472 372.672,216.512 372.672,266.192L372.672,390.432L543.04,390.432L514.656,567.888L372.672,567.888L372.672,1024L159.712,1024Z' />
			)}
			<defs>
				{variant === 'circle' && (
					<linearGradient
						id='facebook-gradient'
						x1='0'
						y1='0'
						x2='1'
						y2='0'
						gradientUnits='userSpaceOnUse'
						gradientTransform='matrix(2.81599e-13,-994.078,994.078,2.81599e-13,512,994.078)'
					>
						<stop offset='0' stopColor='rgb(0 98 224)' stopOpacity={1} />
						<stop offset='1' stopColor='rgb(25 175 255)' stopOpacity={1} />
					</linearGradient>
				)}
				{variant === 'f' && (
					<linearGradient
						id='facebook-gradient'
						x1='0'
						y1='0'
						x2='1'
						y2='0'
						gradientUnits='userSpaceOnUse'
						gradientTransform='matrix(0.0108513,-1032.85,1032.85,0.0108513,266.187,1032.85)'
					>
						<stop offset='0' stopColor='rgb(0 98 224)' stopOpacity={1} />
						<stop offset='1' stopColor='rgb(25 175 255)' stopOpacity={1} />
					</linearGradient>
				)}
			</defs>
		</svg>
	)
}
