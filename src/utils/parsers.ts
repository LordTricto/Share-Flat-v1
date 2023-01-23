import {ClassConstructor, GenericObject} from "../helpers/types";

import isEmpty from "./isEmpty";
import isNullOrUndefined from "./isNullOrUndefined";
import moment from "moment";

function isType(value: unknown, type: string): boolean {
	return typeof value === type;
}

function isInstance<T>(value: unknown, className: ClassConstructor<T>): value is T {
	return isType(value, "object") && value instanceof className;
}

function isString(value: unknown): value is string {
	return isType(value, "string");
}

export default class Parsers {
	public static boolean(value: unknown): boolean {
		return !!Number(value);
	}

	public static classObject<T>(value: unknown, className: {create: (param: GenericObject) => T}): T | null {
		return !isEmpty(value) ? className.create(value as GenericObject) : null;
	}

	public static classObjectNonNullable<T>(value: unknown, className: {create: (param: GenericObject) => T}): T {
		return className.create(value as GenericObject);
	}

	public static classObjectArray<T>(value: unknown, className: {create: (param: GenericObject) => T}): T[] {
		return !isEmpty(value) && Array.isArray(value) ? value.map((v: unknown) => className.create(v as GenericObject)) : [];
	}

	public static date(value: unknown): Date | null {
		if ((isString(value) || isInstance(value, Date)) && !!value) {
			return moment(value).toDate();
		}

		return null;
	}

	public static number(value: unknown, defaultValue = 0): number {
		return Number(value || defaultValue);
	}

	public static numberArray(value: unknown): number[] {
		return !isEmpty(value) && Array.isArray(value) ? value.map((v: unknown) => Number(v)) : [];
	}

	public static string(value: unknown, defaultValue = ""): string {
		return String(value || defaultValue);
	}

	public static stringArray(value: unknown): string[] {
		return !isEmpty(value) && Array.isArray(value) ? value.map((v: unknown) => String(v)) : [];
	}

	public static nullableNumber(value: unknown): number | null {
		return isNullOrUndefined(value) ? null : Number(value);
	}

	public static nullableString(value: unknown): string | null {
		return isNullOrUndefined(value) ? null : Parsers.string(value);
	}

	public static nullableBoolean(value: unknown): boolean | null {
		return isNullOrUndefined(value) ? null : Parsers.boolean(value);
	}
}
