import React, {ReactNode, useCallback} from "react";

import ReactTooltip from "react-tooltip";

interface Props {
	icon: ReactNode;
	message: string;
	placement: "top" | "bottom" | "left" | "right";
	size?: "small";
	noHoverBg?: boolean;
	dataType?: string;
	onClick?: () => void;
}

function TooltipIcons({
	onClick,
	icon,
	message,
	noHoverBg = false,
	placement = "top",
	size = undefined,
	dataType = "transaction",
}: Props): JSX.Element {
	const handleOnClick = useCallback(
		(e: React.MouseEvent) => {
			if (onClick) {
				e.preventDefault();
				e.stopPropagation();
				onClick();
			}
		},
		[onClick]
	);

	return (
		<>
			<div data-type={dataType}>
				<span data-tip data-for={message}>
					<div
						className={
							`flex justify-center items-center rounded-lg outline-none relative cursor-pointer ` +
							`${size === "small" ? "w-6 h-6" : "w-8 h-8"} ` +
							`${!noHoverBg ? "hover:bg-grey-backdrop" : ""} `
						}
						onClick={handleOnClick}
						data-tip
						data-for={`tip-${message}`}
						data-place={placement}
						data-type={dataType}
					>
						{icon}
					</div>
				</span>
				<ReactTooltip id={message} place={placement} type="dark" effect="solid">
					<span>{message}</span>
				</ReactTooltip>
			</div>
		</>
	);
}

export default TooltipIcons;
