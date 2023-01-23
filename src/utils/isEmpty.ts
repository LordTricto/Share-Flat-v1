import isNullOrUndefined from "./isNullOrUndefined";

export default function isEmpty(value: unknown): boolean {
	if (isNullOrUndefined(value)) {
		return true;
	} else if (Array.isArray(value)) {
		return !value.length;
	} else if (typeof value === "number") {
		return !Number(value);
	} else if (typeof value === "string") {
		return !value.trim().length;
	} else if (typeof value === "object") {
		return !Object.keys(value || {}).length;
	} else {
		return !value;
	}
}
