// * Types
import { HTMLAttributes } from 'react'

type GhostProps = HTMLAttributes<HTMLDivElement>

// * Utilities
import { twMerge } from '../utils'

export function Ghost({ children, className, ...props }: GhostProps) {
	return (
		<div {...props} className={twMerge('block w-24 max-w-full animate-pulse rounded bg-white/50', className)}>
			{children || <>&nbsp;</>}
		</div>
	)
}
