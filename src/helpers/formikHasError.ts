import {GenericObject} from "./types";

export default function formikHasError(obj: GenericObject): boolean {
	if (!obj) return false;
	return !!(Object.values(obj).length > 0);
}
