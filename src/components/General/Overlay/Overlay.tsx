import React from "react";

interface OverlayProps {
	onClick(e: React.MouseEvent): void;
}

function Overlay({onClick}: OverlayProps): JSX.Element {
	return <div className="fixed h-screen w-screen z-40 backdrop " onClick={onClick} />;
}

export default Overlay;
