export default class Window {
	static set(key: string, value: unknown): void {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window[key] = value;
	}

	static get(key: string): unknown {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return window[key];
	}
}
