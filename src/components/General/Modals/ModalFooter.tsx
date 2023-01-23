import React from "react";
interface Props {
	children: React.ReactNode;
	dataType?: string | null;
}

function ModalFooter(props: Props): JSX.Element {
	return (
		<>
			<div
				className="flex flex-row justify-end items-center w-full pt-4 pb-8 h-fit px-8 space-x-4"
				data-type={props.dataType && props.dataType}
			>
				{props.children}
			</div>
		</>
	);
}

export default ModalFooter;
