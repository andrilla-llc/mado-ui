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
		countryCode: string;
		format: "continuous" | "dot" | "hyphenated" | "none" | "space" | "standard";
	}>,
): string {
	const format = options?.format || "standard";

	if (format !== "none") {
		phoneNumber = phoneNumber.replace(/\D/g, "").slice(-10);
	}

	switch (format) {
		case "dot":
			phoneNumber = phoneNumber
				.split("")
				.map((char, index) => {
					if (index === 2) return `${char}.`;
					if (index === 5) return `${char}.`;
					return char;
				})
				.join("");
			break;
		case "hyphenated":
			phoneNumber = phoneNumber
				.split("")
				.map((char, index) => {
					if (index === 2) return `${char}-`;
					if (index === 5) return `${char}-`;
					return char;
				})
				.join("");
			break;
		case "space":
			phoneNumber = phoneNumber
				.split("")
				.map((char, index) => {
					if (index === 2) return `${char} `;
					if (index === 5) return `${char} `;
					return char;
				})
				.join("");
			break;
		case "standard":
			phoneNumber = phoneNumber
				.split("")
				.map((char, index) => {
					if (index === 0) return `(${char}`;
					if (index === 2) return `${char}) `;
					if (index === 5) return `${char}-`;
					return char;
				})
				.join("");
	}

	return `${options?.countryCode ? `+${options?.countryCode} ` : ""}` +
		phoneNumber;
}

/**
 * ### Split Camel Case
 * - Separates a camel case string with a joiner (default: ' ')
 * @param {string} string
 * @returns {string} string
 */
export function splitCamelCase(string: string, joiner: string = " "): string {
	if (string[0].match(/[A-Z0-9]/) || string.includes(" ")) return string;

	let lastChar = "";

	return string.split("")
		.map((char) => {
			let returnedString = char;

			if (char.match(/[A-Z0-9]/)) returnedString = ` ${char}`;

			if (lastChar.match(/[0-9]/) && char.match(/[0-9]/)) returnedString = char;

			lastChar = char;
			return returnedString;
		})
		.join(joiner);
}

/**
 * ### To Camel Case
 * - Converts any string to camel case based on spaces
 * - Eliminates no letter-number characters
 * @param {string} string
 * @returns {string} string
 */
export function toCamelCase(string: string, delimiter: string = " "): string {
	if (typeof string !== "string") return string;

	return string
		.toLowerCase()
		.replace(/[^a-z0-9]/gi, delimiter)
		.split(delimiter)
		.map((str: string, index: number) =>
			index === 0 ? str : str.substring(0, 1).toUpperCase() +
				str.substring(1, str.length).toLowerCase()
		)
		.join("");
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
export function toLowerCase(
	str: string,
	[delimiter, joiner]: [string | undefined, string | undefined],
) {
	return str.toLowerCase().replaceAll(delimiter || " ", joiner || " ");
}

/**
 * ### To Title Case
 * - Converts any string to title case based on spaces
 * @param {string} string
 * @returns {string} string
 */
export function toTitleCase(string: string, delimiter: string = " "): string {
	if (typeof string !== "string") return string;

	return string
		.toLowerCase()
		.split(delimiter)
		.map((str) =>
			str.substring(0, 1).toUpperCase() +
			str.substring(1, str.length).toLowerCase()
		)
		.join(" ");
}
