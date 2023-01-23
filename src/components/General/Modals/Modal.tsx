import React, {useEffect} from "react";

interface Props {
	children: React.ReactNode;
	size: "xs" | "sm" | "md" | "lg" | "fit" | "fill";
	active: boolean;
	toggler: () => void;
	dataType?: string | null;
}

const getClass = (props: Props): string => {
	const classes: string[] = ["transform opacity-100 translate-y-0 transition-all duration-150", "my-6 mx-auto w-full"];
	if (props.size === "xs") {
		classes.push("max-w-sm");
	} else if (props.size === "sm") {
		classes.push("max-w-md");
	} else if (props.size === "md") {
		classes.push("max-w-lg");
	} else if (props.size === "lg") {
		classes.push("max-w-2xl");
	} else if (props.size === "fill") {
		classes.push("w-full");
	} else {
		classes.push("w-fit max-w-full");
	}

	if (props.active) {
		classes.push("opacity-100 translate-y-0");
	} else {
		classes.push("opacity-0 -translate-y-10");
	}
	return classes.join(" ");
};

function Modal(props: Props): JSX.Element {
	useEffect(() => {
		const close = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				props.toggler();
			}
		};
		window.addEventListener("keydown", close);
		return () => window.removeEventListener("keydown", close);
	}, []);
	return (
		<>
			<div
				className={
					`grid place-items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-70 outline-none focus:outline-none transition-all duration-150 px-2 ` +
					`${props.active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} `
				}
				onClick={props.toggler}
				data-type={props.dataType && props.dataType}
			>
				<div className={getClass(props)} data-type={props.dataType && props.dataType}>
					<div
						className="border-0 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none focus:outline-none"
						onClick={function onClick(e) {
							return e.stopPropagation();
						}}
						data-type={props.dataType && props.dataType}
					>
						{" "}
						{props.children}
					</div>
				</div>
			</div>

			<div
				className={
					`fixed inset-0 z-60 bg-black transition-all duration-150 ` +
					`${props.active ? "opacity-25 pointer-events-auto" : "opacity-0 pointer-events-none"} `
				}
				data-type={props.dataType && props.dataType}
			></div>
		</>
	);
}

export default Modal;
