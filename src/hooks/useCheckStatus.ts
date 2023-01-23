import {useEffect, useRef} from "react";

export default function useCheckStatus(): void {
	// const dispatch = useDispatch();
	const pollingRef = useRef<ReturnType<typeof setInterval> | null>();
	useEffect(() => {
		// if (!transaction || transaction.status !== PROCESSING)
		// return () => {
		// if (pollingRef.current) {
		// clearInterval(pollingRef.current);
		// }
		// };

		pollingRef.current = setInterval(() => {
			// void handleGetTransaction();
		}, 10000);
		return () => {
			if (pollingRef.current) {
				clearInterval(pollingRef.current);
			}
		};
	}, []);
}
