import React from "react";

interface Props {
	children: React.ReactNode;
	dataType: string;
}
function FullPageTrayFooter(props: Props): JSX.Element {
	return (
		<div className="flex flex-row justify-center items-center w-full py-4 border-t-0.2" data-type={props.dataType} id="scroller">
			{props.children}
		</div>
	);
}

export default FullPageTrayFooter;
