import React from "react";

interface HamburgerProps {
	func(e: React.MouseEvent): void;
}

function Hamburger({func}: HamburgerProps): JSX.Element {
	return (
		<div className="lg:hidden cursor-pointer" onClick={func}>
			<div>
				<div className="h-0.5 w-6 bg-black-secondary rounded-full" />
				<div className="h-0.5 w-6 bg-black-secondary rounded-full mt-1" />
				<div className="h-0.5 w-6 bg-black-secondary rounded-full mt-1" />
			</div>
		</div>
	);
}

export default Hamburger;
