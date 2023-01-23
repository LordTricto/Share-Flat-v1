import isNullOrUndefined from "./isNullOrUndefined";

export function repeatString(str: string, times = 1): string {
	let res = "";
	while (times-- > 0) {
		res += str;
	}
	return res;
}

function formatNumber(value: string | number | undefined | null, alwaysShowDecimals = true, decimals = 2): string {
	let valueToEdit: number;

	if (isNullOrUndefined(value)) {
		return "";
	}

	if (typeof value === "string") {
		const newValue = String(value).replace(new RegExp(`[^0-9.]`, "gi"), "");
		valueToEdit = Number(newValue);
	} else {
		valueToEdit = value;
	}

	let numStr = Number(valueToEdit)
		.toFixed(decimals)
		.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	if (!alwaysShowDecimals) {
		numStr = numStr.replace(`.${repeatString("0", decimals)}`, "");
	}

	return numStr;
}

export default formatNumber;
