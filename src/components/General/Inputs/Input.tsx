import {ExcludeProps, InputPropsToExclude} from "./types";
import React, {InputHTMLAttributes, ReactNode, useEffect, useRef, useState} from "react";

import {ReactComponent as PercentageIcon} from "../../../assets/svg/signs/percentage.svg";
import useClickOutside from "../../../hooks/useClickOutside";

// use to generate a unique id for the input
let inputCounter = 0;

function IconContainer({show, children, className}: {show: boolean; children: React.ReactNode; className?: string}): JSX.Element {
	return (
		<div
			className={
				"cursor-default flex justify-end items-center transition-all ease-in-out duration-75 text-black-secondary " +
				`${show ? "opacity-100" : "opacity-0"} ` +
				`${className || ""}`
			}
		>
			{children}
		</div>
	);
}

interface InputProps extends ExcludeProps<InputHTMLAttributes<HTMLInputElement>, InputPropsToExclude> {
	// interface InputProps {
	placeholder?: ReactNode;
	value?: string | number | undefined;
	type?: string;
	icon?: ReactNode;
	inputSize?: "sm" | "md" | "lg";
	appendIcon?: ReactNode;
	appendOuterIcon?: ReactNode;
	iconType?: string;
	onChange?(value: string): void;
	isFocused?: boolean;
	isLoading?: boolean;
	alwaysActive?: boolean;
	isDisabled?: boolean;
	fullWidth?: boolean;
	readOnly?: boolean;
	helperText?: React.ReactNode;
	mobileHelperText?: boolean;
}
function Input({
	placeholder,
	value,
	type,
	icon,
	appendIcon,
	appendOuterIcon,
	iconType,
	onChange,
	isFocused,
	isLoading,
	inputSize = "lg",
	alwaysActive = false,
	isDisabled = false,
	fullWidth = false,
	readOnly = false,
	helperText = "",
	mobileHelperText = false,
	...otherProps
}: InputProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const [uniqueId, setUniqueId] = useState<string>("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	const domNode = useClickOutside(() => setActive(false));

	useEffect(() => {
		setUniqueId(`input-${++inputCounter}`);
	}, []);

	useEffect(() => {
		if (isFocused) {
			if (inputRef.current) {
				inputRef.current.focus();
			}
			setActive(true);
		}
	}, [isFocused]);

	useEffect(() => {
		setHasValue(!!value && String(value).length > 0);
	}, [value]);

	return (
		<div className={"flex flex-col items-center relative w-full " + (fullWidth ? "w-full" : "")}>
			<div
				className={
					`relative flex flex-col justify-start items-center h-full w-full ` +
					`${isDisabled ? "pointer-events-none" : ""} ` +
					`${readOnly ? "pointer-events-none" : ""} ` +
					`${!(readOnly && isDisabled) ? "cursor-text" : ""}`
				}
				ref={domNode}
			>
				<div
					onFocus={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
						setActive(true);
					}}
					onBlur={() => {
						setActive(false);
					}}
					className={
						`relative w-full bg-white rounded-lg flex space-x-1 items-center justify-between font-normal outline-none focus:outline-none transition-all duration-150 whitespace-nowrap text-base leading-relaxed border border-solid shadow-none text-left hover:text-blue lg:hover:border-blue focus:text-blue focus:border-blue-focused ` +
						`${
							hasValue || alwaysActive
								? !active
									? "text-black-secondary border-black-quin hover:text-blue lg:hover:border-blue "
									: active
									? "border-blue"
									: "text-black-tertiary border-black-quin hover:text-blue lg:hover:border-blue focus:text-blue focus:border-blue-focused "
								: active
								? "border-blue text-blue"
								: "text-black-tertiary border-black-quin focus:text-blue focus:border-blue-focused "
						} ` +
						`${inputSize === "lg" ? "h-12" : ""} ` +
						`${inputSize === "md" ? "h-10" : ""} ` +
						`${inputSize === "sm" ? "h-8" : ""} ` +
						`${isLoading ? "pointer-events-none" : ""} ` +
						`${icon ? "px-4" : ""}`
					}
					onClick={() => {
						if (inputRef.current) {
							inputRef.current.focus();
						}
						setActive(true);
					}}
					onMouseEnter={() => !isDisabled && setIsHover(true)}
					onMouseLeave={() => !isDisabled && setIsHover(false)}
					ref={domNode}
				>
					{icon && (
						<span
							className={
								`cursor-default flex justify-end items-center transition-all ease-in-out duration-75 text-black-secondary ` +
								`${active || alwaysActive || hasValue ? "opacity-100" : "opacity-0"}`
							}
						>
							{icon}
						</span>
					)}
					<input
						ref={inputRef}
						type={type ? type : "text"}
						value={value || ""}
						onChange={(e) => onChange && onChange(e.target.value)}
						className={
							`py-3 h-full w-full z-10 placeholder-transparent focus:outline-none focus:border-none rounded-lg bg-white ` +
							`${alwaysActive || hasValue ? "text-black-secondary" : "text-black"} ` +
							`${isDisabled ? "text-black-quat bg-transparent " : ""} ` +
							`${!icon ? "px-4" : ""}`
						}
						id={otherProps.id || uniqueId}
						disabled={isDisabled}
						tabIndex={readOnly || isDisabled ? -1 : 0}
						{...otherProps}
					/>
					{iconType === "percentage" ? (
						<span
							className={` cursor-default flex justify-start items-center transition-all ease-in-out duration-75 pr-4 ${
								active || alwaysActive || hasValue ? "opacity-100" : "opacity-0"
							}`}
						>
							<PercentageIcon className="fill-current h-3.5 w-3.5" />
						</span>
					) : (
						appendIcon && <IconContainer show={active || alwaysActive || hasValue}>{appendIcon}</IconContainer>
					)}
					{appendOuterIcon && (
						<span className="px-3">
							<IconContainer
								show
								className={`${
									hasValue || alwaysActive
										? !active
											? "text-black-secondary hover:text-blue "
											: active
											? ""
											: "text-black-tertiary hover:text-blue "
										: active
										? "text-blue"
										: "text-black-tertiary"
								} `}
							>
								{appendOuterIcon}
							</IconContainer>
						</span>
					)}
					{placeholder && (
						<label
							// htmlFor={otherProps.id || uniqueId}
							// className={`z-10 absolute  ease-in-out duration-150 h-2 space-x-none pointer-events-none ${
							// active || alwaysActive || hasValue
							// ? "left-2.5 -top-2 text-xs bg-white px-1 "
							// : "left-4 top-0 text-base h-full flex justify-center items-center "
							// } ${active ? "text-blue" : alwaysActive || hasValue ? "text-black-tertiary " : "text-black-tertiary "}  ${
							// isHover ? "text-blue" : ""
							// }`}
							htmlFor={otherProps.id || uniqueId}
							className={
								"z-10 absolute ease-in-out duration-150 h-2 cursor-text ml-0!" +
								`${active || alwaysActive || hasValue ? " left-2.5 -top-2 px-1 text-xs bg-white" : " left-4 text-base top-3"} ` +
								`${active ? "text-blue" : ""} ` +
								`${isHover ? "lg:text-blue" : ""} ` +
								`${!active && (alwaysActive || hasValue) ? "text-black-secondary" : ""} ` +
								`${!active && !(alwaysActive || hasValue) ? "text-black-tertiary" : ""} ` +
								`${isDisabled ? "text-black-quat " : ""} `
							}
							onClick={() => {
								if (inputRef.current) {
									inputRef.current.focus();
								}
							}}
						>
							{placeholder}
						</label>
					)}
				</div>
			</div>
			{helperText && (
				<span
					className={
						`text-xs text-black-tertiary leading-4 pt-2 ` +
						`${mobileHelperText ? "lg:hidden" : ""} ` +
						`${!mobileHelperText ? "" : ""} ` +
						`${isDisabled ? "text-black-quat " : ""} `
					}
					// data-type={dataType}
				>
					{helperText}
				</span>
			)}
		</div>
	);
}

export default Input;
