import isNullOrUndefined from "../utils/isNullOrUndefined";

function nl2br(str: string | null): string {
	if (isNullOrUndefined(str)) {
		return "";
	}

	return `${str}`.replace(/(\r\n|\n\r|\r|\n)/g, "<br>");
}
export default nl2br;
