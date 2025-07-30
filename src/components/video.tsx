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
	MouseEventHandler,
	ReactEventHandler,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react'

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
	const uniqueID = useId(),
		figureRef = useRef<HTMLElement>(null),
		videoPlayerRef = useRef<HTMLVideoElement>(null),
		[isPlaying, setIsPlaying] = useState(autoPlay),
		isFullscreenRef = useRef(false),
		[isFullscreen, setIsFullscreen] = useState(false),
		[progress, setProgress] = useState(0),
		[showControls, setShowControls] = useState(true),
		pressedKeyListRef = useRef<ModifierKey[]>([]),
		[pressedKeyList, setPressedKeyList] = useState<ModifierKey[]>([]),
		[volume, setVolume] = useState(1)

	const [seekIndicator, setSeekIndicator] = useState({ isInPlayedArea: false, position: 0 })

	const sortedSrcSet = srcSet.sort((a, b) => a.width - b.width)

	const primaryPoster = poster ? poster.find(({ primary }) => primary)?.src || poster[0].src : ''

	const updateFullscreenState = useCallback(() => {
		if (Boolean(document.fullscreenElement) !== isFullscreenRef.current) {
			setIsFullscreen(Boolean(document.fullscreenElement))
			isFullscreenRef.current = Boolean(document.fullscreenElement)
		}
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return

		document.addEventListener('fullscreenchange', updateFullscreenState)

		return () => {
			document.removeEventListener('fullscreenchange', updateFullscreenState)
		}
	}, [])

	const handleTimeUpdate = () => {
		if (videoPlayerRef.current) {
			const newProgress = (videoPlayerRef.current.currentTime / videoPlayerRef.current.duration) * 100
			setProgress(prev => (Math.abs(prev - newProgress) > 0.1 ? newProgress : prev))
		}
	}

	const togglePlay = useCallback(
		() =>
			setIsPlaying(previous => {
				if (!previous) videoPlayerRef.current?.play()
				if (previous) videoPlayerRef.current?.pause()

				return !previous
			}),
		[],
	)

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
		if (!videoPlayerRef.current) return

		const { currentTime } = videoPlayerRef.current

		const skipAmount = getSkipAmount()

		videoPlayerRef.current.fastSeek(Math.max(currentTime - skipAmount, 0))
	}, [])

	const skipForward = useCallback(() => {
		if (!videoPlayerRef.current) return

		const { currentTime, duration } = videoPlayerRef.current

		const skipAmount = getSkipAmount()

		videoPlayerRef.current.fastSeek(Math.min(currentTime + skipAmount, duration - 1))
	}, [])

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

	const preventContextMenu: MouseEventHandler<HTMLButtonElement> = e => e.preventDefault()

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
					// Volume up
					break
				case 'ArrowDown':
					// Volume down
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

		document.addEventListener('keydown', handleKeydown)
		document.addEventListener('keyup', handleKeyup)

		return () => {
			document.removeEventListener('keydown', handleKeydown)
			document.removeEventListener('keyup', handleKeyup)
		}
	}, [handleKeydown, handleKeyup])

	const handleRemotePlayback = () => videoPlayerRef.current?.remote.prompt()

	const handleSeekIndicatorMovement: MouseEventHandler<HTMLDivElement> = e => {
		if (!videoPlayerRef.current) return

		const { currentTime, duration } = videoPlayerRef.current

		const { clientX, currentTarget } = e,
			{ width, x } = currentTarget.getBoundingClientRect()

		const position = clientX - x

		const isInPlayedArea = position <= width / (duration / currentTime)

		setSeekIndicator({ isInPlayedArea, position })
	}

	const seekIndicatorMouseDownPositionRef = useRef(0)

	const initializeSeeking = () => (seekIndicatorMouseDownPositionRef.current = seekIndicator.position)

	const handleSeekRelease: MouseEventHandler<HTMLDivElement> = e => {
		if (!videoPlayerRef.current) return

		const { duration } = videoPlayerRef.current,
			{ currentTarget } = e,
			{ width } = currentTarget.getBoundingClientRect()

		if (seekIndicatorMouseDownPositionRef.current === seekIndicator.position)
			videoPlayerRef.current.fastSeek(
				Math.min(duration / (width / seekIndicatorMouseDownPositionRef.current), duration - 1),
			)
	}

	const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>(undefined)

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

	const progressiveEnhancementSourceLengthRef = useRef(1)

	const [progressiveEnhancementList, setProgressiveEnhancementList] = useState(
		sortedSrcSet.filter((_, index) => index < progressiveEnhancementSourceLengthRef.current),
	)

	const handleProEnhance: ReactEventHandler<HTMLVideoElement> = e => {
		const { currentTarget } = e,
			{ currentSrc, currentTime } = currentTarget

		console.log('current:', currentSrc)

		const proEnhanceSrcLength = progressiveEnhancementSourceLengthRef.current + 1,
			updatedProEnhanceList = sortedSrcSet.filter((_, index) => index < proEnhanceSrcLength)

		console.log(updatedProEnhanceList)

		setProgressiveEnhancementList(updatedProEnhanceList)
		progressiveEnhancementSourceLengthRef.current = proEnhanceSrcLength

		const srcToCompare =
			typeof updatedProEnhanceList[-1].src === 'string'
				? updatedProEnhanceList[-1].src
				: updatedProEnhanceList[-1].srcGroup

		if (!srcToCompare) return

		if (
			(Array.isArray(srcToCompare) && srcToCompare.every(({ src }) => src !== currentSrc)) ||
			(!Array.isArray(srcToCompare) && srcToCompare !== currentSrc)
		) {
			const srcType = currentSrc.split('.')[-1]

			const src = Array.isArray(srcToCompare)
				? srcToCompare.find(({ src }) => src.split('.')[-1] === srcType)?.src || srcToCompare[0].src
				: srcToCompare

			if (!src) return

			console.log('updated:', src)

			currentTarget.src = src
			currentTarget.currentTime = currentTime || 0
			currentTarget.load()
		}
	}

	const captureCurrentFrame = () => {
		if (!videoPlayerRef.current) return

		const { videoHeight, videoWidth } = videoPlayerRef.current

		const canvas = document.createElement('canvas'),
			canvasContext = canvas.getContext('2d')

		if (!canvasContext) return

		canvas.width = videoWidth
		canvas.height = videoHeight

		canvasContext.drawImage(videoPlayerRef.current, 0, 0, canvas.width, canvas.height)

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

	const increaseVolume = () => {
		if (!videoPlayerRef.current) return

		videoPlayerRef.current.volume += 0.1
		setVolume(videoPlayerRef.current.volume)
	}

	const decreaseVolume = () => {
		if (!videoPlayerRef.current) return

		videoPlayerRef.current.volume -= 0.1
		setVolume(videoPlayerRef.current.volume)
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
				onLoadedMetadata={handleProEnhance}
				onTimeUpdate={handleTimeUpdate}
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
				<div className='absolute inset-0 isolate text-neutral-50 opacity-0 transition-opacity duration-1000 ease-exponential group-data-controls/video:opacity-100'>
					<div className='grid-flow-cols absolute top-1/2 left-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center gap-2'>
						<button
							className='col-start-1 col-end-2 row-start-0 row-end-1 grid size-16 rounded-full backdrop-blur-[1px] backdrop-brightness-101 transition-[scale,-webkit-backdrop-filter,backdrop-filter] duration-300 ease-exponential active:scale-95 active:backdrop-blur-[2px] active:backdrop-brightness-125 pointer-fine:hover:scale-105 pointer-fine:hover:backdrop-blur-xs pointer-fine:hover:backdrop-brightness-110 pointer-fine:active:scale-95 pointer-fine:active:backdrop-blur-[2px] pointer-fine:active:backdrop-brightness-125'
							onClick={togglePlay}
							onContextMenu={preventContextMenu}
							title={isPlaying ? 'Pause' : 'Play'}
						>
							<PauseFill className='col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-0 opacity-0 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 transition-[scale,opacity] duration-500 ease-exponential group-data-playing/video:scale-60 group-data-playing/video:opacity-100' />

							<PlayFill className='-right-0.5 col-start-0 col-end-1 row-start-0 row-end-1 size-full scale-60 drop-shadow-[0_.25rem_2rem] drop-shadow-neutral-950/75 transition-[scale,opacity] duration-500 ease-exponential group-data-playing/video:scale-0 group-data-playing/video:opacity-0' />
						</button>

						<button
							className='col-start-0 col-end-1 row-start-0 row-end-1 grid size-12 rounded-full backdrop-blur-[1px] backdrop-brightness-101 transition-[scale,-webkit-backdrop-filter,backdrop-filter] duration-300 ease-exponential active:scale-95 active:backdrop-blur-[2px] active:backdrop-brightness-125 pointer-fine:hover:scale-105 pointer-fine:hover:backdrop-blur-xs pointer-fine:hover:backdrop-brightness-110 pointer-fine:active:scale-95 pointer-fine:active:backdrop-blur-[2px] pointer-fine:active:backdrop-brightness-125'
							onClick={skipBack}
							onContextMenu={preventContextMenu}
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
							onContextMenu={preventContextMenu}
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
							onMouseDown={initializeSeeking}
							onMouseMove={handleSeekIndicatorMovement}
							onMouseUp={handleSeekRelease}
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

						<DropDown>
							<DropDownButton
								arrow={false}
								className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
								title='Volume'
							>
								<SpeakerWave3Fill className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
							</DropDownButton>

							<DropDownItems
								anchor={{
									gap: '.5rem',
									padding: '.375rem',
									to: 'top',
								}}
								className='bg-neutral-900/50 px-1.5 py-1.5 text-neutral-50 backdrop-blur-xs backdrop-brightness-110'
								static
							>
								<DropDownItem
									as='button'
									className='flex size-6 items-center justify-center rounded-xs transition-transform duration-300 ease-exponential active:scale-95 pointer-fine:hover:scale-105 pointer-fine:active:scale-95'
									onClick={increaseVolume}
									title='Increase volume'
								>
									<SpeakerPlusFill className='size-full scale-80 drop-shadow-[0_.125rem_1rem] drop-shadow-neutral-950/75' />
								</DropDownItem>

								<DropDownSeparator className='mx-auto my-2 h-24 w-2 cursor-grab overflow-clip rounded-md bg-neutral-50/50 backdrop-blur-xs backdrop-brightness-110 transition-[width] duration-300 ease-exponential active:w-4 pointer-fine:hover:w-4 pointer-fine:active:w-4'>
									<div
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
