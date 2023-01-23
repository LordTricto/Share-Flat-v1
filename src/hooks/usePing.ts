import {useCallback, useEffect, useRef} from "react";

// import {KEEP_ALIVE_PING} from "../helpers/AppConstants";
import {useDispatch} from "react-redux";

interface UsePing {
	initPing: () => void;
}

function usePing(): UsePing {
	const dispatch = useDispatch();

	const intervalRef = useRef<ReturnType<typeof setInterval>>();
	// const backUpRef = useRef<ReturnType<typeof setInterval>>();

	const pingHandler = useCallback(() => {
		// do not logout, if the ping fails. Instead let the idle timeout log the user out
		// void ping();
	}, [dispatch]);

	const initPing = useCallback(() => {
		pingHandler();
		intervalRef.current = setInterval(pingHandler, 60 * 1000);
	}, [pingHandler]);

	// clear interval on unmount
	useEffect(() => {
		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, []);

	return {initPing};
}

export default usePing;
