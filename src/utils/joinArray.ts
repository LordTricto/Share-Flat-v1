export default function (array: string[], lastJoinText = "and"): string {
	if (array.length === 0) {
		return "";
	}

	if (array.length === 1) {
		return array[0];
	}

	const data = array;
	const last = data.pop();
	return `${data.join(", ")} ${lastJoinText} ${last || ""}`;
}
