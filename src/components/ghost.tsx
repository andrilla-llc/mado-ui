// * Types
import { HTMLAttributes, ReactElement } from 'react'

export type GhostProps = HTMLAttributes<HTMLDivElement>

// * Utilities
import { twMerge } from '../utils'

export function Ghost({ children, className, ...props }: GhostProps): ReactElement {
	return (
		<div {...props} className={twMerge('block w-24 max-w-full animate-pulse rounded bg-white/50', className)}>
			{children || <>&nbsp;</>}
		</div>
	)
}
