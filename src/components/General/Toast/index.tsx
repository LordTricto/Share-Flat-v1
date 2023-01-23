import React, {useEffect, useState} from "react";
import {ToastItem, ToastType} from "../ToastContainer";

import {ReactComponent as Error} from "../../../assets/svg/general/toast/error/icon.svg";
import {ReactComponent as ErrorCancel} from "../../../assets/svg/general/toast/error/cancel.svg";
import {ReactComponent as Info} from "../../../assets/svg/general/toast/info/icon.svg";
import {ReactComponent as InfoCancel} from "../../../assets/svg/general/toast/info/cancel.svg";
import {ReactComponent as Success} from "../../../assets/svg/general/toast/success/icon.svg";
import {ReactComponent as SuccessCancel} from "../../../assets/svg/general/toast/success/cancel.svg";
import {ReactComponent as Warning} from "../../../assets/svg/general/toast/warning/icon.svg";
import {ReactComponent as WarningCancel} from "../../../assets/svg/general/toast/warning/cancel.svg";
import {useDispatch} from "react-redux";

interface ToastProps {
	data: ToastItem;
}

function Toast({data}: ToastProps): JSX.Element {
	const [displayToast, setDisplayToast] = useState(false);
	const [remove, setRemove] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			setDisplayToast(true);
		}, 100);
	}, []);

	// Remove error in a second and a half
	useEffect(() => {
		if (!displayToast) return;
		const timeOut = setTimeout(() => {
			setDisplayToast(false);
		}, 5000);
		return () => {
			clearTimeout(timeOut);
		};
	}, [displayToast]);

	useEffect(() => {
		if (remove) return;
		const timeOut = setTimeout(() => {
			setRemove(true);
		}, 5500);
		return () => {
			clearTimeout(timeOut);
		};
	}, [dispatch, remove]);

	return (
		<div
			className={`flex flex-row justify-start 2xs:justify-center space-x-4 items-start text-center rounded-lg px-4 py-4 2xs:py-2 mb-4 max-w-sm w-full 2xs:w-max transform transition-all duration-700 ${
				data.type === ToastType.ERROR
					? " bg-error-backdrop text-error"
					: data.type === ToastType.INFORMATION
					? "bg-info-backdrop text-info"
					: data.type === ToastType.WARNING
					? "bg-warning-backdrop text-warning"
					: "bg-success-backdrop text-success"
			} ${displayToast ? "opacity-100 translate-x-0 pointer-events-auto" : " opacity-0 translate-x-12 pointer-events-none "} 
			${remove ? "hidden " : ""}
			`}
			data-type="transaction"
		>
			<div className="rounded-full flex justify-center items-center" data-type="transaction">
				<span data-type="transaction">
					{data.type === ToastType.ERROR ? (
						<Error data-type="transaction" />
					) : data.type === ToastType.INFORMATION ? (
						<Info data-type="transaction" />
					) : data.type === ToastType.WARNING ? (
						<Warning data-type="transaction" />
					) : (
						<Success data-type="transaction" />
					)}
				</span>
			</div>
			<div className="text-sm text-left font-normal  pointer-events-none " data-type="transaction">
				{data.message}
			</div>{" "}
			<span
				className="cursor-pointer hidden 2xs:flex justify-center items-center w-5 h-5"
				onClick={() => {
					setDisplayToast(false);
				}}
				data-type="transaction"
			>
				{data.type === ToastType.ERROR ? (
					<ErrorCancel data-type="transaction" />
				) : data.type === ToastType.INFORMATION ? (
					<InfoCancel data-type="transaction" />
				) : data.type === ToastType.WARNING ? (
					<WarningCancel data-type="transaction" />
				) : (
					<SuccessCancel data-type="transaction" />
				)}
			</span>
			<span
				className="absolute top-0 right-4 h-full w-max 2xs:hidden 2xs:pointer-events-none cursor-pointer flex justify-center items-center"
				onClick={() => {
					setDisplayToast(false);
				}}
				data-type="transaction"
			>
				<div className="flex justify-center items-center w-5 h-5">
					{data.type === ToastType.ERROR ? (
						<ErrorCancel data-type="transaction" />
					) : data.type === ToastType.INFORMATION ? (
						<InfoCancel data-type="transaction" />
					) : data.type === ToastType.WARNING ? (
						<WarningCancel data-type="transaction" />
					) : (
						<SuccessCancel data-type="transaction" />
					)}
				</div>
			</span>
		</div>
	);
}

export default Toast;
