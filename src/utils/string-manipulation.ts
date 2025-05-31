/**
 * # Format Phone Number
 * Converts any string containing at least 10 numbers to a formatted phone number
 * @param {string} string
 * @returns {string} string formatted (000) 000-0000
 */
export function formatPhoneNumber(string: string, countryCode?: string): string {
	return (
		`${countryCode ? `+${countryCode} ` : ''}` +
		string
			.replace(/\D/g, '')
			.slice(-10)
			.split('')
			.map((char, index) => {
				if (index === 0) return `(${char}`
				if (index === 2) return `${char}) `
				if (index === 5) return `${char}-`
				return char
			})
			.join('')
	)
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
