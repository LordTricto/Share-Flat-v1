import {logout} from "../init.api";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

interface Response {
	handleLogout: () => void;
}

function useLogout(): Response {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = useCallback(() => {
		void logout();
		// dispatch(initReset());
		navigate("/login");
	}, [dispatch, navigate]);

	return {handleLogout};
}

export default useLogout;
