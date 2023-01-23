import React from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
interface Props {
	active: boolean;
	children: React.ReactNode;
	dataType: string;
	withClickOutside?: boolean;
	handleReset?: () => void;
}
function FullPageTray(props: Props): JSX.Element {
	const domNode = useClickOutside(
		() => {
			props.withClickOutside && props.handleReset && props.handleReset();
		},
		(eventTarget: HTMLElement) => !!(eventTarget.dataset.type !== props.dataType || !eventTarget.dataset.type.includes(props.dataType)),
		// (eventTarget: HTMLElement) => !!(eventTarget.dataset.type !== props.dataType && eventTarget.dataset.type !== `${props.dataType}-active`),
		["mousedown", "keydown"]
	);

	return (
		<>
			<div
				className={`max-w-md fixed top-0 right-0 flex flex-col justify-start items-start w-full h-fit-available bg-white shadow-lg z-50 transform transition ease-in-out duration-150 m-0 ${
					props.active ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0 pointer-events-none"
				} `}
				ref={props.withClickOutside ? domNode : undefined}
				data-type={props.dataType}
			>
				{props.children}
			</div>
		</>
	);
}

export default FullPageTray;
