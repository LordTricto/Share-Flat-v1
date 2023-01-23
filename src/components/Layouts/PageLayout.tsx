import React from "react";

interface Props {
	children: React.ReactNode;
	pageTitle: string;
	subTitle?: string;
	headerButtons: React.ReactNode;
}

function PageLayout(props: Props): JSX.Element {
	return (
		<>
			<div className="w-full flex flex-col h-full max-h-full">
				<div className="flex flex-row justify-between items-center border-b-0.2">
					<div className="flex flex-col justify-start items-start py-4">
						<span className="md:text-lg text-base font-medium text-black-secondary">{props.pageTitle}</span>
						<span className="md:text-sm text-xs font-normal text-black-tertiary">{props.subTitle}</span>
					</div>
					{props.headerButtons}
				</div>
				<div className="flex flex-grow flex-shrink flex-1 w-full relative h-full">
					<div className="h-full w-full max-h-full overflow-y-auto absolute">{props.children}</div>
				</div>
			</div>
		</>
	);
}

export default PageLayout;
