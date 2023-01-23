import {MutableRefObject, useRef} from "react";

function useElementFocus<T extends HTMLElement = HTMLInputElement>(): [MutableRefObject<T | null>, () => void] {
	const domNode = useRef<T | null>(null);

	const focus = (): void => {
		if (domNode.current) {
			domNode.current.focus();
		}
	};

	return [domNode, focus];
}

export default useElementFocus;
