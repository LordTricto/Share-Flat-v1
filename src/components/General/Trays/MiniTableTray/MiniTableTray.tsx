import React from "react";
import useClickOutside from "../../../../hooks/useClickOutside";
interface Props {
	active: boolean;
	dataType: string;
	children: React.ReactNode;
	withClickOutside?: boolean;
	handleReset: () => void;
}

function MiniTableTray(props: Props): JSX.Element {
	const domNode = useClickOutside(
		() => {
			props.withClickOutside && props.handleReset && props.handleReset();
		},
		(eventTarget: HTMLElement) => !!(eventTarget.dataset.type !== props.dataType && !eventTarget.dataset.type?.includes(props.dataType)),
		["mousedown", "keydown"]
	);

	return (
		<>
			<div
				className={
					`fixed top-0 right-0 2xs:absolute h-full max-h-full 2xs:top-0 2xs:right-0.5 rounded-tl-lg shadow-custom z-50 flex flex-col justify-start items-start 2xs:max-w-sm w-full bg-black-secondary ` +
					`transform transition ease-in-out duration-500 origin-right bg-white m-0 ` +
					`${props.active ? "translate-x-0 " : "pointer-events-none translate-x-105 opacity-0 "} `
				}
				data-type={props.dataType}
				ref={props.withClickOutside ? domNode : undefined}
			>
				<div className="flex flex-col w-full h-full" data-type={props.dataType}>
					{props.children}
				</div>
			</div>
		</>
	);
}

export default MiniTableTray;
