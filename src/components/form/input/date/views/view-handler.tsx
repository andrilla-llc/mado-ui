// * Types
import { OneOf } from '../../../../../types'
import { DateUIOption, DateTimeUIOption, TimeUIOption, DateSelectorType, TimeSelectorType } from '..'

export type ViewHandlerProps = OneOf<
	[
		{
			type: 'date'
			/** Using an array, offers multiple, defaulting to the first listed option. */
			ui: DateUIOption
		},
		{
			type: 'datetime'
			/** Using an array, offers multiple, defaulting to the first listed option. */
			ui: DateTimeUIOption
		},
		{
			type: 'time'
			/** Using an array, offers multiple, defaulting to the first listed option. */
			ui: TimeUIOption
		},
	]
>

// * Hooks
import { useState } from 'react'

// * Components
import { CalendarView } from './calendar-view'
import { ClockView } from './clock-view'
import { DropdownView } from './dropdown-view'
import { RotaryView } from './rotary-view'

export function ViewHandler({ type, ui }: ViewHandlerProps) {
	const desktopHasMultipleDateOptions: boolean =
		type === 'datetime'
			? typeof ui.date !== 'string' &&
				(Array.isArray(ui.date) ? ui.date.length > 1 : Array.isArray(ui.date.desktop) && ui.date.desktop.length > 1)
			: type === 'date' &&
				typeof ui !== 'string' &&
				(Array.isArray(ui) ? ui.length > 1 : Array.isArray(ui.desktop) && ui.desktop.length > 1)

	const mobileHasMultipleDateOptions: boolean =
		type === 'datetime'
			? typeof ui.date !== 'string' &&
				(Array.isArray(ui.date) ? ui.date.length > 1 : Array.isArray(ui.date.mobile) && ui.date.mobile.length > 1)
			: type === 'date' &&
				typeof ui !== 'string' &&
				(Array.isArray(ui) ? ui.length > 1 : Array.isArray(ui.mobile) && ui.mobile.length > 1)

	const desktopHasMultipleTimeOptions: boolean =
		type === 'datetime'
			? typeof ui.time !== 'string' &&
				(Array.isArray(ui.time) ? ui.time.length > 1 : Array.isArray(ui.time.desktop) && ui.time.desktop.length > 1)
			: type === 'time' &&
				typeof ui !== 'string' &&
				(Array.isArray(ui) ? ui.length > 1 : Array.isArray(ui.desktop) && ui.desktop.length > 1)

	const mobileHasMultipleTimeOptions: boolean =
		type === 'datetime'
			? typeof ui.time !== 'string' &&
				(Array.isArray(ui.time) ? ui.time.length > 1 : Array.isArray(ui.time.mobile) && ui.time.mobile.length > 1)
			: type === 'time' &&
				typeof ui !== 'string' &&
				(Array.isArray(ui) ? ui.length > 1 : Array.isArray(ui.mobile) && ui.mobile.length > 1)

	const [desktopDateView, setDesktopDateView] = useState<DateSelectorType | undefined>(
		type === 'datetime'
			? typeof ui.date === 'string'
				? ui.date
				: Array.isArray(ui.date)
					? ui.date[0]
					: typeof ui.date.desktop === 'string'
						? ui.date.desktop
						: ui.date.desktop[0]
			: type === 'date'
				? typeof ui === 'string'
					? ui
					: Array.isArray(ui)
						? ui[0]
						: typeof ui.desktop === 'string'
							? ui.desktop
							: ui.desktop[0]
				: undefined,
	)

	const [mobileDateView, setMobileDateView] = useState<DateSelectorType | undefined>(
		type === 'datetime'
			? typeof ui.date === 'string'
				? ui.date
				: Array.isArray(ui.date)
					? ui.date[0]
					: typeof ui.date.mobile === 'string'
						? ui.date.mobile
						: ui.date.mobile[0]
			: type === 'date'
				? typeof ui === 'string'
					? ui
					: Array.isArray(ui)
						? ui[0]
						: typeof ui.mobile === 'string'
							? ui.mobile
							: ui.mobile[0]
				: undefined,
	)

	const [desktopTimeView, setDesktopTimeView] = useState<TimeSelectorType | undefined>(
		type === 'datetime'
			? typeof ui.time === 'string'
				? ui.time
				: Array.isArray(ui.time)
					? ui.time[0]
					: typeof ui.time.desktop === 'string'
						? ui.time.desktop
						: ui.time.desktop[0]
			: type === 'time'
				? typeof ui === 'string'
					? ui
					: Array.isArray(ui)
						? ui[0]
						: typeof ui.desktop === 'string'
							? ui.desktop
							: ui.desktop[0]
				: undefined,
	)

	const [mobileTimeView, setMobileTimeView] = useState<TimeSelectorType | undefined>(
		type === 'datetime'
			? typeof ui.time === 'string'
				? ui.time
				: Array.isArray(ui.time)
					? ui.time[0]
					: typeof ui.time.mobile === 'string'
						? ui.time.mobile
						: ui.time.mobile[0]
			: type === 'time'
				? typeof ui === 'string'
					? ui
					: Array.isArray(ui)
						? ui[0]
						: typeof ui.mobile === 'string'
							? ui.mobile
							: ui.mobile[0]
				: undefined,
	)

	return (
		<>
			{/* Desktop View */}
			<div className='contents pointer-coarse:hidden'>
				{desktopHasMultipleDateOptions && <div>Selector</div>}

				{desktopDateView === 'calendar' ? (
					<CalendarView />
				) : desktopDateView === 'dropdown' ? (
					<DropdownView />
				) : desktopDateView === 'rotary' ? (
					<RotaryView />
				) : null}

				{desktopHasMultipleTimeOptions && <div>Selector</div>}

				{desktopTimeView === 'clock' ? (
					<ClockView />
				) : desktopTimeView === 'dropdown' ? (
					<DropdownView />
				) : desktopTimeView === 'rotary' ? (
					<RotaryView />
				) : null}
			</div>

			{/* Mobile View */}
			<div className='contents pointer-fine:hidden'>
				{mobileHasMultipleDateOptions && <div>Selector</div>}

				{mobileDateView === 'calendar' ? (
					<CalendarView />
				) : mobileDateView === 'dropdown' ? (
					<DropdownView />
				) : mobileDateView === 'rotary' ? (
					<RotaryView />
				) : null}

				{mobileHasMultipleTimeOptions && <div>Selector</div>}

				{mobileTimeView === 'clock' ? (
					<ClockView />
				) : mobileTimeView === 'dropdown' ? (
					<DropdownView />
				) : mobileTimeView === 'rotary' ? (
					<RotaryView />
				) : null}
			</div>
		</>
	)
}
