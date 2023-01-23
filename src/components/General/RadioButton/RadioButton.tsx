import React, {useEffect, useState} from "react";

import {ReactComponent as Filled} from "../../../assets/svg/radio/radio-filled.svg";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";

interface Props {
	text?: React.ReactNode;
	id: string;
	readOnly?: boolean;
	checked?: boolean;
	func?: () => void;
	size?: "sm" | "md";
}

function RadioButton(props: Props): JSX.Element {
	const [isChecked, setIsChecked] = useState<boolean>(false);

	useEffect(() => {
		if (isNullOrUndefined(props.checked)) return;
		setIsChecked(props.checked);
	}, [props.checked]);

	const handleClick = () => {
		setIsChecked((prev) => !prev);
		props.func && props.func();
	};

	return (
		<>
			<div
				className={`flex flex-row justify-start items-center ` + `${props.readOnly ? "pointer-events-none" : "cursor-pointer"} `}
				onClick={handleClick}
				data-type="transaction"
			>
				<div data-type="transaction">
					<div
						className={
							`relative flex justify-center items-center border border-solid border-black-tertiary rounded-full transition-all duration-150 ` +
							`${props.size === "sm" ? "h-4 w-4" : "h-5 w-5"} ` +
							`${isChecked ? "bg-white border-blue" : ""} ` +
							`${props.readOnly ? "border-black-quin" : ""} `
						}
						data-type="transaction"
					>
						<input
							className="hidden absolute h-full w-full top-0 left-0 placeholder-transparent focus:outline-none outline-none"
							checked={isChecked}
							type={"checkbox"}
							id={props.id}
							readOnly
							data-type="transaction"
						/>
						<Filled
							className={
								`fill-current ` +
								`${isChecked ? "opacity-100" : "opacity-0"} ` +
								`${props.size === "sm" ? "w-2.5" : "w-3.5"} ` +
								`${props.readOnly && isChecked ? "text-blue" : ""} ` +
								`${!props.readOnly && isChecked ? "text-blue" : ""} ` +
								`${props.readOnly && !isChecked ? "" : ""} ` +
								`${!props.readOnly && !isChecked ? "" : ""}`
							}
							data-type="transaction"
						/>
					</div>
				</div>

				<div
					className={
						` pl-2 leading-none max-w-full ` +
						`${props.readOnly ? "text-black-tertiary" : " text-black-secondary"} ` +
						`${props.size === "sm" ? "text-sm" : "text-base"} `
					}
					data-type="transaction"
				>
					{props.text || ""}
				</div>
			</div>
		</>
	);
}

export default RadioButton;
