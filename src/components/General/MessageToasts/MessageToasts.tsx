import {ReactComponent as Error} from "../../../assets/svg/general/toast/error/icon.svg";
import {ReactComponent as Info} from "../../../assets/svg/general/toast/info/icon.svg";
import React from "react";
import {ReactComponent as Success} from "../../../assets/svg/general/toast/success/icon.svg";
import {ToastType} from "../../../helpers/AppConstants";
import {ReactComponent as Warning} from "../../../assets/svg/general/toast/warning/icon.svg";

interface MessageToastsProps {
	toastType: ToastType;
	className?: string;
	toastMessage: string | React.ReactNode;

	onClick?: () => void;
}

function MessageToasts({toastMessage, toastType, className, onClick = undefined}: MessageToastsProps): JSX.Element {
	return (
		<div
			className={
				`flex flex-row justify-start space-x-4 items-start text-center rounded-lg px-4 py-2 w-full transform transition-all duration-700 opacity-100 ` +
				`${toastType === ToastType.ERROR ? "bg-error-backdrop text-error" : ""} ` +
				`${toastType === ToastType.INFORMATION ? "bg-info-backdrop text-info" : ""} ` +
				`${toastType === ToastType.WARNING ? "bg-warning-backdrop text-warning" : ""} ` +
				`${toastType === ToastType.SUCCESS_TOAST ? "bg-success-backdrop text-success" : ""} ` +
				`${className || ""} `
			}
		>
			<div className="rounded-full flex justify-center items-center" onClick={onClick}>
				<span>
					{toastType === ToastType.ERROR && <Error />}
					{toastType === ToastType.INFORMATION && <Info />}
					{toastType === ToastType.WARNING && <Warning />}
					{toastType === ToastType.SUCCESS_TOAST && <Success />}
				</span>
			</div>
			<div className="text-sm text-left font-normal pointer-events-none flex justify-center items-center whitespace-normal">{toastMessage}</div>{" "}
		</div>
	);
}

export default MessageToasts;
