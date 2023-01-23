import {DropdownItem, DropdownItemValueType} from "../../../helpers/types";
import React, {ReactNode} from "react";

import DropdownLink from "./DropdownComponents/DropdownLink";
import LabelDropdownHead from "./LabelDropdownComponent/LabelDropdownHead";

interface Props<T extends DropdownItemValueType> {
	big?: boolean;
	size?: "sm" | "md" | "lg";
	value: T | undefined;
	options: Array<DropdownItem<T>>;
	fitHeight?: boolean;
	canCancel?: boolean;
	isDisabled?: boolean;
	placeholder?: ReactNode;

	onSelect: (value: T | undefined) => void;
	onCancel?: () => void;
	clickOutsideFunc?: () => void;
}

function CustomSelect<T extends DropdownItemValueType>({
	big = false,
	value,
	options,
	canCancel = false,
	fitHeight = false,
	isDisabled = false,
	placeholder = "",
	size = "lg",
	onSelect,
	onCancel = undefined,
	clickOutsideFunc = undefined,
}: Props<T>): JSX.Element {
	return (
		<LabelDropdownHead
			placeholder={placeholder}
			isCancel={canCancel}
			cancelFunc={() => {
				if (onCancel) {
					onCancel();
				}
			}}
			inputValue={options.find((item) => item.value === value)?.text || ""}
			clickOutsideFunc={clickOutsideFunc}
			isDisabled={isDisabled}
			fitHeight={fitHeight}
			size={size}
			clickAndClose
		>
			{options &&
				options.map((option, index) => (
					<DropdownLink key={index} onClick={() => onSelect(option.value)} big={big} fitHeight={fitHeight}>
						<div
							className={
								"flex flex-col justify-start text-black items-start space-y-0.5 px-4 py-2 w-full " +
								`${option.value === value ? "pointer-events-none" : ""} `
							}
							data-type="dropdown"
						>
							<span className="text-sm capitalize text-black-secondary" data-type="dropdown">
								{option.text}
							</span>
							{option.subtext && (
								<p
									className="inline text-xs justify-center text-black-tertiary break-words whitespace-pre-wrap text-left"
									data-type="dropdown"
								>
									{option.subtext}
								</p>
							)}
						</div>
					</DropdownLink>
				))}
		</LabelDropdownHead>
	);
}

export default CustomSelect;
