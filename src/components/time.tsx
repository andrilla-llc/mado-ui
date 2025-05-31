// * Types
type TimeProps = HTMLAttributes<HTMLTimeElement> &
	Partial<{
		dateObject: Date
		dateTime: string
		day: boolean
		hours: boolean
		milliseconds: boolean
		minutes: boolean
		month: boolean
		seconds: boolean
		year: boolean
	}> & { ref?: RefObject<HTMLTimeElement | null> }

// * React
import { HTMLAttributes, RefObject, useEffect, useState } from 'react'

// * Utilities
import { getDate, getHours, getMilliseconds, getMinutes, getMonth, getMonthName, getSeconds } from '../utils'

export default function Time({
	children,
	dateObject,
	dateTime,
	day,
	hours,
	milliseconds,
	minutes,
	month,
	seconds,
	year,
	ref,
	...props
}: TimeProps) {
	const [date, setDate] = useState<Date | undefined>(dateObject || undefined)

	const getDateAndTime = () => {
		if (dateTime) return dateTime

		if (!date) return ''

		const currentYear = date.getFullYear(),
			currentMonth = getMonth(date),
			currentDay = getDate(date),
			currentHour = getHours(date),
			currentMinute = getMinutes(date),
			currentSecond = getSeconds(date),
			currentMillisecond = getMilliseconds(date)

		return [currentYear, currentMonth, currentDay, currentHour, currentMinute, currentSecond, currentMillisecond].join(
			'-',
		)
	}

	const dateAndTime = getDateAndTime()

	const getDateDisplay = () => {
		if (children) return children
		if (dateAndTime === '') return ''

		const [dtYear, dtMonth, dtDay, dtHour, dtMinute, dtSecond, dtMillisecond] = dateAndTime.split('-').map(Number)

		return [
			day && dtDay,
			month && [getMonthName(Number(dtMonth) - 1), month && year && ','].filter(Boolean).join(''),
			year && dtYear,
			hours &&
				minutes &&
				[
					'at',
					hours && dtHour,
					hours && minutes && ':',
					minutes && dtMinute,
					minutes && seconds && ':',
					seconds && dtSecond,
					seconds && milliseconds && '.',
					milliseconds && dtMillisecond,
				]
					.filter(Boolean)
					.join(''),
		]
			.filter(Boolean)
			.join(' ')
	}

	const dateDisplay = getDateDisplay()

	useEffect(() => {
		if (
			date === undefined &&
			dateObject === undefined &&
			dateTime === undefined &&
			typeof window !== 'undefined' &&
			(dateAndTime === '' || dateDisplay === '')
		)
			setDate(new Date())
	}, [date, setDate, dateAndTime, dateDisplay, dateObject, dateTime])

	return (
		<time dateTime={dateAndTime} ref={ref} {...props}>
			{dateDisplay}
		</time>
	)
}
