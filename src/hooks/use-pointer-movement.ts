import React, { useCallback, useEffect, useId, useRef, useState } from 'react'

export type Coords = { x: number; y: number }

export type Cursor =
	| 'alias'
	| 'all-scroll'
	| 'auto'
	| 'cell'
	| 'col-resize'
	| 'context-menu'
	| 'copy'
	| 'crosshair'
	| 'default'
	| 'e-resize'
	| 'ew-resize'
	| 'grab'
	| 'grabbing'
	| 'help'
	| 'move'
	| 'no-drop'
	| 'not-allowed'
	| 'n-resize'
	| 'ne-resize'
	| 'nw-resize'
	| 'ns-resize'
	| 'nesw-resize'
	| 'nwse-resize'
	| 'pointer'
	| 'progress'
	| 'row-resize'
	| 's-resize'
	| 'se-resize'
	| 'sw-resize'
	| 'text'
	| 'vertical-text'
	| 'w-resize'
	| 'wait'
	| 'zoom-in'
	| 'zoom-out'

export type UsePointerMovementProps = {
	activeCursor?: Cursor
	onChange?: (delta: Coords) => void
	onEnd?: (delta: Coords) => void
}

export function usePointerMovement(props?: UsePointerMovementProps) {
	const pointerTypeRef = useRef<'mouse' | 'pointer' | 'touch'>('pointer'),
		[isTracking, setIsTracking] = useState(false),
		[delta, setDelta] = useState<Coords>({ x: 0, y: 0 }),
		startCoordsRef = useRef<Coords>({ x: 0, y: 0 })

	const styleID = useId()

	const changeCursor = (cursor: Cursor | false) => {
		if (cursor === false) {
			document.querySelector<HTMLStyleElement>(`#${styleID}`)?.remove()
			return
		}

		const css = `*, *:active { cursor: ${cursor}; -moz-user-select: none; -webkit-user-select: none; -ms-user-select: none; user-select: none; }`

		const style = document.createElement('style')

		style.id = styleID
		style.innerHTML = css

		document.body.prepend(style)
	}

	const trackPointerMovement = (
		e: React.MouseEvent<HTMLElement> | React.PointerEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
	) => {
		changeCursor(props?.activeCursor || 'grabbing')

		const { type } = e

		switch (type) {
			case 'mousemove':
			case 'mouseup':
			case 'pointermove':
			case 'pointerup':
			case 'touchmove':
			case 'touchend':
				throw new Error(
					'To initiate the tracking of pointer movement, you must use a `mousedown`, `pointerdown`, or `touchstart`.',
				)
			case 'mousedown':
				pointerTypeRef.current = 'mouse'
				break
			case 'pointerdown':
				pointerTypeRef.current = 'pointer'
				break
			case 'touchstart':
				pointerTypeRef.current = 'touch'
				break
		}

		let x = 0,
			y = 0

		if ('touches' in e) {
			const { touches } = e

			if (touches.length > 1) return

			x = touches[0].clientX
			y = touches[0].clientY
		} else {
			x = e.clientX
			y = e.clientY
		}

		startCoordsRef.current = { x, y }
		setIsTracking(true)
	}

	const updateDelta = useCallback((e: MouseEvent | PointerEvent | TouchEvent) => {
		let clientX = 0,
			clientY = 0

		if ('touches' in e) {
			const { touches } = e

			if (touches.length > 1) return

			clientX = touches[0].clientX
			clientY = touches[0].clientY
		} else {
			clientX = e.clientX
			clientY = e.clientY
		}

		const { x, y } = startCoordsRef.current,
			newDelta = { x: clientX - x, y: clientY - y }

		setDelta(newDelta)
		props?.onChange?.(newDelta)
	}, [])

	const stopTracking = useCallback(() => {
		changeCursor(false)
		setIsTracking(false)
		props?.onEnd?.(delta)
	}, [delta])

	useEffect(() => {
		if (typeof window === 'undefined') return

		const controller = new AbortController(),
			signal = controller.signal

		if (isTracking) {
			switch (pointerTypeRef.current) {
				case 'mouse':
					document.body.addEventListener('mousemove', updateDelta, { signal })
					document.body.addEventListener('mouseup', stopTracking, { signal })
					break
				case 'pointer':
					document.body.addEventListener('pointermove', updateDelta, { signal })
					document.body.addEventListener('pointerup', stopTracking, { signal })
					break
				case 'touch':
					document.body.addEventListener('touchmove', updateDelta, { signal })
					document.body.addEventListener('touchend', stopTracking, { signal })
					break
			}
		} else {
			controller.abort()
		}

		return () => {
			controller.abort()
		}
	}, [isTracking, updateDelta, stopTracking])

	return { delta, stopTracking, trackPointerMovement }
}
