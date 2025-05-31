export type MonthName =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December'

export type WeekdayName = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday'

/** The current date as a Date object */
const d = new Date()

/** The current minute of the current hour */
const minutes = d.getMinutes()

/** The current year */
const year = d.getFullYear()

/** An array of the names of month in order */
export const monthNamesList: MonthName[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

/** An array of the names of the days of the week in order */
export const weekdayNamesList: WeekdayName[] = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

/** The name of the current month */
export const currentMonthName = getMonthName()

/** The name of the current day of the week */
export const currentWeekdayName = getWeekdayName()

/**
 * ### Days In Month
 * - Returns the number of days in the specified month.
 * @param {Date} date A Date object representing the month to get the number of days for. (Preset to the current date)
 * @returns {number} The number of days in the specified month.
 */
export function daysInMonth(date: Date = d): number {
	const selectedYear = date.getFullYear(),
		selectedMonth = date.getMonth() + 1
	return new Date(selectedYear, selectedMonth, 0).getDate()
}

/**
 * ### First of Month
 * - Returns the first day of the specified month.
 * @param {Date} date A Date object representing the month to get the first day for. (Preset to current date)
 * @returns {Date} A Date object of the given month, with the first day.
 */
export function firstOfMonth(date: Date = d): Date {
	// Return a new Date object with the first of the month selected
	return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * ### Get Date
 * - Returns the date with two digits
 * @param {number|Date} date The date to get date
 * @returns {string} The date with two digits
 */
export function getDate(date: number | Date = d): string {
	if (typeof date !== 'number') date = date.getDate()
	let formattedDate = date.toString()
	if (formattedDate.length === 1) formattedDate = `0${formattedDate}`
	return formattedDate
}

/**
 * ### Get Hours
 * - Returns the hours with two digits
 * @param {number|Date} hours The date to get hours
 * @returns {string} The hours with two digits
 */
export function getHours(hours: number | Date = d): string {
	if (typeof hours !== 'number') hours = hours.getHours()
	let formattedHours = hours.toString()
	if (formattedHours.length === 1) formattedHours = `0${formattedHours}`
	return formattedHours
}

/**
 * ### Get Hours in 12
 * - Returns the hour based on the specified 24 hour value in a 12 hour format
 * @param {number|Date} hour The hour to be converted to 12 hour format
 * @returns {number} The hour in a 12 hour format
 */
export function getHoursIn12(hour: number | Date = d): number {
	if (typeof hour !== 'number') hour = hour.getHours()
	if (hour > 12) return hour - 12
	return hour
}

/**
 * ### Get Meridian from Hour
 * - Returns either 'pm' or 'am' based on the specified 24 hour value
 * @param {number|Date} hour The hour to get the meridian from
 * @returns {'am'|'pm'} The meridian for the given hour
 */
export function getMeridianFromHour(hour: number | Date = d): 'am' | 'pm' {
	if (typeof hour !== 'number') hour = hour.getHours()
	if (hour >= 12) return 'pm'
	return 'am'
}

/**
 * ### Get Milliseconds
 * - Returns the milliseconds with two digits
 * @param {number|Date} milliseconds The date to get milliseconds
 * @returns {string} The milliseconds with two digits
 */
export function getMilliseconds(milliseconds: number | Date = d): string {
	if (typeof milliseconds !== 'number') milliseconds = milliseconds.getMilliseconds()
	let formattedMilliseconds = minutes.toString()
	if (formattedMilliseconds.length === 1) formattedMilliseconds = `0${formattedMilliseconds}`
	return formattedMilliseconds
}

/**
 * ### Get Minutes
 * - Returns the minutes with two digits
 * @param {number|Date} minutes The date to get minutes
 * @returns {string} The minutes with two digits
 */
export function getMinutes(minutes: number | Date = d): string {
	if (typeof minutes !== 'number') minutes = minutes.getMinutes()
	let formattedMinutes = minutes.toString()
	if (formattedMinutes.length === 1) formattedMinutes = `0${formattedMinutes}`
	return formattedMinutes
}

/**
 * ### Get Month
 * - Returns the month with two digits
 * @param {number|Date} month The date to get month
 * @returns {string} The month with two digits
 */
export function getMonth(month: number | Date = d): string {
	if (typeof month !== 'number') month = month.getMonth() + 1
	let formattedMonth = month.toString()
	if (formattedMonth.length === 1) formattedMonth = `0${formattedMonth}`
	return formattedMonth
}

export function getMonthIndexFromName(name: MonthName): number {
	return monthNamesList.findIndex(monthName => monthName === name)
}

/**
 * ### Get Month Name
 * - Returns the name of the specified month
 * @param {Date} date A Date object representing the month to get the name of the month from. (Preset to the current date)
 * @returns {MonthName} The name of the specified month
 */
export function getMonthName(date: number | Date = d): MonthName {
	if (typeof date === 'number') return monthNamesList[date]
	return monthNamesList[date.getMonth()]
}

/**
 * ### Get Next Month
 * - Returns the number of the following month from the specified month
 * @param {Date} date The Date object representing the month to get the following month from (Preset to current date)
 * @returns {number} The indexed month of the following month
 */
export function getNextMonth(date: Date = d): number {
	const givenMonth = date.getMonth() // Get the month from date
	// Return the indexed month. min 0, max 11
	return givenMonth === 11 ? 0 : givenMonth + 1
}

/**
 * ### Get Previous Month
 * - Returns the number of the previous month from the specified month
 * @param {Date} date The Date object representing the month to get the previous month from (Preset to current date)
 * @returns {number} The indexed month of the previous month
 */
export function getPreviousMonth(date: Date = d): number {
	const givenMonth = date.getMonth() // Get the month from date
	// Return the indexed month. min 0, max 11
	return givenMonth === 0 ? 11 : givenMonth - 1
}

/**
 * ### Get Seconds
 * - Returns the seconds with two digits
 * @param {number|Date} seconds The date to get seconds
 * @returns {string} The seconds with two digits
 */
export function getSeconds(seconds: number | Date = d): string {
	if (typeof seconds !== 'number') seconds = seconds.getSeconds()
	let formattedSeconds = seconds.toString()
	if (formattedSeconds.length === 1) formattedSeconds = `0${formattedSeconds}`
	return formattedSeconds
}

/**
 * ### Get User Readable Date
 * - Returns a string of the current date in a user-friendly way
 * - Includes `'Yesterday'`, '`Today'`, and `'Tomorrow'`
 * @param date (default: `new Date()`)
 * @returns {'Today'|'Tomorrow'|'Yesterday'|string} `'weekday, month day, year'` | `'Yesterday'` | `'Today'` | `'Tomorrow'`
 */
export function getUserReadableDate(date: Date = d): 'Today' | 'Tomorrow' | 'Yesterday' | string {
	const dateTime = date.getTime()

	const today = new Date(),
		isToday = dateTime === today.getTime()

	if (isToday) return 'Today'

	const yesterday = new Date(today.getDate() - 1),
		isYesterday = dateTime === yesterday.getTime()

	if (isYesterday) return 'Yesterday'

	const tomorrow = new Date(today.getDate() + 1),
		isTomorrow = dateTime === tomorrow.getTime()

	if (isTomorrow) return 'Tomorrow'

	const thisYear = today.getFullYear(),
		isSameYear = date.getFullYear() === thisYear

	const fullDateString = toFullDateString(date, {
		weekday: 'code',
		year: !isSameYear,
	})

	return fullDateString
}

/**
 * ### Get Weekday Name
 * - Returns the weekday name of the specified day
 * @param {number | Date} weekday A Date object or number representing the day to get the weekday name from. (Preset to the current date)
 * @returns {WeekdayName} The name of the specified weekday
 */
export function getWeekdayName(weekday: number | Date = d): WeekdayName {
	if (typeof weekday === 'number') return weekdayNamesList[weekday]
	// Return the name of the day of the week
	return weekdayNamesList[weekday.getDay()]
}

/**
 * ### Get Years in Range
 * - Returns an array of years in between the specified minimum and maximum years
 * @param {number} minYear The minimum year
 * @param {number} maxYear The maximum year
 * @returns {number[]} Array of years
 */
export function getYearsInRange(minYear: number = 0, maxYear: number = year): number[] {
	const yearList = []

	for (let selectedYear = minYear; selectedYear <= maxYear; selectedYear++) {
		yearList.push(selectedYear)
	}

	return yearList
}

/** Change how to display the weekday, month name, day of the month, and year. */
type ToFullDateStringOptionsProps = Partial<{
	/** Inclusion of the day of the month. (default: `true`) */
	day: boolean
	/** Inclusion of the month name. (default: `true`/`'full'`) */
	month: boolean | 'full' | 'code'
	/** Inclusion of the day of the week. (default: `true`/`'full'`) */
	weekday: boolean | 'full' | 'code'
	/** Inclusion of the year. (default: `true`) */
	year: boolean | 'full' | 'code'
}>

/**
 * ### To Full Date String
 * - Returns a formatted string to display the date
 * @param {Date} date (default: `new Date()`)
 * @param {ToFullDateStringOptionsProps} options Change how to display the weekday, month name, day of the month, and year.
 * @returns {string} '`weekday`, `month` `day`, `year`'
 */
export function toFullDateString(date: Date = d, options?: ToFullDateStringOptionsProps): string {
	let weekdayName: string = getWeekdayName(date),
		monthName: string = getMonthName(date),
		dayOfMonth: number | string = date.getDate(),
		year = date.getFullYear().toString()

	if (options) {
		const includesWeekday = options.weekday !== false,
			includesDay = options.day !== false,
			includesMonth = options.month !== false,
			includesYear = options.year !== false

		if (includesWeekday) {
			if (options.weekday === 'code') weekdayName = weekdayName.slice(0, 3)

			if (includesMonth || includesDay || includesYear) weekdayName += ', '
		} else {
			weekdayName = ''
		}

		if (includesMonth) {
			if (options.month === 'code') monthName = monthName.slice(0, 3)

			if (includesDay) monthName += ' '
		} else {
			monthName = ''
		}

		if (!includesDay) dayOfMonth = ''

		if (includesYear) {
			if (options.year === 'code') year = year.slice(-2)

			if (includesMonth || includesDay) year = ', ' + year
		} else {
			year = ''
		}
	}

	return weekdayName + monthName + dayOfMonth + year
}

/**
 * ### Get User Readable Date From Timestampz
 * - Returns a string of the current date in a user-friendly way
 * - Includes `'Yesterday'`, '`Today'`, and `'Tomorrow'`
 * @param string
 * @returns {'Today'|'Tomorrow'|'Yesterday'|string} `'weekday, month day, year'` | `'Yesterday'` | `'Today'` | `'Tomorrow'`
 */
export function getUserReadableDateFromTimestampz(timestampz: string): 'Today' | 'Tomorrow' | 'Yesterday' | string {
	const [date, time] = timestampz.split('T') || []

	const [year, month, day] = date?.split('-').map(string => Number(string)) || []

	const timezoneIsAheadOfUTC = time?.includes('+')

	const [hms, _timezone] = timezoneIsAheadOfUTC ? time?.split('+') : time?.split('-') || []

	const [hours, minutes, seconds] = hms?.split(':').map(string => Number(string)) || []

	// const [timezoneHours, timezoneMinutes] = timezone?.split(':').map(string => Number(string)) || []

	const dateAndTime = new Date(year, month - 1, day, hours, minutes, seconds),
		userReadableDateAndTime = getUserReadableDate(dateAndTime)

	return userReadableDateAndTime
}
