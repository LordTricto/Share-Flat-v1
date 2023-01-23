import formatNumber from "../utils/formatNumber";

function removeNonNumericChars(string: string | number): string {
	return String(string).replace(new RegExp(`[^0-9.]`, "gi"), "");
}

export function useNumberToMoney(newValue: number): string {
	const prepared = removeNonNumericChars(newValue);
	const num = Number(prepared);

	const decimalIndex = prepared.indexOf(".");
	let str: string;
	if (decimalIndex > -1) {
		const whole = prepared.substring(0, decimalIndex);
		const fractional = prepared.substring(decimalIndex + 1);
		str = formatNumber(Number(whole), false) + "." + fractional.replace(".", "");
	} else {
		str = formatNumber(num, false);
	}

	// if (isNullOrUndefined(num)) {
	// num = Number(removeNonNumericChars(str));
	// }

	return str;
}
