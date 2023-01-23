// https://stackoverflow.com/a/56346446
// SimpleSpread<L, R> is a simplified version of what happens when you
// do an object spread like {...left, ...right} where left is of type L and
// right is of type R.  It is the type R, with any properties on L that
// don't exist in R.  (It doesn't work if a key in L is an optional property in
// R, which is why this is simplified)
export type ExcludeProps<L, R> = Pick<L, Exclude<keyof L, keyof R>>;

// exclude these props, so when we extend InputHTMLAttributes<HTMLInputElement, we can overwrite the type definitions rather than merge them
// i.e. so onChange can be just the way it was defined `onChange(value: string): void`
// rather than being merged to `onChange(value: string|ChangeEvent): void`
export type InputPropsToExclude = {placeholder: unknown; onChange: unknown};
