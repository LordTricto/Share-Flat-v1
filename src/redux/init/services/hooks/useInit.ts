import {useEffect, useState} from "react";

function useInit(): {isAppReady: boolean} {
	// function useInit(): {isAppReady: boolean; handleMainInit: () => void} {
	// const dispatch = useDispatch();
	// const location = useLocation();

	const [isAppReady, setIsAppReady] = useState<boolean>(false);

	useEffect(() => {
		setIsAppReady(true);
	}, []);

	// const handleMainInit = useCallback(async () => {
	// dispatch(mainInitRequest());
	// try {
	// const res = await mainInit();
	// dispatch(mainInitSuccess(res));
	// setupWebsocket(res);
	// setIsAppReady(true);
	// } catch (err) {
	// const errorMessage = getErrorMessage(err);
	// dispatch(mainInitFailure(errorMessage));
	// }
	// }, [dispatch]);

	// const setupWebsocket = useCallback((res: MainInitState) => {
	// const socket = SocketWrapper.setup(res.socket.url, res.socket.secure, res.socket.token);
	// registerEventHandlers(socket);
	// }, []);

	return {isAppReady};
}

export default useInit;
