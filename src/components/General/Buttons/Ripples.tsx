import React, {useEffect, useRef, useState} from "react";

interface Props {
	children: React.ReactNode;
	color: string;
	borderSmall?: boolean;
	show?: boolean;
	dataType?: string | null;
}

function Ripples(props: Props): JSX.Element {
	const [isRipple, setIsRipple] = useState<boolean>(false);
	const [coords, setCoords] = useState<{x: number; y: number}>({x: -1, y: -1});
	const [parentOffset, setParentOffset] = useState<{x: number; y: number}>({x: -1, y: -1});
	const domNode = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const timeOut = setTimeout(() => setIsRipple(false), 500);
		if (!isRipple) {
			setCoords({x: -1, y: -1});
		}
		return () => {
			clearTimeout(timeOut);
		};
	}, [isRipple]);

	useEffect(() => {
		if (!domNode) return;
		setParentOffset({x: domNode.current?.getBoundingClientRect().left as number, y: domNode.current?.getBoundingClientRect().top as number});
	}, [domNode, domNode.current, domNode.current?.getBoundingClientRect().left, domNode.current?.getBoundingClientRect().top]);

	const handleClick = (e: React.MouseEvent) => {
		setCoords({x: e.clientX - parentOffset.x, y: e.clientY - parentOffset.y});
		setIsRipple(true);
	};

	return (
		<>
			<div
				className={
					`w-full h-full relative overflow-hidden  ` +
					`${props.show && props.borderSmall ? "rounded-md" : ""}` +
					`${props.show && !props.borderSmall ? "rounded-lg" : ""}`
				}
				onClick={(e) => handleClick(e)}
				ref={domNode}
				data-type={props.dataType && props.dataType}
			>
				{props.show && isRipple && (
					<div
						className="absolute w-6 h-6 rounded-full bg-white animate-buttonRipple z-10"
						style={{transform: "translate(-50%, -50%)", left: coords.x, top: coords.y, backgroundColor: props.color}}
						data-type={props.dataType && props.dataType}
					></div>
				)}
				{props.children}
			</div>
		</>
	);
}

export default Ripples;
