export function isVisible(element: HTMLElement, partial = false): boolean {
	const rect = element.getBoundingClientRect();

	const win = {
		height: window.innerHeight || document.documentElement.clientHeight,
		width: window.innerWidth || document.documentElement.clientWidth,
	};

	if (!partial) {
		return rect.top >= 0 && rect.left >= 0 && rect.bottom <= win.height && rect.right <= win.width;
	}

	return (
		rect.right - rect.left > 0 &&
		rect.bottom - rect.top > 0 &&
		((rect.left <= 0 && rect.right > 0) || (rect.left > 0 && rect.left < win.width)) &&
		((rect.top <= 0 && rect.bottom > 0) || (rect.top > 0 && rect.top < win.height))
	);
}

export function getMetaValue(metaName: string, defaultValue = ""): string {
	const metaElement = document.querySelector(`meta[name="${metaName}"]`) as HTMLMetaElement;
	return !!metaElement && !!metaElement.content ? metaElement.content : defaultValue;
}

// MIT http://rem.mit-license.org
export function cropCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
	const context = canvas.getContext("2d");
	if (!context) {
		return canvas;
	}
	const copy = document.createElement("canvas").getContext("2d");
	if (!copy) {
		return canvas;
	}
	const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
	const {length} = pixels.data;
	const bounds = {
		top: null as number | null,
		left: null as number | null,
		right: null as number | null,
		bottom: null as number | null,
	};
	let x;
	let y;

	// Iterate over every pixel to find the highest
	// and where it ends on every axis ()
	for (let i = 0; i < length; i += 4) {
		if (pixels.data[i + 3] !== 0) {
			x = (i / 4) % canvas.width;
			y = ~~(i / 4 / canvas.width);

			if (bounds.top === null) {
				bounds.top = y;
			}

			if (bounds.left === null) {
				bounds.left = x;
			} else if (x < bounds.left) {
				bounds.left = x;
			}

			if (bounds.right === null) {
				bounds.right = x;
			} else if (bounds.right < x) {
				bounds.right = x;
			}

			if (bounds.bottom === null) {
				bounds.bottom = y;
			} else if (bounds.bottom < y) {
				bounds.bottom = y;
			}
		}
	}

	if (!bounds.bottom || !bounds.top || !bounds.right || !bounds.left) {
		return canvas;
	}

	// Calculate the height and width of the content
	const trimHeight = bounds.bottom - bounds.top;
	const trimWidth = bounds.right - bounds.left;
	const trimmed = context.getImageData(bounds.left, bounds.top, trimWidth, trimHeight);

	copy.canvas.width = trimWidth;
	copy.canvas.height = trimHeight;
	copy.putImageData(trimmed, 0, 0);

	// Return trimmed canvas
	return copy.canvas;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getPropsFromAttribute(elementSelector: string, attributeName = "data-props"): any {
	let props = {};
	const appElement = document.querySelector(elementSelector);
	if (!!appElement && appElement.hasAttribute(attributeName)) {
		try {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			props = JSON.parse(String(appElement.getAttribute(attributeName)));
		} catch (e) {
			// console.error(e);
		}
	}
	return props;
}

export function hasClass(element: HTMLElement, className: string): boolean {
	if (element.classList) {
		return element.classList.contains(className);
	}

	return element.className.split(" ").indexOf(className) > -1;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function scrollIntoView(element: HTMLElement, ignoreIfPartial = false, offset = 0) {
	try {
		if (!!element && !isVisible(element, ignoreIfPartial)) {
			if (offset === 0) {
				element.scrollIntoView();
			} else {
				const elementPosition = element.getBoundingClientRect().top;
				const offsetPosition = elementPosition + offset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		}
	} catch (err) {
		// todo -> log to server
		// console.error(err);
	}
}

function fallbackCopyTextToClipboard(text: string): boolean {
	const textArea: HTMLTextAreaElement = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "200%";
	textArea.style.left = "200%";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);

	textArea.focus();
	textArea.select();
	textArea.setSelectionRange(0, text.length);

	let res: boolean;
	try {
		res = document.execCommand("copy");
	} catch (err) {
		res = false;
	} finally {
		document.body.removeChild(textArea);
	}
	return res;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
	if (!navigator.clipboard) {
		return fallbackCopyTextToClipboard(text);
	}
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		return false;
	}
}
