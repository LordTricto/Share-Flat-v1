export default function isNullOrUndefined(value: unknown): value is null | undefined {
	return value === null || value === undefined || Number.isNaN(value);
}
