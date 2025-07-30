import { ComponentPropsWithRef } from "react";

export function RectangleFill(props: Omit<ComponentPropsWithRef<'svg'>, 'viewBox'>) {
	return (
		<svg viewBox="0 0 64 50" {...props}>
		  <path d="M8.518,49.999L55.482,49.999C61.172,49.999 64,47.159 64,41.567L64,8.432C64,2.84 61.172,-0 55.482,-0L8.518,-0C2.857,-0 -0,2.828 -0,8.432L-0,41.567C-0,47.171 2.857,49.999 8.518,49.999Z"/>
		</svg>
	)
}
