import React, {KeyboardEvent, useEffect, useState} from "react";

import {ReactComponent as ArrowDownIcon} from "../../../../assets/svg/arrows/chevron-arrow-down.svg";
import {ReactComponent as CancelIcon} from "../../../../assets/svg/cancel/cancel.svg";
import {TailSpin} from "react-loader-spinner";
import isNullOrUndefined from "../../../../utils/isNullOrUndefined";
import useClickOutside from "../../../../hooks/useClickOutside";
import SearchBar from "../../SearchBar/SearchBar";

interface DropdownHeadProps {
	placeholder: React.ReactNode;
	placeholderClose?: React.ReactNode;
	children: React.ReactNode;
	clickAndClose?: boolean;
	icon?: boolean;
	placement: "center" | "right" | "left";
	outline?: boolean;
	outlineBg?: boolean;
	outlineBorder?: boolean;
	outlineBorderHover?: boolean;
	noOutlineBorder?: boolean;
	noHoverBg?: boolean;
	noTextHover?: boolean;
	value?: boolean;
	size?: "xs" | "sm" | "lg";
	filled?: boolean;
	isLoading?: boolean;
	color?: string;
	isActive?: boolean;
	isHover?: boolean;
	isSelected?: boolean;
	isSearchable?: boolean;
	searchTerm?: string;
	fitDropdown?: boolean;
	isFilterOpen?: boolean;
	noOverflow?: boolean;
	triggerLower?: boolean;
	searchPlaceholder?: string;
	handleOpen?: () => void;
	handleClose?: () => void;
	handleChangeSearchTerm?: (e: string) => void;
	handleAdditionalCheck?: (e: HTMLElement) => boolean;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function DropdownHead({
	placeholder,
	placeholderClose,
	children,
	clickAndClose = false,
	icon = false,
	placement,
	outline = true,
	outlineBg = false,
	outlineBorder = false,
	outlineBorderHover = false,
	noOutlineBorder = false,
	noHoverBg = false,
	noTextHover = false,
	value = false,
	size,
	filled = false,
	isLoading = false,
	color,
	isActive = false,
	isHover = false,
	isSelected = false,
	isSearchable = false,
	searchTerm = "",
	noOverflow = false,
	searchPlaceholder = "Search",
	handleChangeSearchTerm = undefined,
	handleClose = undefined,
	handleOpen = undefined,
	handleAdditionalCheck = undefined,
	triggerLower = false,
	fitDropdown = false,
	isFilterOpen = false,
}: DropdownHeadProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [positionTop, setPositionTop] = useState(false);
	const [y, setY] = useState<number | null>(null);

	const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
		handleChangeSearchTerm && handleChangeSearchTerm("");
	}, handleAdditionalCheck && handleAdditionalCheck);

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
	});

	useEffect(() => {
		if (y) {
			let shouldSetPositionTop;
			if (triggerLower) {
				shouldSetPositionTop = y > innerHeight / 1.25;
			} else {
				shouldSetPositionTop = y > innerHeight / 1.65;
			}
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y, triggerLower]);

	useEffect(() => {
		setActive(isActive);
	}, [isActive]);

	useEffect(() => {
		if (active) return;
		handleClose && handleClose();
	}, [active]);

	useEffect(() => {
		if (!active) return;
		handleOpen && handleOpen();
	}, [active]);

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			setActive((prev) => !prev);
		}
	};

	return (
		<div className={`relative transition-all ease-in-out duration-300 flex flex-col justify-start items-center h-full w-full`} ref={domNode}>
			{icon ? (
				<div className="relative flex items-center justify-center h-10 cursor-pointer " onClick={() => setActive((prev) => !prev)}>
					<div className="z-20 pointer-events-none">{placeholder} </div>
					<div className="absolute z-10 top-10%  h-8 w-8 rounded-full transition-all ease-in-out duration-300 hover:bg-blue-senary flex justify-center items-center" />
				</div>
			) : (
				<>
					<div
						className={
							`relative w-full flex items-center justify-between font-normal outline-none capitalize ` +
							`focus:outline-none transition-all duration-300 whitespace-nowrap leading-relaxed ` +
							`bg-transparent shadow-none cursor-pointer text-left ` +
							`${outlineBorder ? "border-blue text-blue hover:bg-blue-senary" : ""} ` +
							`${outlineBg && !noTextHover && color !== "red" ? "bg-blue-backdrop hover:text-blue focus:border-blue-focused" : ""} ` +
							`${
								!noOutlineBorder
									? outline && size === "xs"
										? "border border-solid border-black-quin py-1.5 px-2 text-xs "
										: "border border-solid border-black-quin py-3 px-4 text-sm"
									: outline && size === "xs"
									? "border border-solid  py-1.5 px-2 text-xs "
									: "border border-solid py-3 px-4 text-sm"
							} ` +
							`${filled ? "hover:bg-blue-hover focus:bg-blue-focused bg-blue text-white" : "bg-white text-black-tertiary"} ` +
							`${size === "xs" ? "h-8 text-xs" : ""} ` +
							`${size === "sm" ? "h-10 text-sm" : ""} ` +
							`${size === "lg" ? "h-12 text-base" : ""} ` +
							`${isNullOrUndefined(size) ? "h-14 text-base" : ""} ` +
							`${
								outline && !filled && color === "red" && size === "xs"
									? "py-1.5 px-2 hover:bg-error-backdrop hover:text-error border border-solid"
									: ""
							} ` +
							`${
								outline && !filled && color === "black" && size === "xs"
									? "py-1.5 px-2 text-black-secondary hover:text-black border border-solid border-black-quin"
									: ""
							} ` +
							`${
								outline && !filled && color === "red" && size !== "xs"
									? "border border-solid border-black-quin py-3 px-4 hover:bg-error-backdrop hover:text-error"
									: ""
							} ` +
							`${
								outline && !filled && color === "black" && size !== "xs"
									? "border border-solid border-black-quin text-black-secondary hover:text-black"
									: ""
							} ` +
							`${
								outline && !filled && color !== "red" && color !== "black" && !noHoverBg && !noTextHover
									? "hover:bg-blue-senary py-1.5 px-2 hover:text-blue"
									: ""
							} ` +
							`${
								outline && !filled && !outlineBorder && color !== "black" && color !== "red"
									? "hover:border-0 lg:hover:border-blue"
									: ""
							} ` +
							`${
								outline && !filled && !outlineBorder && color !== "black" && color !== "red" && !noTextHover ? "hover:text-blue" : ""
							} ` +
							`${active ? "border-0 rounded-lg" : "rounded-lg"} ` +
							`${
								active && placement === "center" && !outlineBorder && color !== "black" && color !== "red"
									? "text-blue border-blue rounded-t-lg rounded-b-none"
									: ""
							}` +
							`${active && !filled && color === "black" ? "text-black-secondary border-black-quin" : ""} ` +
							`${active && !filled && color === "red" ? "text-error border-error" : ""} ` +
							`${active && !filled && color !== "red" && color !== "black" ? "text-blue border-blue" : ""} ` +
							`${active && outlineBorder ? "bg-blue-senary" : ""} ` +
							`${!active && value ? "text-black-secondary border-black-quin" : ""} ` +
							`${
								outlineBorderHover && !filled && !active
									? "hover:border-black-secondary hover:text-black-secondary text-black-tertiary "
									: ""
							} ` +
							`${active && outlineBorderHover ? "text-black border border-black-quin" : ""} ` +
							`${noOutlineBorder && color !== "red" ? "border-transparent focus:border-blue-focused" : ""} ` +
							`${noOutlineBorder && color === "red" ? "border-transparent " : ""} ` +
							`${isHover && outline && !filled && color === "red" ? "bg-error-backdrop text-error" : ""} `
						}
						tabIndex={0}
						onClick={(e) => {
							e.preventDefault();
							setActive((prev) => !prev);
						}}
						onKeyDown={handleKeypress}
					>
						{placeholder}
						<span className="ml-2 flex justify-center items-center" onClick={(e) => e.stopPropagation()}>
							{placeholderClose}
						</span>

						{isLoading && (
							<span className="ml-2  flex justify-center items-center">
								<TailSpin color={color === "red" ? "#C5046C" : "#5466F9"} height={15} width={15} />
							</span>
						)}

						{!isLoading && !isFilterOpen && (
							<span
								className={
									`flex justify-center items-center transition-transform ease-in-out duration-150 transform ` +
									`${!isSelected ? "rotate-0" : ""} ` +
									`${isSelected && color === "red" ? "text-error" : ""} ` +
									`${active ? "-rotate-180" : ""} ` +
									`${active && color === "red" ? "text-error" : ""} ` +
									`mt-0.5 ${size === "xs" ? "h-2.5 w-2.5" : "ml-2 h-3.5 w-3.5"} `
								}
							>
								<ArrowDownIcon className="stroke-current h-3.5 w-3.5" />
							</span>
						)}

						{!isLoading && !isSelected && isFilterOpen && (
							<span
								className={
									`flex justify-center items-center transition-transform ease-in-out duration-150 transform ` +
									`${!isSelected ? "rotate-0" : ""} ` +
									`${isSelected && color === "red" ? "text-error" : ""} ` +
									`${active ? "-rotate-180" : ""} ` +
									`${active && color === "red" ? "text-error" : ""} ` +
									`mt-0.5 ${size === "xs" ? "h-2.5 w-2.5" : "ml-2 h-3.5 w-3.5"} `
								}
							>
								<CancelIcon className="stroke-current" />
							</span>
						)}
					</div>
				</>
			)}

			<div
				className={
					`bg-white shadow w-full absolute z-60 transform transition-none ease-in-out duration-300 ` +
					`${!noOverflow ? "overflow-auto " : ""} ` +
					`${positionTop ? "bottom-full" : "top-full"} ` +
					`${placement !== "center" ? "min-w-max" : ""} ` +
					`${placement === "right" ? `rounded-lg right-0 ${positionTop ? "origin-bottom-right mb-1" : "origin-top-right mt-1"}` : ""} ` +
					`${placement === "center" ? `left-0 rounded-b-lg ${positionTop ? "origin-bottom" : "origin-top"}` : ""} ` +
					`${
						placement !== "center" && placement !== "right"
							? `left-0 ${positionTop ? "origin-bottom-left rounded-b-lg mb-1" : "origin-top-left rounded-lg mt-1"}`
							: ""
					} ` +
					`${filled ? "min-w-12 " : ""} ` +
					`${icon || !outline ? "min-w-12  rounded-lg" : ""} ` +
					`${active ? "opacity-100 scale-100" : "opacity-0 pointer-events-none scale-0"} ` +
					`${fitDropdown ? "max-h-fit" : ""} `
				}
			>
				{isSearchable && handleChangeSearchTerm && (
					<div className="h-14 px-4 flex justify-start items-center w-full">
						<SearchBar placeholder={searchPlaceholder} value={searchTerm} onChange={handleChangeSearchTerm} />
					</div>
				)}
				<div
					className="w-full"
					onClick={() => {
						if (clickAndClose) {
							setActive((prev) => !prev);
						}
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

export default DropdownHead;
