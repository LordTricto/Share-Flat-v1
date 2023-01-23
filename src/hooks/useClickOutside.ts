import {MutableRefObject, useEffect, useRef} from "react";

type additionalCheckFn = (eventTarget: HTMLElement) => boolean;

function useClickOutside<T extends HTMLElement = HTMLDivElement>(
	handler: () => void,
	additionalCheck: additionalCheckFn | undefined = undefined,
	events: Array<keyof DocumentEventMap> = ["mousedown", "keydown"]
): MutableRefObject<T | null> {
	const domNode = useRef<T | null>(null);

	useEffect(() => {
		const maybeHandler = (event: Event | MouseEvent | KeyboardEvent) => {
			if (event instanceof MouseEvent) {
				const target: Node | null = event.target as Node | null;
				if (!domNode.current || !target) {
					return;
				}
				if (domNode.current && target && !domNode.current.contains(target) && (!additionalCheck || additionalCheck(target as HTMLElement))) {
					handler();
				}
			}
			if (event instanceof KeyboardEvent) {
				if (event.key === "Escape") {
					handler();
				}
				if (event.key !== "Escape") {
					return;
				}
			}
		};

		for (const event of events) {
			document.addEventListener(event, maybeHandler);
		}

		return () => {
			for (const event of events) {
				document.removeEventListener(event, maybeHandler);
			}
		};
	});

	return domNode;
}

export default useClickOutside;
