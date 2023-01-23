import React from "react";

interface SkeletonElement1Props {
	avatar: boolean;
	text: boolean;
	title: boolean;
	thumbnail: boolean;
	box: boolean;
}

const getClass = (isFirst: boolean, props: SkeletonElement1Props): string => {
	const classes: string[] = ["bg-gray-100 rounded animate-skeleton"];
	if (props.avatar) {
		classes.push("h-full w-full rounded-full");
	}
	if (props.text && !isFirst) {
		classes.push("h-3.5 w-full rounded");
	}
	if (props.title) {
		if (isFirst) {
			classes.push("h-5 w-1/3 rounded");
		} else {
			classes.push("h-5 w-1/2 rounded");
		}
	}
	if (props.thumbnail) {
		classes.push("h-24 w-24 rounded");
	}
	if (props.box) {
		classes.push("h-full w-full rounded");
	}

	return classes.join(" ");
};

function SkeletonElement1(props: SkeletonElement1Props): JSX.Element {
	return (
		<div className="flex justify-between space-x-10">
			<div className={getClass(true, props)} />
			<div className={getClass(false, props)} />
		</div>
	);
}

export default SkeletonElement1;
