const abortControllers: Map<string, AbortController> = new Map<string, AbortController>();

export function abortRequest(key: string): void {
	// abort and delete the controller
	const controller = abortControllers.get(key);
	if (controller) {
		controller.abort();
		abortControllers.delete(key);
	}
}

export function getAbortControllerSignal(key: string): AbortSignal {
	// abort, in case there is already controller with the key
	abortRequest(key);

	// create and set a new controller
	const controller = new AbortController();
	abortControllers.set(key, controller);

	return controller.signal;
}
