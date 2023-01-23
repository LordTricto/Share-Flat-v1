import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useLocation} from "react-router";

import {ErrorMessage} from "../../../helpers/request/makeRequest";
import {IRootState} from "../../../redux/rootReducer";
import {RequestCancelledError} from "../../../helpers/request/requestErrors";
import {Routes} from "../../../routes/routes.constants";
import Toast from "../Toast";
import {errorFalse} from "../../../redux/error/slice/errorSlice";
import {messageFalse} from "../../../redux/message/slice/messageSlice";
import useLogout from "../../../redux/init/services/hooks/useLogout";

export enum ToastType {
	ERROR = "error",
	MESSAGE = "message",
	INFORMATION = "information",
	WARNING = "warning",
}

export interface ToastItem {
	type: ToastType;
	message: string;
	index: number;
}

function ToastContainer(): JSX.Element {
	const location = useLocation();
	const navigate = useNavigate();
	const {handleLogout} = useLogout();
	const dispatch = useDispatch();
	const error = useSelector((state: IRootState) => state.error.error);
	const message = useSelector((state: IRootState) => state.message.message);
	const isLoggedIn = useSelector((state: IRootState) => state.init.isLoggedIn);
	const [toastList, setToastList] = useState<ToastItem[]>([]);

	useEffect(() => {
		setToastList([]);
		dispatch(messageFalse());
		dispatch(errorFalse());
	}, [location]);

	useEffect(() => {
		if (!message) return;
		const toastItem = {type: message.type, index: message.index, message: message.message as string};
		setToastList((prev) => [...prev, toastItem]);
	}, [message]);

	useEffect(() => {
		if (!error) return;
		// logs user out if they unauthorized
		if (error.message === ErrorMessage.UNAUTHORIZED_ERROR && isLoggedIn) {
			console.log("Unauthorized");
			return handleLogout();
		}
		if (error.message === ErrorMessage.ACCOUNT_CREATED_ERROR) {
			return navigate(Routes.DASHBOARD);
		}
		// does nothing if error is a cancel message
		if (error.message === ErrorMessage.AXIOS_CANCEL_ERROR || error instanceof RequestCancelledError) {
			return;
		}
		const toastItem = {type: ToastType.ERROR, index: error.index, message: error.message as string};
		setToastList((prev) => [...prev, toastItem]);
	}, [error, isLoggedIn]);

	useEffect(() => {
		return () => {
			dispatch(messageFalse());
			dispatch(errorFalse());
		};
	}, []);

	return (
		<>
			<div className="fixed bottom-2 2xs:bottom-unset 2xs:top-10 w-full 2xs:w-max 2xs:right-10 z-80 px-2 2xs:px-0 flex flex-col justify-end 2xs:justify-start items-center 2xs:items-end">
				{toastList.map((_item, index) => (
					<Toast data={_item} key={index} />
				))}
			</div>
		</>
	);
}

export default ToastContainer;
