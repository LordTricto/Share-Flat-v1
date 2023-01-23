const numbersPast12 = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const numbersBefore12 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"];

export function convertDate(date: string): string | null {
	const leftNumber = date.replace("-", "").slice(0, 2);
	const rightNumber = date.replace("-", "").slice(2, 4);

	if (numbersPast12.indexOf(leftNumber) === -1 || numbersPast12.indexOf(rightNumber) === -1) return null;
	const newLeftNumber = numbersBefore12[numbersPast12.indexOf(leftNumber)];
	const newRightNumber = numbersBefore12[numbersPast12.indexOf(rightNumber)];

	const newNumber = `${newLeftNumber}-${newRightNumber}`;

	return newNumber;
}
