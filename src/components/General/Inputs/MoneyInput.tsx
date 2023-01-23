import {ExcludeProps, InputPropsToExclude} from "./types";
import React, {InputHTMLAttributes, ReactNode, useEffect, useState} from "react";

import Input from "./Input";
import formatNumber from "../../../utils/formatNumber";
import isNullOrUndefined from "../../../utils/isNullOrUndefined";
import {useMoneyToNumber} from "../../../hooks/useMoneyToNumber";

interface Props extends ExcludeProps<InputHTMLAttributes<HTMLInputElement>, InputPropsToExclude> {
	type?: "number" | "string";
	icon?: ReactNode;
	value?: string | undefined;
	iconType?: string;
	inputSize?: "sm" | "md" | "lg";
	isFocused?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	helperText?: React.ReactNode;
	placeholder?: ReactNode;
	alwaysActive?: boolean;
	mobileHelperText?: boolean;
	onChange(amount: string | number): void;
}

function removeNonNumericChars(string: string | number): string {
	return String(string).replace(new RegExp(`[^0-9.]`, "gi"), "");
}

function parse(newValue: string): [number, string] {
	const prepared = removeNonNumericChars(newValue);
	let num = Number(prepared);

	const decimalIndex = prepared.indexOf(".");
	let str: string;
	if (decimalIndex > -1) {
		const whole = prepared.substring(0, decimalIndex);
		const fractional = prepared.substring(decimalIndex + 1);
		str = formatNumber(Number(whole), false) + "." + fractional.replace(".", "");
	} else {
		str = formatNumber(num, false);
	}

	if (isNullOrUndefined(num)) {
		num = Number(removeNonNumericChars(str));
	}

	return [num, str];
}

function MoneyInput(props: Props): JSX.Element {
	const [valueFormatted, setValueFormatted] = useState<string>("");

	useEffect(() => {
		if (!props.value) return setValueFormatted("");
		const values = parse(props.value);
		setValueFormatted(values[1]);
	}, [props.value]);

	return (
		<Input
			{...props}
			type="text"
			value={useMoneyToNumber(valueFormatted) ? valueFormatted : ""}
			icon={props.icon}
			onChange={(newValue) => {
				const values = parse(newValue);
				setValueFormatted(values[1]);
				if (props.type === "number") {
					return props.onChange(values[0]);
				}
				props.onChange(values[1]);
			}}
			helperText={props.helperText}
			mobileHelperText={props.mobileHelperText}
		/>
	);
}

export default MoneyInput;
