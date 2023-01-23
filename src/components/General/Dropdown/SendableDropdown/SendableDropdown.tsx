import React, {KeyboardEvent, useEffect, useRef, useState} from "react";

import {ReactComponent as ArrowDown} from "../../../../assets/svg/arrows/chevron-arrow-down.svg";
import {ReactComponent as Cancel} from "../../../../assets/svg/cancel/cancel.svg";
import DropdownLink from "../DropdownComponents/DropdownLink";
import {TailSpin} from "react-loader-spinner";
import isNullOrUndefined from "../../../../utils/isNullOrUndefined";
import useClickOutside from "../../../../hooks/useClickOutside";

// import SearchBar from "../../../DashboardLayout/SearchBar/SearchBar";

interface SendableDropdownProps<T> {
	placeholder: string;
	inputValue: string;
	clickAndClose: boolean;
	data: T[];
	cancelFunc(): void;
	onClickFunc(item: T): void;
	createFunc(value: string): void;
	isLoading: boolean;
	noLabel?: boolean;
	value: string;
	changeValue(newValue: string): void;
}

function SendableDropdown<T extends {name: string}>({
	placeholder,
	inputValue,
	clickAndClose,
	data: options,
	cancelFunc,
	onClickFunc,
	createFunc,
	isLoading,
	noLabel,
	value,
	changeValue,
}: SendableDropdownProps<T>): JSX.Element {
	const [active, setActive] = useState<boolean>(false);
	const [isHover, setIsHover] = useState<boolean>(false);
	const [hasValue, setHasValue] = useState<boolean>(false);
	const [hasInputValue, setHasInputValue] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<T[]>([]);
	const [hasExactOption, setHasExactOption] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const innerHeight = window.innerHeight;
	// const [searchValue, setSearchValue] = useState<string>("");
	// const [searchResults, setSearchResults] = useState<Array<TransactionCategory>>([]);

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

		const exactMatch = (options || []).find((item) => item.name.toLowerCase() === value.toLowerCase());
		setHasExactOption(!isNullOrUndefined(exactMatch));
	}, [options, value]);

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			!hasValue && setActive(true);
		}
	};
	return (
		<div className={`relative flex flex-col justify-start items-center h-full w-full`} ref={domNode}>
			<div
				className={
					`relative cursor-text rounded-lg h-12 w-full  outline-none ` +
					`focus:outline-none transition-all duration-75 whitespace-nowrap text-base leading-relaxed ` +
					`bg-transparent border border-solid shadow-none hover:text-blue lg:hover:border-blue focus:text-blue-focused focus:border-blue-focused` +
					`${hasInputValue && !active ? "text-black-secondary border-black-quin hover:text-blue lg:hover:border-blue" : ""} ` +
					`${hasInputValue && active ? "border-blue" : ""} ` +
					`${!hasInputValue && !active ? "text-black-tertiary border-black-quin" : ""} ` +
					`${!hasInputValue && active ? "border-blue text-blue" : ""} ` +
					`${isLoading ? "pointer-events-none" : "pointer-events-auto"} ` +
					`${isHover ? "text-blue" : ""} `
				}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={() => !hasValue && setActive(true)}
				onKeyDown={handleKeypress}
				tabIndex={0}
			>
				<div className="overflow-hidden relative rounded-lg h-full w-full bg-white flex space-x-4 items-center justify-between font-normal capitalize whitespace-nowrap py-3 px-4 text-base leading-relaxed text-left">
					<input
						id={placeholder}
						name={placeholder}
						ref={inputRef}
						type="text"
						value={value}
						onChange={(e) => changeValue(e.target.value)}
						// disabled={hasInputValue}
						// disabled={options.length <= 5}
						autoComplete="off"
						className={
							`h-10 w-full focus:outline-none focus:border-none bg-transparent ` +
							`${noLabel ? "placeholder-black-tertiary" : "placeholder-transparent"} ` +
							`${hasValue ? "text-black-secondary" : `${active ? "text-black" : "text-black-tertiary"}`} `
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
							`${!active && hasValue ? "text-black-tertiary" : ""}` +
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
				{/* {filteredOptions.length > 4 && (
					<div className="w-90% relative my-2 ml-3 mr-2" tabIndex={-1}>
						<SearchBar placeholder="Search" value={searchValue} onChange={handleChangeSearchValue} />
					</div>
				)} */}

				{filteredOptions.map((item, index) => (
					<DropdownLink onClick={() => onClickFunc(item)} key={index}>
						<div className="flex justify-start items-center h-10 w-full px-4">{item.name}</div>
					</DropdownLink>
				))}

				{!hasExactOption && value.trim().length > 0 && (
					<DropdownLink onClick={() => createFunc(value)}>
						<div className="flex justify-start items-center h-10 w-full text-black hover:text-blue hover:bg-blue-senary px-4">
							<span className="text-blue">Create</span>
							<span className="text-blue ml-1">&quot;{value}&quot;</span>
						</div>
					</DropdownLink>
				)}
			</div>
		</div>
	);
}

export default SendableDropdown;
