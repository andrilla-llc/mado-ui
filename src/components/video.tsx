// * Types
import { OneOf } from '../types'

export type VideoControl =
	| 'download'
	| 'fullscreen'
	| 'playbackrate'
	| 'pause'
	| 'remoteplayback'
	| 'seeking'
	| 'volume'

type Source = {
	src: string
	type: 'video/avi' | 'video/flv' | 'video/mkv' | 'video/mov' | 'video/mp4' | 'video/ogg' | 'video/webm'
}

type SourceOrSourceGroup = OneOf<
	[
		Source,
		{
			srcGroup: Source[]
		},
	]
>

export type VideoProps = Omit<
	ComponentPropsWithRef<'video'>,
	'controls' | 'controlList' | 'poster' | 'src' | 'title'
> & {
	controls?: boolean | VideoControl | VideoControl[]
	poster?: {
		primary?: boolean
		src: string
		type: 'image/apng' | 'image/avif' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/svg+xml' | 'image/webp'
		width: number
	}[]
	/** @deprecated Even if you only have on source file, please use srcSet. */
	src?: never
	srcSet: (SourceOrSourceGroup & {
		width: number
	})[]
	title: string
}

// * React
import {
	ComponentPropsWithRef,
	MouseEvent,
	MouseEventHandler,
	ReactEventHandler,
	TouchEvent,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'

// * Hooks
import { Coords, usePointerMovement } from '../hooks'

// * Components
import { DropDown, DropDownButton, DropDownItem, DropDownItems, DropDownSeparator } from './drop-down'
import {
	ArrowDownBackwardAndArrowUpForwardRectangle,
	ArrowUpForwardAndArrowDownBackwardRectangle,
	FifteenArrowTriangleheadClockwise,
	FifteenArrowTriangleheadCounterclockwise,
	FiveArrowTriangleheadClockwise,
	FiveArrowTriangleheadCounterclockwise,
	GearshapeFill,
	NinetyArrowTriangleheadClockwise,
	NinetyArrowTriangleheadCounterclockwise,
	PauseFill,
	PhotoBadgeArrowDownFill,
	PlayFill,
	RectangleFillOnArrowDownForwardTopleadingRectangle,
	RectangleTriangleUp,
	SixtyArrowTriangleheadClockwise,
	SixtyArrowTriangleheadCounterclockwise,
	SpeakerMinusFill,
	SpeakerPlusFill,
	SpeakerSlashFill,
	SpeakerWave3Fill,
	ThirtyArrowTriangleheadClockwise,
	ThirtyArrowTriangleheadCounterclockwise,
	TenArrowTriangleheadClockwise,
	TenArrowTriangleheadCounterclockwise,
} from '../icons'

// * Utilities
import { twMerge } from '../utils'

const MAX_PROGRESS = 100

type FunctionKey = ' ' | 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown' | 'Alt' | 'f' | 'Escape'

type ModifierKey = 'meta' | 'ctrl' | 'alt' | 'shift'

export function Video({ autoPlay, className, controls = true, poster, ref, srcSet, title, ...props }: VideoProps) {
	// * General/Core
	const uniqueID = useId(),
		figureRef = useRef<HTMLElement>(null),
		videoPlayerRef = useRef<HTMLVideoElement>(null),
		sortedSrcSet = srcSet.sort((a, b) => a.width - b.width)

	const primaryPoster = poster ? poster.find(({ primary }) => primary)?.src || poster[0].src : ''

	const preventDefaultEvent: ReactEventHandler = e => e.preventDefault()

	// * Play/Pause Controls
	const [isPlaying, setIsPlaying] = useState(autoPlay)

	const togglePlay = useCallback(() => {
		setIsPlaying(previous => {
			if (!previous) videoPlayerRef.current?.play()
			if (previous) videoPlayerRef.current?.pause()

			return !previous
		})

		handleMouseMoveControls()
	}, [])

	// * Fullscreen Controls
	const isFullscreenRef = useRef(false),
		[isFullscreen, setIsFullscreen] = useState(false)

	const updateFullscreenState = useCallback(() => {
		if (Boolean(document.fullscreenElement) !== isFullscreenRef.current) {
			setIsFullscreen(Boolean(document.fullscreenElement))
			isFullscreenRef.current = Boolean(document.fullscreenElement)
		}
	}, [])

	const toggleFullscreen = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen()
			return
		}

		figureRef.current?.requestFullscreen()
	}

	const requestFullscreen = useCallback(() => {
		if (document.fullscreenElement) return

		figureRef.current?.requestFullscreen()
	}, [])

	const enterPictureInPicture = () => videoPlayerRef.current?.requestPictureInPicture()

	useEffect(() => {
		if (typeof window === 'undefined') return

		document.addEventListener('fullscreenchange', updateFullscreenState)

		return () => {
			document.removeEventListener('fullscreenchange', updateFullscreenState)
		}
	}, [])

	// * Progress/Seeking Controls
	const [progress, setProgress] = useState(0),
		trackProgressStartTimeRef = useRef(0),
		[seekIndicator, setSeekIndicator] = useState({ isInPlayedArea: false, position: 0 }),
		seekIndicatorMouseDownPositionRef = useRef(0),
		scrubberRef = useRef<HTMLDivElement>(null),
		[timeRemaining, setTimeRemaining] = useState(0)

	const handleTimeUpdate = () => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		const { currentTime, duration } = videoPlayer

		const newProgress = (currentTime / duration) * 100
		setProgress(prev => (Math.abs(prev - newProgress) > 0.1 ? newProgress : prev))
		setTimeRemaining(duration - currentTime)
	}

	const handleProgressSlider = ({ x }: Coords) => {
		const videoPlayer = videoPlayerRef.current,
			scrubber = scrubberRef.current

		if (!videoPlayer || !scrubber) return

		const { duration } = videoPlayer,
			{ width } = scrubber.getBoundingClientRect()

		videoPlayer.fastSeek(
			Math.max(Math.min(trackProgressStartTimeRef.current + x / (width / duration), duration - 1), 0),
		)
	}

	const { trackPointerMovement: trackProgress } = usePointerMovement({ onChange: handleProgressSlider })

	const initiateTrackProgress = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		trackProgress(e)

		trackProgressStartTimeRef.current = videoPlayer.currentTime
	}

	const handleSeekIndicatorMovement: MouseEventHandler<HTMLDivElement> = e => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		const { currentTime, duration } = videoPlayer

		const { clientX, currentTarget } = e,
			{ width, x } = currentTarget.getBoundingClientRect()

		const position = clientX - x

		const isInPlayedArea = position <= width / (duration / currentTime)

		setSeekIndicator({ isInPlayedArea, position })
	}

	const initializeSeeking = () => (seekIndicatorMouseDownPositionRef.current = seekIndicator.position)

	const handleSeekRelease: MouseEventHandler<HTMLDivElement> = e => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		const { duration } = videoPlayer,
			{ currentTarget } = e,
			{ width } = currentTarget.getBoundingClientRect()

		if (seekIndicatorMouseDownPositionRef.current === seekIndicator.position)
			videoPlayer.fastSeek(Math.min(duration / (width / seekIndicatorMouseDownPositionRef.current), duration - 1))
	}

	// * Skip Controls
	const [skipDuration, setSkipDuration] = useState(10)

	const getSkipAmount = () => {
		const modifierKeyList = pressedKeyListRef.current

		let skipAmount = 10

		if (modifierKeyList.includes('alt')) {
			if (modifierKeyList.length === 1) skipAmount = 15
			if (modifierKeyList.includes('shift')) skipAmount = 30
			if (modifierKeyList.includes('meta')) skipAmount = 5
			if (modifierKeyList.includes('shift') && modifierKeyList.includes('meta')) skipAmount = 60
			if (modifierKeyList.includes('shift') && modifierKeyList.includes('meta') && modifierKeyList.includes('ctrl'))
				skipAmount = 90
		}

		if (skipAmount !== skipDuration) setSkipDuration(skipAmount)

		return skipAmount
	}

	const skipBack = useCallback(() => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		const { currentTime } = videoPlayer

		const skipAmount = getSkipAmount()

		videoPlayer.fastSeek(Math.max(currentTime - skipAmount, 0))
	}, [])

	const skipForward = useCallback(() => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		const { currentTime, duration } = videoPlayer

		const skipAmount = getSkipAmount()

		videoPlayer.fastSeek(Math.min(currentTime + skipAmount, duration - 1))
	}, [])

	// * Volume Controls
	const [volume, setVolume] = useState(1),
		trackVolumeStartRef = useRef(0)

	const handleVolumeChange: ReactEventHandler<HTMLVideoElement> = e => {
		const { currentTarget } = e,
			{ volume } = currentTarget

		setVolume(volume)
	}

	const handleVolumeSlider = ({ y }: Coords) => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		videoPlayer.volume = Math.max(Math.min(trackVolumeStartRef.current + (y / 96) * -1, 1), 0)
	}

	const { trackPointerMovement: trackVolume } = usePointerMovement({ onChange: handleVolumeSlider })

	const initiateTrackVolume = (e: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		trackVolume(e)

		trackVolumeStartRef.current = videoPlayer.volume
	}

	const increaseVolume = () => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		videoPlayer.volume += 0.1
	}

	const decreaseVolume = () => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		videoPlayer.volume -= 0.1
	}

	// * Controls Visibility
	const [showControls, setShowControls] = useState(true),
		mouseMoveTimeoutRef = useRef<NodeJS.Timeout>(undefined)

	const displayControls = () => {
		if (!showControls) setShowControls(true)
	}

	const hideControls = () => {
		if (!videoPlayerRef.current?.paused) setShowControls(false)
	}

	const handleMouseMoveControls = () => {
		clearTimeout(mouseMoveTimeoutRef.current)
		displayControls()

		mouseMoveTimeoutRef.current = setTimeout(() => hideControls(), 1500)
	}

	const clearMouseMoveControlsTimeout = () => clearTimeout(mouseMoveTimeoutRef.current)

	// * Keyboard Controls
	const pressedKeyListRef = useRef<ModifierKey[]>([]),
		[pressedKeyList, setPressedKeyList] = useState<ModifierKey[]>([])

	const updateModifierKeys = useCallback(
		({
			metaKey,
			altKey,
			shiftKey,
			ctrlKey,
		}: {
			metaKey?: boolean
			altKey?: boolean
			shiftKey?: boolean
			ctrlKey?: boolean
		}) => {
			if (
				(metaKey && !pressedKeyListRef.current.includes('meta')) ||
				(altKey && !pressedKeyListRef.current.includes('alt')) ||
				(shiftKey && !pressedKeyListRef.current.includes('shift')) ||
				(ctrlKey && !pressedKeyListRef.current.includes('ctrl')) ||
				(!metaKey && pressedKeyListRef.current.includes('meta')) ||
				(!altKey && pressedKeyListRef.current.includes('alt')) ||
				(!shiftKey && pressedKeyListRef.current.includes('shift')) ||
				(!ctrlKey && pressedKeyListRef.current.includes('ctrl'))
			) {
				const newPressedKeyList: ModifierKey[] = []

				if (metaKey) newPressedKeyList.push('meta')
				if (altKey) newPressedKeyList.push('alt')
				if (shiftKey) newPressedKeyList.push('shift')
				if (ctrlKey) newPressedKeyList.push('ctrl')

				setPressedKeyList(newPressedKeyList)
				pressedKeyListRef.current = newPressedKeyList
				getSkipAmount()
			}
		},
		[],
	)

	const handleKeydown = useCallback(
		(e: KeyboardEvent) => {
			const { key, metaKey, altKey, shiftKey, ctrlKey } = e

			updateModifierKeys({ metaKey, altKey, shiftKey, ctrlKey })

			if (![' ', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'f'].includes(key)) return

			if ([' ', 'ArrowUp', 'ArrowDown', 'f'].includes(key) && !metaKey && !altKey && !shiftKey && !ctrlKey)
				e.preventDefault()

			switch (key as FunctionKey) {
				case ' ':
					togglePlay()
					break
				case 'ArrowRight':
					skipForward()
					break
				case 'ArrowLeft':
					skipBack()
					break
				case 'ArrowUp':
					increaseVolume()
					break
				case 'ArrowDown':
					decreaseVolume()
					break
				case 'f':
					requestFullscreen()
					break
			}
		},
		[togglePlay, skipForward, updateModifierKeys],
	)

	const handleKeyup = useCallback(
		(e: KeyboardEvent) => {
			const { metaKey, altKey, shiftKey, ctrlKey } = e

			updateModifierKeys({ metaKey, altKey, shiftKey, ctrlKey })
		},
		[updateModifierKeys],
	)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const controller = new AbortController(),
			signal = controller.signal

		document.addEventListener('keydown', handleKeydown, { signal })
		document.addEventListener('keyup', handleKeyup, { signal })

		return () => {
			controller.abort()
		}
	}, [handleKeydown, handleKeyup])

	// * Remote Playback Controls
	const handleRemotePlayback = () => videoPlayerRef.current?.remote.prompt()

	// * Progressive Enhancement
	const progressiveEnhancementSourceLengthRef = useRef(1)

	const [progressiveEnhancementList, setProgressiveEnhancementList] = useState(
		sortedSrcSet.filter((_, index) => index < progressiveEnhancementSourceLengthRef.current),
	)

	const handleProEnhance: ReactEventHandler<HTMLVideoElement> = e => {
		const { currentTarget } = e,
			{ currentSrc, currentTime } = currentTarget

		const proEnhanceSrcLength = progressiveEnhancementSourceLengthRef.current + 1,
			updatedProEnhanceList = sortedSrcSet.filter((_, index) => index < proEnhanceSrcLength)

		console.log(updatedProEnhanceList)

		setProgressiveEnhancementList(updatedProEnhanceList)
		progressiveEnhancementSourceLengthRef.current = proEnhanceSrcLength

		const srcToCompare =
			typeof updatedProEnhanceList.at(-1)?.src === 'string'
				? updatedProEnhanceList.at(-1)?.src
				: updatedProEnhanceList.at(-1)?.srcGroup

		if (!srcToCompare) return

		if (
			(Array.isArray(srcToCompare) && srcToCompare.every(({ src }) => src !== currentSrc)) ||
			(!Array.isArray(srcToCompare) && srcToCompare !== currentSrc)
		) {
			const srcType = currentSrc.split('.').at(-1)

			const src = Array.isArray(srcToCompare)
				? srcToCompare.find(({ src }) => src.split('.').at(-1) === srcType)?.src || srcToCompare[0].src
				: srcToCompare

			if (!src) return

			currentTarget.src = src
			currentTarget.currentTime = currentTime || 0
			currentTarget.load()
		}
	}

	// * Download Controls
	const captureCurrentFrame = () => {
		const videoPlayer = videoPlayerRef.current

		if (!videoPlayer) return

		const { videoHeight, videoWidth } = videoPlayer

		const canvas = document.createElement('canvas'),
			canvasContext = canvas.getContext('2d')

		if (!canvasContext) return

		canvas.width = videoWidth
		canvas.height = videoHeight

		canvasContext.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height)

		canvas.toBlob(
			blob => {
				if (!blob) return

				const url = URL.createObjectURL(blob),
					link = document.createElement('a')

				link.href = url
				link.download = `${title}-frame-${Date.now()}.jpg`

				document.body.appendChild(link)
				link.click()

				document.body.removeChild(link)
				URL.revokeObjectURL(url)
			},
			'image/jpeg',
			0.9,
		)
	}

	return (
		<figure
			{...(showControls ? { 'data-controls': true } : {})}
			{...(isFullscreen ? { 'data-fullscreen': true } : {})}
			{...(isPlaying ? { 'data-playing': true } : {})}
			{...Object.fromEntries(pressedKeyList.map(key => [`data-${key}`, true]))}
			className={twMerge('group/video isolate aspect-video w-full overflow-clip', className)}
			onMouseEnter={displayControls}
			onMouseLeave={hideControls}
			ref={figureRef}
		>
			<video
				{...props}
				className='size-full object-cover'
				onLoad={handleProEnhance}
				onTimeUpdate={handleTimeUpdate}
				onVolumeChange={handleVolumeChange}
				poster={primaryPoster}
				ref={videoPlayerRef || ref}
				title={title}
			>
				{progressiveEnhancementList.map(({ width, ...source }) => {
					if (source.srcGroup) {
						const { srcGroup } = source

						return srcGroup.map(({ src, type }) => (
							<source key={`${title}${type}${width}${uniqueID}`} src={src} type={type} />
						))
					}

					const { src, type } = source

					return <source key={`${title}${type}${width}${uniqueID}`} src={src} type={type} />
				})}
			</video>

			{controls && (
				<div className='absolute inset-0 isolate text-neutral-50 opacity-0 transition-opacity duration-1000 ease-exponential select-none group-data-controls/video:opacity-100'>
					<div className='grid-flow-cols absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-2'>
						<button
							className='col-start-1 col-end-2 row-start-0 row-end-1 grid size-16 rounded-full backdrop-blur-[1px] backdrop-brightness-101 transition-[scale,-webkit-backdrop-filter,backdrop-filter] duration-300 ease-exponential active:scale-95 active:backdrop-blur-[2px] active:backdrop-brightness-125 pointer-fine:hover:scale-105 pointer-fine:hover:backdrop-blur-xs pointer-fine:hover:backdrop-brightness-110 pointer-fine:active:scale-95 pointer-fine:active:backdrop-blur-[2px] pointer-fine:active:backdrop-brightness-125'
							onClick={togglePlay}
							onContextMenu={preventDefaultEvent}
							title={isPlaying ? 'Pause' : 'Play'}
						>
							<PauseFill className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-0 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 transition-[scale,opacity] duration-500 ease-exponential group-data-playing/video:scale-60 group-data-playing/video:opacity-100' />

							<PlayFill className='-right-0.5 col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 transition-[scale,opacity] duration-500 ease-exponential group-data-playing/video:scale-0 group-data-playing/video:opacity-0' />
						</button>

						<button
							className='col-start-0 col-end-1 row-start-0 row-end-1 grid size-12 rounded-full backdrop-blur-[1px] backdrop-brightness-101 transition-[scale,-webkit-backdrop-filter,backdrop-filter] duration-300 ease-exponential active:scale-95 active:backdrop-blur-[2px] active:backdrop-brightness-125 pointer-fine:hover:scale-105 pointer-fine:hover:backdrop-blur-xs pointer-fine:hover:backdrop-brightness-110 pointer-fine:active:scale-95 pointer-fine:active:backdrop-blur-[2px] pointer-fine:active:backdrop-brightness-125'
							onClick={skipBack}
							onContextMenu={preventDefaultEvent}
							title={`Skip Back ${skipDuration} Seconds`}
						>
							<FiveArrowTriangleheadCounterclockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-meta/video:opacity-100 group-data-alt/video:group-data-meta/video:group-data-ctrl/video:opacity-0 group-data-alt/video:group-data-meta/video:group-data-shift/video:opacity-0' />

							<TenArrowTriangleheadCounterclockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:opacity-0 group-data-alt/video:group-data-ctrl/video:opacity-100 group-data-alt/video:group-data-shift/video:group-data-meta/video:group-data-ctrl/video:opacity-0' />

							<FifteenArrowTriangleheadCounterclockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:opacity-100 group-data-ctrl/video:opacity-0 group-data-meta/video:opacity-0 group-data-shift/video:opacity-0' />

							<ThirtyArrowTriangleheadCounterclockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-shift/video:opacity-100 group-data-alt/video:group-data-ctrl/video:group-data-shift/video:opacity-0 group-data-alt/video:group-data-meta/video:group-data-shift/video:opacity-0' />

							<SixtyArrowTriangleheadCounterclockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-shift/video:group-data-meta/video:opacity-100 group-data-alt/video:group-data-shift/video:group-data-meta/video:group-data-ctrl/video:opacity-0' />

							<NinetyArrowTriangleheadCounterclockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-shift/video:group-data-meta/video:group-data-ctrl/video:opacity-100' />
						</button>

						<button
							className='col-start-2 col-end-3 row-start-0 row-end-1 grid size-12 rounded-full backdrop-blur-[1px] backdrop-brightness-101 transition-[scale,-webkit-backdrop-filter,backdrop-filter] duration-300 ease-exponential active:scale-95 active:backdrop-blur-[2px] active:backdrop-brightness-125 pointer-fine:hover:scale-105 pointer-fine:hover:backdrop-blur-xs pointer-fine:hover:backdrop-brightness-110 pointer-fine:active:scale-95 pointer-fine:active:backdrop-blur-[2px] pointer-fine:active:backdrop-brightness-125'
							onClick={skipForward}
							onContextMenu={preventDefaultEvent}
							title={`Skip Forward ${skipDuration} Seconds`}
						>
							<FiveArrowTriangleheadClockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-meta/video:opacity-100 group-data-alt/video:group-data-meta/video:group-data-ctrl/video:opacity-0 group-data-alt/video:group-data-meta/video:group-data-shift/video:opacity-0' />

							<TenArrowTriangleheadClockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:opacity-0 group-data-alt/video:group-data-ctrl/video:opacity-100 group-data-alt/video:group-data-shift/video:group-data-meta/video:group-data-ctrl/video:opacity-0' />

							<FifteenArrowTriangleheadClockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:opacity-100 group-data-ctrl/video:opacity-0 group-data-meta/video:opacity-0 group-data-shift/video:opacity-0' />

							<ThirtyArrowTriangleheadClockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-shift/video:opacity-100 group-data-alt/video:group-data-ctrl/video:group-data-shift/video:opacity-0 group-data-alt/video:group-data-meta/video:group-data-shift/video:opacity-0' />

							<SixtyArrowTriangleheadClockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-shift/video:group-data-meta/video:opacity-100 group-data-alt/video:group-data-shift/video:group-data-meta/video:group-data-ctrl/video:opacity-0' />

							<NinetyArrowTriangleheadClockwise className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 group-data-alt/video:group-data-shift/video:group-data-meta/video:group-data-ctrl/video:opacity-100' />
						</button>
					</div>

					<div className='absolute inset-x-2 bottom-2 flex items-center gap-2 rounded-xl bg-neutral-900/50 px-2 py-1 shadow-2xl backdrop-blur-xs backdrop-brightness-110'>
						<div
							className='group/scrubber h-2 w-max flex-grow cursor-grab overflow-clip rounded-md bg-neutral-50/50 backdrop-blur-xs backdrop-brightness-110 transition-[height] duration-300 ease-exponential active:h-4 pointer-fine:hover:h-4 pointer-fine:active:h-4'
							onMouseDown={e => {
								initiateTrackProgress(e)
								initializeSeeking()
							}}
							onMouseMove={handleSeekIndicatorMovement}
							onMouseUp={handleSeekRelease}
							onTouchStart={initiateTrackProgress}
							ref={scrubberRef}
						>
							<div
								aria-hidden='true'
								className='absolute inset-0 grid transition-cols duration-100 ease-linear'
								style={{ gridTemplateColumns: `${progress / MAX_PROGRESS}fr` }}
							>
								<div className='overflow-hidden'>
									<div className='h-full bg-neutral-50/70 text-[1px] text-transparent backdrop-blur-xs backdrop-brightness-125'>
										{progress}/{MAX_PROGRESS}
									</div>
								</div>
							</div>

							<div
								{...(seekIndicator.isInPlayedArea ? { 'data-in-played-area': true } : {})}
								aria-hidden='true'
								className='absolute inset-y-0 w-1 cursor-grab bg-neutral-50 opacity-0 transition-opacity duration-300 ease-exponential group-hover/scrubber:opacity-100 data-in-played-area:bg-neutral-500 pointer-coarse:hidden'
								style={{ transform: `translateX(${seekIndicator.position}px)` }}
							>
								&nbsp;
							</div>

							<progress className='sr-only' max={MAX_PROGRESS} value={progress} />
						</div>

						<span className='block text-xs'>
							{timeRemaining / 60 >= 1
								? `${Math.round(timeRemaining / 60)}:${Math.round(
										(timeRemaining / 60 - Math.round(timeRemaining / 60)) * 60,
									)
										.toString()
										.padStart(2, '0')}`
								: Math.round(timeRemaining) === 60
									? `1:00`
									: `0:${Math.round(timeRemaining).toString().padStart(2, '0')}`}
						</span>

						<DropDown>
							<DropDownButton
								arrow={false}
								className='group/button flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
								title='Volume'
							>
								<svg
									viewBox='0 0 64 47'
									className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75 transition-transform duration-300 ease-exponential'
									style={{ translate: `${volume > 0.66 ? '0' : volume > 0.33 ? '2px' : volume > 0 ? '4px' : '6px'} 0` }}
								>
									<path d='M25.707,44.076C27.257,44.076 28.39,42.947 28.39,41.387L28.39,4.841C28.39,3.307 27.257,2.025 25.656,2.025C24.542,2.025 23.767,2.512 22.558,3.666L12.393,13.203C12.251,13.345 12.047,13.436 11.818,13.436L4.99,13.436C1.759,13.436 0,15.195 0,18.654L0,27.525C0,30.953 1.759,32.737 4.99,32.737L11.818,32.737C12.047,32.737 12.251,32.808 12.393,32.95L22.558,42.583C23.666,43.615 24.593,44.076 25.707,44.076Z' />
									<path
										className='transition-opacity duration-300 ease-exponential'
										d='M36.874,33.192C37.684,33.728 38.797,33.566 39.439,32.64C41.265,30.222 42.371,26.683 42.371,23.026C42.371,19.368 41.265,15.855 39.439,13.411C38.797,12.485 37.684,12.323 36.874,12.885C35.923,13.553 35.761,14.721 36.505,15.713C37.901,17.607 38.662,20.249 38.662,23.026C38.662,25.802 37.876,28.419 36.505,30.338C35.786,31.355 35.923,32.498 36.874,33.192Z'
										style={{ opacity: volume > 0 ? 1 : 0 }}
									/>
									<path
										className='transition-opacity duration-300 ease-exponential'
										d='M45.738,39.394C46.624,39.981 47.712,39.799 48.354,38.868C51.402,34.69 53.208,28.904 53.208,23.026C53.208,17.148 51.427,11.31 48.354,7.183C47.712,6.252 46.624,6.07 45.738,6.657C44.858,7.249 44.701,8.362 45.399,9.354C48.023,13.032 49.499,17.952 49.499,23.026C49.499,28.099 47.972,32.994 45.399,36.697C44.726,37.689 44.858,38.802 45.738,39.394Z'
										style={{ opacity: volume > 0.33 ? 1 : 0 }}
									/>
									<path
										className='transition-opacity duration-300 ease-exponential'
										d='M54.679,45.708C55.514,46.32 56.683,46.082 57.315,45.121C61.498,39.091 64,31.447 64,23.026C64,14.604 61.422,6.986 57.315,0.93C56.683,-0.056 55.514,-0.269 54.679,0.343C53.804,0.956 53.668,2.079 54.33,3.071C58.012,8.514 60.342,15.379 60.342,23.026C60.342,30.647 58.012,37.562 54.33,42.98C53.668,43.972 53.804,45.095 54.679,45.708Z'
										style={{ opacity: volume > 0.66 ? 1 : 0 }}
									/>
								</svg>
							</DropDownButton>

							<DropDownItems
								anchor={{
									gap: '.5rem',
									padding: '.375rem',
									to: 'top',
								}}
								className='bg-neutral-900/50 px-1.5 py-1.5 text-neutral-50 backdrop-blur-xs backdrop-brightness-110'
							>
								<DropDownItem
									as='button'
									className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
									onClick={increaseVolume}
									title='Increase volume'
								>
									<SpeakerPlusFill className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
								</DropDownItem>

								<DropDownSeparator
									aria-label='Volume slider'
									aria-valuemin={0}
									aria-valuemax={100}
									aria-valuenow={volume * 100}
									className='mx-auto my-2 h-24 w-2 cursor-grab overflow-clip rounded-md bg-neutral-50/50 backdrop-blur-xs backdrop-brightness-110 transition-[width] duration-300 ease-exponential active:w-4 pointer-fine:hover:w-4 pointer-fine:active:w-4'
									onMouseDown={initiateTrackVolume}
									onTouchStart={initiateTrackVolume}
									role='slider'
								>
									<div
										aria-hidden='true'
										className='grid size-full rotate-180 transition-rows duration-300 ease-exponential'
										style={{ gridTemplateRows: `${volume}fr` }}
									>
										<div className='overflow-y-hidden'>
											<div className='size-full bg-neutral-50/70 text-[1px] text-transparent backdrop-blur-xs backdrop-brightness-125'>
												{volume * 100}%
											</div>
										</div>
									</div>
								</DropDownSeparator>

								<DropDownItem
									as='button'
									className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
									onClick={decreaseVolume}
									title='Decrease volume'
								>
									<SpeakerMinusFill className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
								</DropDownItem>
							</DropDownItems>
						</DropDown>

						<button
							className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
							onClick={enterPictureInPicture}
							title='Enter Picture-in-Picture'
						>
							<RectangleFillOnArrowDownForwardTopleadingRectangle className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
						</button>

						<button
							className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
							onClick={handleRemotePlayback}
							title='Remote Playback'
						>
							<RectangleTriangleUp className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
						</button>

						<DropDown>
							<DropDownButton
								arrow={false}
								className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
								title='Other Settings'
							>
								<GearshapeFill className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
							</DropDownButton>

							<DropDownItems
								anchor={{
									gap: '.5rem',
									padding: '.375rem',
									to: 'top end',
								}}
								className='bg-neutral-900/50 px-1.5 py-1.5 text-neutral-50 backdrop-blur-xs backdrop-brightness-110'
							>
								<DropDownItem
									as='button'
									className='flex items-center gap-2 rounded-lg px-1.5 py-0.5 text-sm drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75 transition-[scale,background-color,color] duration-300 ease-exponential active:scale-95 data-active:bg-neutral-50/90 data-active:text-neutral-950 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
									onClick={captureCurrentFrame}
								>
									<PhotoBadgeArrowDownFill className='size-5' />
									Capture Current Frame
								</DropDownItem>
							</DropDownItems>
						</DropDown>

						<button
							className='grid size-6 rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
							onClick={toggleFullscreen}
							title={`${isFullscreen ? 'Exit' : 'Enter'} Fullscreen`}
						>
							<ArrowUpForwardAndArrowDownBackwardRectangle className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-0 opacity-0 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75 transition-[scale,opacity] duration-500 ease-exponential group-data-fullscreen/video:scale-80 group-data-fullscreen/video:opacity-100' />

							<ArrowDownBackwardAndArrowUpForwardRectangle className='-right-0.5 col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75 transition-[scale,opacity] duration-500 ease-exponential group-data-fullscreen/video:scale-0 group-data-fullscreen/video:opacity-0' />
						</button>
					</div>

					<div
						aria-hidden='true'
						className='absolute inset-0 -z-10 text-[1px] text-transparent'
						onClick={togglePlay}
						onMouseMove={handleMouseMoveControls}
						onMouseLeave={clearMouseMoveControlsTimeout}
					>
						{isPlaying ? 'Pause' : 'Play'}
					</div>
				</div>
			)}
		</figure>
	)
}
