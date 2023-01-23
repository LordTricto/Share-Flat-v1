import React, {useEffect, useRef, useState} from "react";

import {ReactComponent as ArrowDown} from "../../../../assets/svg/arrows/chevron-arrow-down.svg";
import {ReactComponent as Cancel} from "../../../../assets/svg/cancel/cancel.svg";
import DropdownLink from "../DropdownComponents/DropdownLink";
import {TailSpin} from "react-loader-spinner";
import useClickOutside from "../../../../hooks/useClickOutside";

interface GeneralDropdownProps<T> {
	placeholder: string;
	inputValue: string;
	clickAndClose: boolean;
	data: T[];
	cancelFunc(): void;
	onClickFunc(item: T): void;
	isLoading: boolean;
	noLabel?: boolean;
	value: string;
	changeValue(newValue: string): void;
}

function GeneralDropdown<T extends {name: string}>({
	placeholder,
	inputValue,
	clickAndClose,
	data: options,
	cancelFunc,
	onClickFunc,
	isLoading,
	noLabel,
	value,
	changeValue,
}: GeneralDropdownProps<T>): JSX.Element {
	const [active, setActive] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hasValue, setHasValue] = useState<boolean>(false);
	const [hasInputValue, setHasInputValue] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const innerHeight = window.innerHeight;

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		const onScroll = () => {
			if (domNode.current) {
				setY(domNode.current.getBoundingClientRect()?.top);
			}
		};

		document.addEventListener("scroll", onScroll);
		return () => {
			document.removeEventListener("scroll", onScroll);
		};
	});

	useEffect(() => {
		if (y) {
			const shouldSetPositionTop = y > innerHeight / 2;
			setPositionTop(shouldSetPositionTop);
		}
	}, [innerHeight, y]);

	useEffect(() => {
		changeValue(inputValue || "");
	}, [changeValue, inputValue]);

	useEffect(() => {
		setHasValue(!!value && value.length > 0);
	}, [value]);

	useEffect(() => {
		setHasInputValue(!!inputValue && inputValue.length > 0);
	}, [inputValue]);

	useEffect(() => {
		const filtered = (options || []).filter((item: T) => {
			if (!item || !item.name) {
				return false;
			}
			if (!value || value.trim().length === 0) {
				return true;
			}
			return item.name.toLowerCase().includes(value.toLowerCase());
		});
		setFilteredOptions(filtered);
	}, [options, value]);

	return (
		<>
			<div className={`relative flex flex-col justify-start items-center h-full w-full`} ref={domNode}>
				<div
					className={
						`relative cursor-text rounded-lg h-12 w-full  outline-none capitalize ` +
						`focus:outline-none transition-all duration-75 whitespace-nowrap text-base leading-relaxed ` +
						`bg-transparent border border-solid shadow-none hover:text-blue hover:border-blue ` +
						`${hasInputValue && !active ? "text-black-secondary border-black-secondary hover:text-blue hover:border-blue" : ""} ` +
						`${hasInputValue && active ? "border-blue" : ""} ` +
						`${!hasInputValue && !active ? "text-black-tertiary border-black-quin" : ""} ` +
						`${!hasInputValue && active ? "border-blue text-blue" : ""} ` +
						`${isLoading ? "pointer-events-none" : "pointer-events-auto"} ` +
						`${isHover ? "text-blue" : ""} `
					}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					onClick={() => !hasValue && setActive(true)}
				>
					<div className="overflow-hidden relative rounded-lg h-full w-full bg-white flex space-x-4 items-center justify-between font-normal capitalize whitespace-nowrap py-3 px-4 text-base leading-relaxed text-left">
						<input
							id={placeholder}
							name={placeholder}
							ref={inputRef}
							type="text"
							value={value}
							onChange={(e) => changeValue(e.target.value)}
							disabled={hasInputValue}
							autoComplete="off"
							className={
								`h-10 w-full focus:outline-none focus:border-none bg-transparent ` +
								`${noLabel ? "" : "placeholder-transparent"} ` +
								`${hasValue ? "text-black-secondary" : `${active ? "text-black" : "text-black"}`} `
							}
							placeholder={placeholder}
						/>

						{isLoading && (
							<div className="ml-3 h-full flex justify-center items-center pointer-events-none">
								<TailSpin color="#5466F9" height={20} width={20} />
							</div>
						)}

						{!isLoading && hasValue && (
							<div
								className={
									`flex justify-end items-center cursor-pointer ` +
									`${active ? "text-blue" : ""} ` +
									`${!active && hasInputValue ? "text-black-secondary" : ""} ` +
									`${isHover ? "text-blue" : ""} `
								}
								onClick={() => {
									// e.preventDefault();
									// e.stopPropagation();
									setActive(false);
									if (!inputValue) return changeValue("");
									cancelFunc();
								}}
							>
								<Cancel className="stroke-current h-3.5 w-3.5" />
							</div>
						)}

						{!isLoading && !hasValue && (
							<span
								className={
									`flex justify-end items-center transition-transform duration-150 transform ` +
									`${active ? "-rotate-180 text-blue" : "rotate-0"}`
								}
							>
								<ArrowDown className="stroke-current h-3.5 w-3.5" />
							</span>
						)}
					</div>

					{!noLabel && (
						<label
							htmlFor="text"
							className={
								`absolute ease-in-out duration-75 z-10 cursor-text pointer-events-none ` +
								`${
									active || hasValue
										? "left-2.5 -top-2 text-xs px-1 bg-white "
										: "left-4 top-0 text-base h-12 flex justify-center items-center "
								} ` +
								`${active || isHover ? "text-blue" : ""} ` +
								`${!active && hasValue ? "text-black-secondary" : ""}` +
								`${!active && !hasValue ? "text-black-tertiary" : ""}`
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

				<div
					className={
						`bg-white shadow rounded overflow-hidden overflow-y-auto max-h-60 h-fit cursor-pointer absolute z-40 transform w-full ` +
						`${positionTop ? "origin-bottom bottom-full left-0 mb-1" : "origin-top top-full left-0 mt-1"} ` +
						`${!active ? "opacity-0 pointer-events-none scale-0" : "opacity-100 scale-100"}`
					}
					onClick={() => {
						if (clickAndClose) return setActive((prev) => !prev);
					}}
				>
					{filteredOptions.map((item, index) => (
						<DropdownLink onClick={() => onClickFunc(item)} key={index}>
							<div className="flex justify-start items-center h-10 w-full px-4">{item.name}</div>
						</DropdownLink>
					))}
				</div>
			</div>
		</>
	);
}

export default GeneralDropdown;
