// * Types
import { ColorTheme, OneOf } from '../../../../types'

export type DateOrTimeSelectorType = 'dropdown' | 'rotary'

export type DateSelectorType = DateOrTimeSelectorType | 'calendar'

export type TimeSelectorType = DateOrTimeSelectorType | 'clock'

export type DateAndTimeSelectorType = DateOrTimeSelectorType | 'clock-and-calendar'

export type DateTimeInputProps = OneOf<
	[
		{
			type: 'date'
			/** Using an array, offers multiple, defaulting to the first listed option. */
			ui?:
				| DateSelectorType
				| DateSelectorType[]
				| {
						desktop: DateSelectorType | DateSelectorType[]
						mobile: DateSelectorType | DateSelectorType[]
				  }
		},
		{
			type: 'datetime'
			/** Using an array, offers multiple, defaulting to the first listed option. */
			ui?:
				| DateAndTimeSelectorType
				| DateAndTimeSelectorType[]
				| {
						desktop: DateAndTimeSelectorType | DateAndTimeSelectorType[]
						mobile: DateAndTimeSelectorType | DateAndTimeSelectorType[]
				  }
		},
		{
			type: 'time'
			/** Using an array, offers multiple, defaulting to the first listed option. */
			ui?:
				| TimeSelectorType
				| TimeSelectorType[]
				| {
						desktop: TimeSelectorType | TimeSelectorType[]
						mobile: TimeSelectorType | TimeSelectorType[]
				  }
		},
	]
> & {
	max?: Date
	min?: Date
	theme?: ColorTheme
}

// * React
import { ReactElement, useEffect } from 'react'

// * Utilities
import { getLocalTime } from '../../../../utils'

export function DateTimeInput({ theme, type, ui, ...props }: DateTimeInputProps): ReactElement {
	if (!ui)
		switch (type) {
			case 'date':
				ui = {
					desktop: ['calendar', 'dropdown'],
					mobile: ['calendar', 'rotary'],
				}
		}

	useEffect(() => {
		getLocalTime([5, 36])
	}, [])

	return <></>
}
