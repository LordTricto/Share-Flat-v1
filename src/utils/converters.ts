import {GenericObject} from "../helpers/types";

export function prepareFormSubmission(form: GenericObject | FormData): GenericObject | GenericObject[] | FormData {
	let res: GenericObject | GenericObject[] | FormData;
	if (form instanceof FormData) {
		res = new FormData();
	} else {
		res = Array.isArray(form) ? [] : {};
	}
	const keys = form instanceof FormData ? Array.from(form.keys()) : Object.keys(form);
	for (const key of keys) {
		let value = form instanceof FormData ? form.get(key) : form[key];

		// check for boolean values
		if (typeof value === "boolean") {
			value = !!Number(value);
		}

		// if NaN, set to null
		if (typeof value === "number" && Number.isNaN(value)) {
			value = null;
		}

		// ignore functions
		if (typeof value === "function") {
			continue;
		}

		// recurse through objects
		if (typeof value === "object" && !!value && !(value instanceof File || value instanceof Blob)) {
			// typeof null is also "object"
			value = prepareFormSubmission(value as GenericObject);
		}

		if (form instanceof FormData) {
			(res as FormData).set(key, value as string | Blob);
		} else {
			(res as GenericObject)[key] = value;
		}
	}
	return res;
}

export function toFormData(data: GenericObject | FormData): FormData {
	const res = new FormData();

	const append = (key: string, value: unknown): void => {
		res.set(key, value instanceof File || value instanceof Blob ? value : String(value));
	};

	if (data instanceof FormData) {
		data.forEach((value, key) => append(key, value));
	} else {
		Object.entries(data).forEach(([key, value]) => append(key, value));
	}

	return res;
}
