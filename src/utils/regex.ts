export const emailRegex =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * # Is Email
 * Checks whether the specified string is in email format
 */
export function isEmail(email: string) {
	return emailRegex.test(email)
}

export const telRegex =
	/(?:\+1\s|1\s|)?\d{3}\.\d{3}\.\d{4}|(?:\+1\s|1\s|)?\d{3}-\d{3}-\d{4}|(?:\+1\s|1\s|)?\(\d{3}\) \d{3}-\d{4}|(?:\+1\s|1\s|\+1|1|)?\d{10}/

/**
 * # Is Phone Number
 * Checks whether the specified string is in phone number format
 */
export function isPhoneNumber(tel: string) {
	return telRegex.test(tel)
}
