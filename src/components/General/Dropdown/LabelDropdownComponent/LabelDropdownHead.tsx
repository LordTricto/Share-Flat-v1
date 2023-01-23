import React, {KeyboardEvent, useEffect, useRef, useState} from "react";

import {ReactComponent as ArrowDown} from "../../../../assets/svg/arrows/chevron-arrow-down.svg";
import {ReactComponent as Cancel} from "../../../../assets/svg/cancel/cancel.svg";
import useClickOutside from "../../../../hooks/useClickOutside";
import SearchBar from "../../SearchBar/SearchBar";

interface LabelDropdownHeadProps {
	size?: "sm" | "md" | "lg";
	noArrow?: boolean;
	children: React.ReactNode;
	hasInput?: boolean;
	isCancel?: boolean;
	fitHeight?: boolean;
	inputValue: number | string | null;
	searchTerm?: string;
	placeholder: React.ReactNode;
	isDisabled?: boolean;
	isSearchable?: boolean;
	clickAndClose?: boolean;
	searchPlaceholder?: string;
	cancelFunc?(): void;
	onChangeFunc?: (e: string) => void;
	clickOutsideFunc?: () => void;
	handleChangeSearchTerm?: (e: string) => void;
}

function LabelDropdownHead({
	size = "lg",
	noArrow = false,
	children,
	hasInput = false,
	isCancel = false,
	fitHeight = false,
	isDisabled = false,
	searchTerm = "",
	inputValue,
	placeholder,
	isSearchable = false,
	clickAndClose = false,
	searchPlaceholder = "Search",
	cancelFunc = undefined,
	onChangeFunc = undefined,
	clickOutsideFunc = undefined,
	handleChangeSearchTerm = undefined,
}: LabelDropdownHeadProps): JSX.Element {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [y, setY] = useState<number | null>(null);
	const [value, setValue] = useState<number | string | null>(null);
	const [active, setActive] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hasValue, setHasValue] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);

	const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
		clickOutsideFunc && clickOutsideFunc();
		handleChangeSearchTerm && handleChangeSearchTerm("");
	});

	useEffect(() => {
		if (domNode.current) {
			setY(domNode.current.getBoundingClientRect().top);
		}
	});

	useEffect(() => {
		if (y) {
			const shouldSetPositionTop = y > innerHeight / 1.65;
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y]);

	useEffect(() => {
		setValue(inputValue);
	}, [inputValue]);

	useEffect(() => {
		setHasValue(!!value && ((typeof value === "string" && value.length > 0) || (typeof value === "number" && value > 0)));
	}, [value]);

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			setActive((prev) => !prev);
		}
	};

	return (
		<div
			className={`relative flex flex-col justify-start items-center h-full w-full ` + `${isDisabled ? "pointer-events-none" : ""}`}
			id="dropdownDiv"
			ref={domNode}
		>
			<div
				onMouseEnter={() => !isDisabled && setIsHover(true)}
				onMouseLeave={() => !isDisabled && setIsHover(false)}
				className={
					`relative w-full bg-white flex space-x-4 items-center rounded-lg font-normal outline-none ` +
					`capitalize focus:outline-none transition-all duration-75 py-3 px-4 ` +
					`text-base leading-relaxed bg-transparent border border-solid shadow-none lg:hover:text-blue lg:hover:border-blue lg:focus:text-blue lg:focus:border-blue-focused text-left cursor-pointer ` +
					`${size === "lg" ? "h-12" : ""} ` +
					`${size === "md" ? "h-10" : ""} ` +
					`${size === "sm" ? "h-8" : ""} ` +
					`${hasValue ? "justify-between" : "justify-end"} ` +
					`${hasValue && active ? "border-blue" : ""} ` +
					`${
						hasValue && !active
							? "text-black-secondary border-black-quin lg:hover:text-blue lg:hover:border-blue lg:focus:text-blue lg:focus:border-blue-focused"
							: ""
					} ` +
					`${!hasValue && active ? "border-blue text-blue" : ""} ` +
					`${!hasValue && !active ? "text-black-tertiary border-black-quin" : ""} ` +
					`${isHover ? "lg:text-blue" : ""} `
				}
				tabIndex={isDisabled ? -1 : 0}
				onClick={() => {
					if (hasInput) {
						inputRef?.current?.focus();
					}
					if (isCancel && hasValue) {
						setActive((prev) => prev);
					} else {
						setActive((prev) => !prev);
					}
				}}
				onKeyDown={handleKeypress}
			>
				{!hasInput && value && (
					<span
						className={
							`text-base text-black-secondary overflow-ellipsis overflow-hidden whitespace-nowrap max-w-full ` +
							`${isDisabled ? "text-black-quat bg-transparent pointer-events-none " : ""} `
						}
					>
						{value}
					</span>
				)}

				{!noArrow && (
					<span
						className={
							`flex justify-end items-center transition-transform duration-150 transform ` +
							`${active ? "-rotate-180 text-blue" : "rotate-0"} ` +
							`${isDisabled ? "text-black-quat " : ""} `
						}
					>
						<ArrowDown className="stroke-current h-3.5 w-3.5" />
					</span>
				)}

				{isCancel && hasValue && (
					<div
						className={
							`flex justify-end items-center ` +
							`${active ? "text-blue" : ""} ` +
							`${!active && hasValue ? "text-black-secondary" : ""} ` +
							`${isHover ? "text-blue" : ""} `
						}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							if (cancelFunc) {
								cancelFunc();
							}
						}}
					>
						<Cancel className="stroke-current h-3.5 w-3.5" />
					</div>
				)}
				{hasInput && (
					<input
						id={(placeholder as string) || ""}
						name={(placeholder as string) || ""}
						ref={inputRef}
						type="text"
						value={(inputValue as string) || ""}
						onChange={(e) => {
							onChangeFunc && onChangeFunc(e.target.value);
						}}
						autoComplete="off"
						className={
							`h-10 w-full placeholder-transparent focus:outline-none focus:border-none ` +
							`${inputValue && (inputValue as string).length > 0 ? "text-black-secondary " : active ? "text-black" : "text-black"} ` +
							`${isDisabled ? "text-black-quat bg-transparent pointer-events-none " : ""} `
						}
						placeholder="john@doe.com"
					/>
				)}
			</div>

			{placeholder && (
				<label
					htmlFor="text"
					className={
						`absolute ease-in-out duration-75 z-10 cursor-text ml-0 space-x-none pointer-events-none ` +
						`${
							active || hasValue ? "left-2.5 -top-2 text-xs px-1 bg-white" : "left-4 top-0 text-base flex justify-center items-center"
						} ` +
						`${!hasValue && size === "lg" ? "h-12" : ""} ` +
						`${!hasValue && size === "md" ? "h-10" : ""} ` +
						`${!hasValue && size === "sm" ? "h-8" : ""} ` +
						`${active ? "text-blue" : ""} ` +
						`${isHover ? "lg:text-blue" : ""} ` +
						`${!active && hasValue ? "text-black-secondary" : ""} ` +
						`${!active && !hasValue ? "text-black-tertiary" : ""} ` +
						`${isDisabled ? "text-black-quat " : ""} `
					}
					onClick={() => inputRef?.current?.focus()}
				>
					{placeholder}
				</label>
			)}

			<div
				className={
					`bg-white shadow rounded overflow-hidden overflow-y-auto h-fit cursor-pointer absolute z-40 transform w-full ` +
					`${positionTop ? "origin-bottom bottom-full left-0 mb-2" : "origin-top top-full left-0 mt-1"} ` +
					`${!active ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"} ` +
					`${!fitHeight ? "max-h-56 " : ""} `
				}
			>
				{isSearchable && handleChangeSearchTerm && (
					<div className="h-14 px-4 flex justify-start items-center w-full">
						<SearchBar placeholder={searchPlaceholder} value={searchTerm} onChange={handleChangeSearchTerm} />
					</div>
				)}
				<div
					className={`w-full`}
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

export default LabelDropdownHead;

// ${
//   active ? "border-blue" : "border-black-quin"
// }
// ${
//   value &&
//   (value.length > 0 || value > 0) &&
//   !active &&
//   "border-black-secondary text-black-secondary"
// }
