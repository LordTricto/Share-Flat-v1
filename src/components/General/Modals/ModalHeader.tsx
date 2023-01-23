import {ReactComponent as Error} from "../../../assets/svg/general/toast/error/icon.svg";
import {ReactComponent as GrayCloseIcon} from "../../../assets/svg/cancel/close.svg";
import {ReactComponent as Info} from "../../../assets/svg/general/toast/info/icon.svg";
import React from "react";
import {ReactComponent as Success} from "../../../assets/svg/general/toast/success/icon.svg";
import {ToastType} from "../../../helpers/AppConstants";
import {ReactComponent as Warning} from "../../../assets/svg/general/toast/warning/icon.svg";

interface Props {
	children: React.ReactNode;
	headingType?: ToastType;
	subTitle?: string;
	toggler: () => void;
	dataType?: string | null;
}

function ModalHeader(props: Props): JSX.Element {
	return (
		<>
			<div className="flex items-center justify-between font-medium w-full p-8 relative space-x-2" data-type={props.dataType && props.dataType}>
				<div data-type={props.dataType && props.dataType}>
					<div
						className="flex flex-row justify-start items-start text-black text-lg space-x-2"
						data-type={props.dataType && props.dataType}
					>
						{props.headingType && (
							<p data-type={props.dataType && props.dataType}>
								{props.headingType === ToastType.ERROR && <Error data-type={props.dataType && props.dataType} />}
								{props.headingType === ToastType.INFORMATION && <Info data-type={props.dataType && props.dataType} />}
								{props.headingType === ToastType.WARNING && <Warning data-type={props.dataType && props.dataType} />}
								{props.headingType === ToastType.SUCCESS_TOAST && <Success data-type={props.dataType && props.dataType} />}
							</p>
						)}

						<p className="leading-none" data-type={props.dataType && props.dataType}>
							{props.children}
						</p>
					</div>
					<p className="text-sm text-left font-normal text-black-tertiary pt-2" data-type={props.dataType && props.dataType}>
						{props.subTitle}
					</p>
				</div>
				<div className="h-8 w-8" data-type={props.dataType && props.dataType}></div>
				<button
					className="absolute top-7 right-5.5 outline-none focus:outline-none rounded-full h-8 w-8 flex justify-center items-center hover:bg-blue-senary transition-all bg-opacity-0 hover:bg-opacity-100"
					onClick={props.toggler}
					data-type={props.dataType && props.dataType}
				>
					<GrayCloseIcon className="stroke-current text-black-tertiary h-3.5 w-3.5" data-type={props.dataType && props.dataType} />
				</button>
			</div>
		</>
	);
}

export default ModalHeader;
