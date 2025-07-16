/**
 * # Format Phone Number
 * Converts any string containing at least 10 numbers to a formatted phone number
 * @param {string} phoneNumber
 * @param options
 * @property {string} `countryCode`
 * @property {'continuous' | 'dot' | 'hyphenated' | 'none' | 'space' | 'standard'} `format`
 *
 * Input: a555b555c5555d
 *
 * @example
 * format: 'continuous'
 * countryCode: '1'
 * returns: +1 5555555555
 *
 * @example
 * format: 'dot'
 * returns: 555.555.5555
 *
 * @example
 * format: 'hyphenated'
 * returns: 555-555-5555
 *
 * @example
 * format: 'none'
 * countryCode: '1'
 * returns: +1 a555b555c5555d
 *
 * @example
 * format: 'space'
 * returns: 555 555 5555
 *
 * @example
 * format: 'standard' (default)
 * returns: (555) 555-5555
 *
 * @returns {string} string formatted
 */
export function formatPhoneNumber(
	phoneNumber: string,
	options?: Partial<{
		countryCode: string
		format: 'continuous' | 'dot' | 'hyphenated' | 'none' | 'space' | 'standard'
	}>,
): string {
	const format = options?.format || 'standard'

	if (format !== 'none') phoneNumber = phoneNumber.replace(/\D/g, '').slice(-10)

	switch (format) {
		case 'dot':
			phoneNumber = phoneNumber
				.split('')
				.map((char, index) => {
					if (index === 2) return `${char}.`
					if (index === 5) return `${char}.`
					return char
				})
				.join('')
			break
		case 'hyphenated':
			phoneNumber = phoneNumber
				.split('')
				.map((char, index) => {
					if (index === 2) return `${char}-`
					if (index === 5) return `${char}-`
					return char
				})
				.join('')
			break
		case 'space':
			phoneNumber = phoneNumber
				.split('')
				.map((char, index) => {
					if (index === 2) return `${char} `
					if (index === 5) return `${char} `
					return char
				})
				.join('')
			break
		case 'standard':
			phoneNumber = phoneNumber
				.split('')
				.map((char, index) => {
					if (index === 0) return `(${char}`
					if (index === 2) return `${char}) `
					if (index === 5) return `${char}-`
					return char
				})
				.join('')
	}

	return `${options?.countryCode ? `+${options?.countryCode} ` : ''}` + phoneNumber
}

/**
 * # To Lower Case
 * Converts a string to lowercase, and offers easy string replacements for creating snake case, kebab case, or your own.
 * @param str - The string to convert to lowercase.
 * @param options - Configuration options.
 * @param options[0] - The delimiter to split the string. Defaults to space.
 * @param options[1] - The string to join the parts back together. Defaults to space.
 * @returns The lowercase version of the input string, with the replacements, if provided.
 */
export function toLowerCase(str: string, [delimiter, joiner]: [string | undefined, string | undefined]) {
	return str.toLowerCase().replaceAll(delimiter || ' ', joiner || ' ')
}
