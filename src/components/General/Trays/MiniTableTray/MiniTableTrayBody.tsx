import React from "react";

interface Props {
	children: React.ReactNode;
	dataType: string;
}
function MiniTableTrayBody(props: Props): JSX.Element {
	return (
		<div className="flex flex-col flex-1 w-full h-full max-h-full relative overflow-hidden" data-type={props.dataType}>
			<div className="absolute top-0 left-0 w-full h-full overflow-auto pb-6" data-type={props.dataType}>
				{props.children}
			</div>
		</div>
	);
}

export default MiniTableTrayBody;
