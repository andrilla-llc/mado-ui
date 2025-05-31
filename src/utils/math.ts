export function easeOutExpo(time: number, start: number, end: number, duration: number) {
	return time == duration ? start + end : end * (-Math.pow(2, (-10 * time) / duration) + 1) + start
}
