import React from "react";
import {ReactComponent as ArrowBack} from "../../../../assets/svg/arrows/arrow-left.svg";
import {ReactComponent as GrayCloseIcon} from "../../../../assets/svg/cancel/close.svg";

interface Props {
	menu?: React.ReactNode;
	dataType: string;
	children: React.ReactNode;
	subTitle?: React.ReactNode;
	toggler: () => void;
}
function FullPageTrayHeader(props: Props): JSX.Element {
	return (
		<div className="relative flex justify-start items-center w-full py-6 px-7" data-type={props.dataType}>
			<div className="flex justify-start items-center w-full relative" data-type={props.dataType}>
				{props.menu && (
					<>
						<div className="flex flex-col justify-start items-center w-full">
							<div className="flex flex-row justify-between items-center w-full" data-type={props.dataType}>
								<div className="flex flex-row justify-start items-center w-full" data-type={props.dataType}>
									<button
										className="outline-none focus:outline-none rounded-full h-8 w-8 flex justify-center items-center hover:bg-blue-senary transition-all bg-opacity-0 hover:bg-opacity-100"
										onClick={props.toggler}
										data-type={props.dataType}
									>
										<ArrowBack className="stroke-current text-black-tertiary" data-type={props.dataType} />
									</button>
									<p className="capitalize text-base text-black-secondary font-bold pl-2 max-w-2xs" data-type={props.dataType}>
										{props.children}
									</p>
								</div>
								{props.menu && props.menu}
							</div>
							{props.subTitle && (
								<div className="flex flex-col justify-start items-start w-full -mt-1.5 ml-20">
									<p className="text-xs text-black-tertiary max-w-2xs" data-type={props.dataType}>
										{props.subTitle}
									</p>
								</div>
							)}
						</div>
					</>
				)}
				{!props.menu && (
					<>
						<div className="flex flex-col justify-start items-center w-full">
							<div className="flex flex-row justify-between items-center w-full" data-type={props.dataType}>
								<p className="capitalize text-base text-black-secondary font-bold max-w-2xs" data-type={props.dataType}>
									{props.children}
								</p>
								<button
									className="outline-none focus:outline-none rounded-full h-8 w-8 flex justify-center items-center hover:bg-blue-senary transition-all bg-opacity-0 hover:bg-opacity-100"
									onClick={props.toggler}
									data-type={props.dataType}
								>
									<GrayCloseIcon className="stroke-current text-black-tertiary h-3.5 w-3.5" data-type={props.dataType} />
								</button>
							</div>
							{props.subTitle && (
								<div className="flex flex-col justify-start items-start w-full -mt-1.5">
									<p className="text-xs text-black-tertiary max-w-2xs" data-type={props.dataType}>
										{props.subTitle}
									</p>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default FullPageTrayHeader;
