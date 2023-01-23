import React from "react";

interface Props {
	children: React.ReactNode;
	dataType: string;
}
function FullPageTrayBody(props: Props): JSX.Element {
	return (
		<div
			className="relative flex flex-col flex-grow justify-start items-start w-full mx-auto pt-4 px-7 overflow-y-auto overflow-hidden"
			data-type={props.dataType}
			id="scroller"
		>
			{props.children}
		</div>
	);
}

export default FullPageTrayBody;
