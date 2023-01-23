import React from "react";

interface HamburgerProps {
	func(e: React.MouseEvent): void;
	active: boolean;
}

function HamburgerClose({active, func}: HamburgerProps): JSX.Element {
	return (
		<div
			className={
				`lg:hidden cursor-pointer relative transform transition-all ` +
				`${active ? "opacity-1 pointer-events-auto" : "opacity-0 pointer-events-none  hidden"} `
			}
			onClick={func}
			tabIndex={active ? 0 : -1}
		>
			<div className="relative h-6 w-6">
				<div className="h-0.5 w-6 top-50% bg-white rounded-full transform rotate-45 absolute" />
				<div className="h-0.5 w-6 top-50% bg-white rounded-full transform -rotate-45 absolute" />
			</div>
		</div>
	);
}

export default HamburgerClose;
