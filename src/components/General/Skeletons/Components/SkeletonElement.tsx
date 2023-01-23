import React from "react";

interface SkeletonElementProps {
	avatar?: boolean;
	text?: boolean;
	title?: boolean;
	thumbnail?: boolean;
	box?: boolean;
}

function SkeletonElement({avatar, text, title, thumbnail, box}: SkeletonElementProps): JSX.Element {
	return (
		<div
			className={
				`bg-gray-100 rounded animate-skeleton ` +
				`${avatar ? "h-full w-full rounded-full" : ""} ` +
				`${text ? "h-3.5 w-full rounded" : ""} ` +
				`${title ? "h-5 w-1/3 rounded" : ""} ` +
				`${thumbnail ? "h-24 w-24 rounded" : ""} ` +
				`${box ? "h-full w-full rounded " : ""} `
			}
		/>
	);
}

export default SkeletonElement;
