import React from "react";
import Ripples from "./Ripples";
// import Ripples from "react-ripples";
import {TailSpin} from "react-loader-spinner";

interface ButtonCompProps {
	children: React.ReactNode;
	ripple?: "light" | "dark";
	size?: "sm" | "md" | "lg" | "xl";
	type?: "button" | "submit" | "reset";
	disable?: boolean;
	buttonType?: "primary" | "secondary" | "tertiary";
	color: "blue" | "grey" | "red" | "transparent";
	fullWidth?: boolean;
	func?: (e: React.MouseEvent) => void;
	borderSmall?: boolean;
	href?: string;
	isLoading?: boolean | null;
	className?: string;
	noTabIndex?: boolean;
	dataType?: string | null;
	autoFocus?: boolean;
}

const primaryColors = {
	blue: "text-white bg-blue hover:bg-blue-hover focus:bg-blue-focused active:bg-blue-hover",
	transparent: "text-black-secondary hover:text-black focus:outline-none",
	red: "text-white bg-error hover:bg-error ",
	grey: "",
};

const primaryDisabledColors = {
	blue: "text-white bg-blue-quat",
	transparent: "",
	grey: "",
	red: "",
};

const secondaryColors = {
	blue: "text-blue border-blue hover:border-blue-hover hover:bg-blue-senary hover:text-blue-hover focus:border-blue-focused focus:bg-blue-senary focus:text-blue-focused",
	grey: "text-black-tertiary border-black-quat hover:border-blue-hover hover:text-blue-hover focus:border-blue-focused focus:text-blue-focused",
	red: "text-error bg-white border-error",
	transparent: "",
};
const secondaryDisabledColors = {
	blue: "text-blue-quat border-blue-quat",
	grey: "text-black-quat border-black-quin",
	red: "",
	transparent: "",
};
const tertiaryColors = {
	blue: "text-blue hover:text-blue-hover focus:text-blue-focused",
	grey: "text-black-quat hover:text-black-tertiary focus:text-black-tertiary",
	red: "text-error",
	transparent: "",
};

const tertiaryDisabledColors = {
	blue: "text-blue-quin",
	grey: "text-black-quat",
	transparent: "",
	red: "",
};
const getRippleColor = (props: ButtonCompProps): string => {
	const classes: string[] = [];
	if (props.color === "transparent") {
		if (props.ripple === "light") {
			classes.push("#F9F9FB");
		} else {
			classes.push("#BBC3FD");
		}
	} else if (props.color === "red") {
		if (props.ripple === "light") {
			classes.push("#ED9CAC");
		} else {
			classes.push("#ED9CAC");
		}
	} else {
		if (props.ripple === "light") {
			classes.push("#2E3A9E");
		} else {
			classes.push("#BBC3FD");
		}
	}

	return classes.join(" ");
};

const getLoaderColor = (props: ButtonCompProps): string => {
	const colors: string[] = [];

	if (props.buttonType === "primary") {
		colors.push("#ffffff");
	}

	if (props.buttonType === "secondary") {
		if (props.color === "blue") {
			colors.push("#5466F9");
		} else if (props.color === "grey") {
			colors.push("#B8BAC6");
		} else if (props.color === "red") {
			colors.push("#D20832");
		} else if (props.color === "transparent") {
			colors.push("#D5D5DD");
		}
	}
	if (props.buttonType === "tertiary") {
		colors.push("#5466F9");
	}
	// if (props.buttonType === "quaternary") {
	// colors.push("#B8BAC6");
	// }

	return colors.join(" ");
};

const getLoaderHeight = (props: ButtonCompProps): string => {
	const height: number[] = [];

	if (props.size === "sm") {
		height.push(20);
	} else if (props.size === "lg") {
		height.push(30);
	} else if (props.size === "xl") {
		height.push(40);
	} else {
		height.push(20);
	}

	return height.join(" ");
};

const getLoaderWidth = (props: ButtonCompProps): string => {
	const width: number[] = [];

	if (props.size === "sm") {
		width.push(20);
	} else if (props.size === "lg") {
		width.push(30);
	} else if (props.size === "xl") {
		width.push(40);
	} else {
		width.push(20);
	}

	return width.join(" ");
};

const getClass = (props: ButtonCompProps): string => {
	const classes: string[] = [
		"flex items-center justify-center relative ",
		"uppercase whitespace-nowrap capitalize font-normal outline-none tracking-wider focus:outline-none focus:shadow-none ",
		"transition-all duration-300 overflow-hidden ",
	];

	if (props.disable) {
		if (props.buttonType === "primary") {
			classes.push(primaryDisabledColors[props.color]);
		} else if (props.buttonType === "secondary") {
			classes.push("bg-transparent border border-solid shadow-none");
			classes.push(secondaryDisabledColors[props.color]);
		} else if (props.buttonType === "tertiary") {
			classes.push(tertiaryDisabledColors[props.color]);
		}
	} else {
		if (props.buttonType === "primary") {
			classes.push(primaryColors[props.color]);
		} else if (props.buttonType === "secondary") {
			classes.push("bg-transparent border border-solid shadow-none");
			classes.push(secondaryColors[props.color]);
		} else if (props.buttonType === "tertiary") {
			classes.push(tertiaryColors[props.color]);
		}
	}

	if (props.buttonType !== "tertiary") {
		if (props.size === "sm") {
			classes.push("h-8 px-4 text-sm");
		} else if (props.size === "md") {
			classes.push("h-10 px-6 text-sm");
		} else if (props.size === "xl") {
			classes.push("h-14 px-10 text-md");
		} else {
			classes.push("h-12 px-8 text-md");
		}
	} else {
		if (props.size === "sm") {
			classes.push("text-sm");
		} else if (props.size === "md") {
			classes.push("text-sm");
		} else if (props.size === "xl") {
			classes.push("text-md");
		} else {
			classes.push("text-md");
		}

		if (props.isLoading) {
			if (props.size === "sm") {
				classes.push("h-4 w-4");
			} else if (props.size === "lg") {
				classes.push("h-8 w-8");
			} else {
				classes.push("h-6 w-6");
			}
		}
	}

	if (props.buttonType !== "tertiary") {
		if (props.fullWidth) {
			classes.push("w-full");
		}
	}
	if (props.borderSmall) {
		classes.push("rounded-md");
	} else if (props.buttonType === "tertiary") {
		classes.push("");
	} else {
		classes.push("rounded-lg");
	}
	if (props.className) {
		classes.push(props.className);
	}

	return classes.join(" ");
};

function ButtonComp(props: ButtonCompProps & React.HTMLAttributes<HTMLButtonElement>): JSX.Element {
	const {
		children,
		fullWidth = false,
		borderSmall = false,
		type = "button",
		disable = false,
		buttonType,
		func = undefined,
		isLoading = false,
	} = props;

	return (
		<div
			className={
				`relative ` +
				`${disable ? "pointer-events-none" : ""} ` +
				`${fullWidth ? "w-full" : ""} ` +
				`${isLoading ? "pointer-events-none" : ""} ` +
				`${buttonType !== "tertiary" ? "overflow-hidden" : ""} `
			}
			data-type={props.dataType && props.dataType}
		>
			<Ripples
				color={getRippleColor(props)}
				borderSmall={borderSmall}
				show={!!(buttonType !== "tertiary")}
				dataType={props.dataType && props.dataType}
			>
				<button
					className={getClass(props)}
					type={type}
					onClick={func}
					tabIndex={props.noTabIndex || props.disable ? -1 : 0}
					data-type={props.dataType && props.dataType}
					autoFocus={props.autoFocus}
				>
					<div
						className={`absolute top-0 left-0 h-full w-full justify-center items-center ` + `${isLoading ? "flex" : "hidden"} `}
						data-type={props.dataType && props.dataType}
					>
						<TailSpin
							color={getLoaderColor(props)}
							height={getLoaderHeight(props)}
							width={getLoaderWidth(props)}
							data-type={props.dataType && props.dataType}
						/>
					</div>
					<div
						className={`flex justify-center items-center w-full tracking-normal ` + `${!isLoading ? "opacity-100" : "opacity-0"} `}
						data-type={props.dataType && props.dataType}
					>
						{children}
					</div>
				</button>
			</Ripples>
		</div>
	);
}

export default ButtonComp;
