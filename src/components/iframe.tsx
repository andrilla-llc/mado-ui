// * Types
import { ComponentPropsWithRef } from 'react'

export type IFrameAllowAttribute =
	| 'accelerometer'
	| 'ambient-light-sensor'
	| 'attribution-reporting'
	| 'autoplay'
	| 'bluetooth'
	| 'camera'
	| 'captured-surface-control'
	| 'compute-pressure'
	| 'cross-origin-isolated'
	| 'deferred-fetch'
	| 'deferred-fetch-minimal'
	| 'display-capture'
	| 'encrypted-media'
	| 'fullscreen'
	| 'gamepad'
	| 'geolocation'
	| 'gyroscope'
	| 'hid'
	| 'identity-credentials-get'
	| 'idle-detection'
	| 'language-detector'
	| 'local-fonts'
	| 'magnetometer'
	| 'microphone'
	| 'midi'
	| 'otp-credentials'
	| 'payment'
	| 'picture-in-picture'
	| 'publickey-credentials-get'
	| 'screen-wake-lock'
	| 'serial'
	| 'speaker-selection'
	| 'storage-access'
	| 'translator'
	| 'summarizer'
	| 'usb'
	| 'web-share'
	| 'window-management'
	| 'xr-spatial-tracking'

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
	| 'allow-storage-access-by-user-activation'
	| 'allow-top-navigation'
	| 'allow-top-navigation-by-user-activation'
	| 'allow-top-navigation-to-custom-protocols'

export type IFrameProps = Omit<
	ComponentPropsWithRef<'iframe'>,
	'allow' | 'children' | 'referrerPolicy' | 'sandbox' | 'title'
> & {
	allow?: (IFrameAllowAttribute | Record<IFrameAllowAttribute, string[] | boolean>)[] | 'allow-all'
	referrerPolicy?: IFrameReferrerPolicyAttribute
	sandbox?: IFrameSandboxAttribute[]
	title: string
}

// * Utilities
import { twMerge } from '../utils'

const allAllowProperties: IFrameAllowAttribute[] = [
	'accelerometer',
	'ambient-light-sensor',
	'attribution-reporting',
	'autoplay',
	'bluetooth',
	'camera',
	'captured-surface-control',
	'compute-pressure',
	'cross-origin-isolated',
	'deferred-fetch',
	'deferred-fetch-minimal',
	'display-capture',
	'encrypted-media',
	'fullscreen',
	'gamepad',
	'geolocation',
	'gyroscope',
	'hid',
	'identity-credentials-get',
	'idle-detection',
	'language-detector',
	'local-fonts',
	'magnetometer',
	'microphone',
	'midi',
	'otp-credentials',
	'payment',
	'picture-in-picture',
	'publickey-credentials-get',
	'screen-wake-lock',
	'serial',
	'speaker-selection',
	'storage-access',
	'summarizer',
	'translator',
	'usb',
	'web-share',
	'window-management',
	'xr-spatial-tracking',
]

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
	const allowAttribute = (
		allow === 'allow-all'
			? allAllowProperties.map(property => `${property} *`)
			: allow?.map(property => {
					if (typeof property === 'string') return `${property} *`

					const propertyDefinition: string[] = []

					Object.entries(property).forEach(([key, value]) => {
						propertyDefinition.push(key)

						if (value === true) propertyDefinition.push('*')
						if (value === false) propertyDefinition.push(`'none'`)
						if (Array.isArray(value)) value.forEach(origin => propertyDefinition.push(origin))
					})

					return propertyDefinition.join(' ')
				}) || []
	).join('; ')

	return (
		<iframe
			{...props}
			allow={allowAttribute}
			allowFullScreen={allowAttribute?.includes('fullscreen')}
			className={twMerge('aspect-video w-full bg-linear-60 from-neutral-700 via-neutral-500 to-neutral-600', className)}
			referrerPolicy={referrerPolicy}
			sandbox={sandbox?.join(' ')}
		/>
	)
}
