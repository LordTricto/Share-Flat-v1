import isNullOrUndefined from "../utils/isNullOrUndefined";

export function useMoneyToNumber(value: string): number {
	let valueToEdit = 0;

	if (isNullOrUndefined(value)) {
		return valueToEdit;
	}
	const newValue = String(value).replace(new RegExp(`[^0-9-.]`, "gi"), "");
	valueToEdit = Number(newValue);

	return valueToEdit;
}
