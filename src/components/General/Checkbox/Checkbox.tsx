import React, {useEffect, useState} from "react";

import {ReactComponent as Check} from "../../../assets/svg/check/checkbox-check.svg";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";

interface Props {
	text?: React.ReactNode;
	id: string;
	truncate?: boolean;
	readOnly?: boolean;
	checked?: boolean;
	func?: () => void;
	size?: "sm" | "md";
}

function Checkbox(props: Props): JSX.Element {
	const [isChecked, setIsChecked] = useState<boolean>(false);
	const {truncate = false} = props;

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
				className={`flex flex-row justify-start items-start ` + `${props.readOnly ? "pointer-events-none" : "cursor-pointer"} `}
				onClick={handleClick}
				data-type="transaction"
			>
				<div data-type="transaction">
					<div
						className={
							`relative flex justify-center items-center border border-solid border-black-tertiary rounded-md transition-all duration-150 ` +
							`${props.size === "sm" ? "h-4 w-4" : "h-5 w-5"} ` +
							`${isChecked ? "bg-blue border-blue" : ""} ` +
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
						<Check
							className={
								`fill-current ` +
								`${isChecked ? "opacity-100" : "opacity-0"} ` +
								`${props.size === "sm" ? "w-2.5" : "w-3"} ` +
								`${props.readOnly && isChecked ? "text-grey-tertiary" : ""} ` +
								`${!props.readOnly && isChecked ? "text-white" : ""} ` +
								`${props.readOnly && !isChecked ? "" : ""} ` +
								`${!props.readOnly && !isChecked ? "" : ""}`
							}
							data-type="transaction"
						/>
					</div>
				</div>

				<div
					className={
						`pl-2 pointer-events-none w-fit max-w-full ` +
						`${truncate ? "leading-none overflow-ellipsis overflow-hidden whitespace-nowrap" : "leading-4"} ` +
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

export default Checkbox;
