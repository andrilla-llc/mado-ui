// * Types
export type IFrameAllowAttribute =
	| 'accelerometer'
	| 'autoplay'
	| 'camera'
	| 'encrypted-media'
	| 'fullscreen'
	| 'gyroscope'
	| 'magnetometer'
	| 'microphone'
	| 'payment'
	| 'picture-in-picture'
	| 'publickey-credentials-get'
	| 'usb'

export type IFrameReferrerPolicyAttribute =
	| 'no-referrer'
	| 'no-referrer-when-downgrade'
	| 'origin'
	| 'origin-when-cross-origin'
	| 'same-origin'
	| 'strict-origin'
	| 'strict-origin-when-cross-origin'
	| 'unsafe-url'

export type IFrameSandboxAttribute =
	| 'allow-downloads'
	| 'allow-forms'
	| 'allow-modals'
	| 'allow-orientation-lock'
	| 'allow-pointer-lock'
	| 'allow-popups'
	| 'allow-popups-to-escape-sandbox'
	| 'allow-presentation'
	| 'allow-same-origin'
	| 'allow-scripts'
	| 'allow-top-navigation'
	| 'allow-top-navigation-by-user-activation'
	| 'allow-top-navigation-to-custom-protocols'

export type IFrameProps = Omit<
	ComponentPropsWithRef<'iframe'>,
	'allow' | 'children' | 'referrerPolicy' | 'sandbox' | 'title'
> & {
	allow?: IFrameAllowAttribute | IFrameAllowAttribute[] | 'allow-all'
	referrerPolicy?: IFrameReferrerPolicyAttribute
	sandbox?: IFrameSandboxAttribute | IFrameSandboxAttribute[] | 'allow-all'
	title: string
}

// * React
import { ComponentPropsWithRef, forwardRef } from 'react'

// * Utilities
import { twMerge } from '../utils'

const allAllowProperties =
	'accelerometer, autoplay, camera, encrypted-media, fullscreen, gyroscope, magnetometer, microphone, payment, picture-in-picture, publickey-credentials-get, usb'

const allSandboxProperties =
	'allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation allow-top-navigation-to-custom-protocols'

/**
 * # iFrame
 * - An `<iframe/>` with preset classes, backup, and required title for SEO.
 */
export function IFrame({
	allow,
	className,
	referrerPolicy = 'no-referrer-when-downgrade',
	sandbox,
	...props
}: IFrameProps) {
	const useAllAllow = allow === 'allow-all',
		useAllSandbox = sandbox === 'allow-all',
		allowIsString = typeof allow === 'string',
		sandboxIsString = typeof sandbox === 'string'

	return (
		<iframe
			{...props}
			className={twMerge('aspect-video w-full', className)}
			allow={useAllAllow ? allAllowProperties : allowIsString ? allow : allow?.join('; ')}
			referrerPolicy={referrerPolicy}
			sandbox={useAllSandbox ? allSandboxProperties : sandboxIsString ? sandbox : sandbox?.join(' ')}
			allowFullScreen={allow?.includes('fullscreen') || useAllAllow}
		/>
	)
}
