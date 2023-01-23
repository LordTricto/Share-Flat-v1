import React from "react";

interface FullScreenLoaderProps {
	isSwitchingBusiness?: boolean;
	isAccessingAccount?: boolean;
}

function FullScreenLoader({isSwitchingBusiness, isAccessingAccount}: FullScreenLoaderProps): JSX.Element {
	return (
		<div className="fixed flex justify-center items-center h-full w-full z-90 bg-white transition-all ease-in-out duration-300">
			<div className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full">
				<div className="relative h-12 w-12  transition-all ease-in-out duration-500">
					{/* <img src={TopLogo} alt="TopLogo" className="top-0 left-0 absolute animate-iconOne" />
					<img src={MiddleLogo} alt="MiddleLogo" className="top-2.5 left-0 absolute animate-iconTwo" />
					<img src={BottomLogo} alt="BottomLogo" className="top-6 left-0 absolute animate-iconThree" /> */}
				</div>

				{!isSwitchingBusiness && isAccessingAccount && (
					<span className="pt-16 text-black-secondary text-sm opacity-50"> Accessing your account...</span>
				)}
				{isSwitchingBusiness && <span className="pt-16 text-black-secondary text-sm opacity-50"> Switching Business...</span>}
			</div>
		</div>
	);
}

export default FullScreenLoader;
