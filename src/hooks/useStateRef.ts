import {useCallback, useRef, useState, SetStateAction, Dispatch} from "react";

const isFunction = <S>(setStateAction: SetStateAction<S>): setStateAction is (prevState: S) => S => {
	return typeof setStateAction === "function";
};

type ReadOnlyRefObject<T> = {
	readonly current: T;
};

type UseStateRef = {
	<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, ReadOnlyRefObject<S>];
	<S = undefined>(): [S | undefined, Dispatch<SetStateAction<S | undefined>>, ReadOnlyRefObject<S | undefined>];
};

/*
 * Combine useState and useRef
 * example:
 * const [name, setName, nameRef] = useStateRef("");
 *
 * You can then use nameRef.current inside useCallback to get the latest value without
 *
 * Modified from https://github.com/Aminadav/react-useStateRef
 */
const useStateRef: UseStateRef = <S>(initialState?: S | (() => S)) => {
	const [state, setState] = useState(initialState);
	const ref = useRef(state);

	const dispatch: typeof setState = useCallback((setStateAction: S | undefined | ((prev: S | undefined) => S | undefined)) => {
		const newValue = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction;
		ref.current = newValue;
		setState(newValue);
	}, []);

	return [state, dispatch, ref];
};

export default useStateRef;
