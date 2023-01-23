import React from "react";

export enum BadgeType {
	INFORMATION = "information_badge",
	ERROR = "error_badge",
	WARNING = "warning_badge",
	SUCCESS = "success_badge",
}

interface BadgeInterface {
	text: string;
	badgeType: BadgeType;
	dataType?: string;
}

function Badge(props: BadgeInterface): JSX.Element {
	return (
		<>
			<div
				className={
					`whitespace-nowrap max-w-min rounded-lg ` +
					`${props.badgeType === BadgeType.SUCCESS ? "bg-success-backdrop text-success" : ""} ` +
					`${props.badgeType === BadgeType.ERROR ? "bg-error-backdrop text-error" : ""} ` +
					`${props.badgeType === BadgeType.WARNING ? "bg-warning-backdrop text-warning" : ""} ` +
					`${props.badgeType === BadgeType.INFORMATION ? "bg-info-backdrop text-info" : ""} `
				}
				data-type={props.dataType || ""}
			>
				<p className="py-0.5 px-3 text-sm" data-type={props.dataType || ""}>
					{props.text}
				</p>
			</div>
		</>
	);
}

export default Badge;
