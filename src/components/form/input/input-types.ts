import { InputProps as HeadlessInputProps } from '@headlessui/react'
import { ChangeEvent, FocusEvent } from 'react'
import { DateMinMax, DateTimeMinMax, DateTimeUIOption, DateUIOption, TimeMinMax, TimeUIOption } from './date/'
import { PasswordOptions, PhoneOptions } from './text-input'
import { OneOf } from '../../../types'
import { MonthNumber, WeekNumber } from '../../../utils'
import { InputProps } from './index'

export type BaseInputComponentProps = Omit<HeadlessInputProps, 'type'> &
	InputTypeProps & {
		fieldContextID: string
		handleBlur: (props: OnBlurProps) => void
		handleChange: (props: OnChangeProps) => void
	}

export type InputType =
	| 'button'
	| 'checkbox'
	| 'color'
	| 'date'
	| 'datetime'
	| 'datetime-local'
	| 'email'
	| 'file'
	| 'hidden'
	| 'image'
	| 'list'
	| 'month'
	| 'number'
	| 'password'
	| 'radio'
	| 'range'
	| 'reset'
	| 'search'
	| 'submit'
	| 'tel'
	| 'text'
	| 'time'
	| 'url'
	| 'week'
	| 'year'

export type DateTimeTypeProps = {
	type: 'datetime' | 'datetime-local'
	min?: DateTimeMinMax
	max?: DateTimeMinMax
	options?: Partial<{
		ui: DateTimeUIOption
	}>
}

export type DateTypeProps = {
	type: 'date'
	min?: DateMinMax
	max?: DateMinMax
	options?: Partial<{
		ui: DateUIOption
	}>
}

export type MonthTypeProps = {
	type: 'month'
	min?: MonthNumber
	max?: MonthNumber
	options?: Partial<{
		ui: DateUIOption
	}>
}

export type NumberTypeProps = {
	type: 'number'
	max?: number
	min?: number
}

export type PasswordTypeProps = {
	type: 'password'
	options?: Partial<PasswordOptions>
}

export type PhoneTypeProps = {
	type: 'tel'
	options?: Partial<PhoneOptions>
}

export type TimeTypeProps = {
	type: 'time'
	min?: TimeMinMax
	max?: TimeMinMax
	options?: {
		ui: TimeUIOption
	}
}

export type WeekTypeProps = {
	type: 'week'
	min?: WeekNumber
	max?: WeekNumber
	options?: {
		ui: DateUIOption
	}
}

export type YearTypeProps = {
	type: 'year'
	min?: number
	max?: number
	options?: Partial<{
		ui: DateUIOption
	}>
}

export type InputTypeProps = OneOf<
	[
		DateTypeProps,
		DateTimeTypeProps,
		MonthTypeProps,
		NumberTypeProps,
		PasswordTypeProps,
		PhoneTypeProps,
		TimeTypeProps,
		WeekTypeProps,
		YearTypeProps,
		{
			type?: Exclude<
				InputType,
				'date' | 'datetime' | 'datetime-local' | 'month' | 'number' | 'password' | 'tel' | 'time' | 'week' | 'year'
			>
		},
	]
>

export type OnBlurProps = {
	e: FocusEvent<HTMLInputElement>
	format?: (value: string) => string | void
	validation?: ValidationHandler
}

export type OnChangeProps = {
	e: ChangeEvent<HTMLInputElement>
	validation?: ValidationHandler
}

export type ValidationCheckers = Partial<
	Pick<InputProps, 'max' | 'min' | 'maxLength' | 'minLength' | 'multiple' | 'pattern' | 'step'>
> & {
	value: string
}

export type ValidationHandler = (validationCheckers: ValidationCheckers) => string | string[] | void
