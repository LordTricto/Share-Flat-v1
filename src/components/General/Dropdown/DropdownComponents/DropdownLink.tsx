import React from "react";

interface DropdownLinkProps {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
	isLink?: boolean;
	big?: boolean;
	noHover?: boolean | (() => boolean);
	redHover?: boolean;
	color?: "red";
	fitHeight?: boolean;
}

const getClass = (props: DropdownLinkProps): string => {
	const classes: string[] = [
		"flex justify-start items-center",
		"w-full text-black-tertiary font-normal antialiased",
		"transition-all ease-in-out duration-300",
		"overflow-ellipsis overflow-hidden whitespace-nowrap",
	];
	if (props.fitHeight) {
		classes.push("h-fit");
	} else if (props.big) {
		classes.push("h-14");
	} else {
		classes.push("h-10");
	}

	// classes.push(props.big ? "h-14" : "h-10");

	if (props.noHover) {
		classes.push("cursor-default pointer-events-none");
		if (props.color === "red") {
			classes.push("bg-error-backdrop text-error");
		} else {
			// classes.push("bg-blue-senary text-black-secondary");
			classes.push("bg-gray-100 text-black-secondary");
		}
	} else if (props.redHover) {
		classes.push("hover:bg-error-backdrop hover:text-error cursor-pointer pointer-events-auto");
	} else if (props.isLink) {
		classes.push("hover:bg-blue-senary hover:text-blue cursor-pointer pointer-events-auto");
	} else {
		classes.push("hover:bg-blue-senary hover:text-black-secondary cursor-pointer pointer-events-auto");
	}

	return classes.join(" ");
};

function DropdownLink(props: DropdownLinkProps): JSX.Element {
	return (
		<div className={getClass(props)} onClick={(e) => props.onClick && props.onClick(e)} data-type="dropdown">
			{props.children}
		</div>
	);
}

export default DropdownLink;
