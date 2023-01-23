export function useEmailCheck(value: string): boolean {
	const email = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
	return !!email.exec(value);
}
