import React, {ChangeEvent, useState} from "react";

import {ReactComponent as CancelRuleIcon} from "../../../assets/svg/cancel/cancel-blue.svg";
import {ReactComponent as SearchIcon} from "../../../../../../assets/svg/search/search.svg";
import useClickOutside from "../../../hooks/useClickOutside";
import useElementFocus from "../../../hooks/useElementFocus";

interface SearchBarProps {
	value: string;
	onChange: (newValue: string) => void;
	placeholder?: string;
	dropdownUsage?: boolean;
}

function SearchBar({value, onChange, placeholder = "", dropdownUsage = false}: SearchBarProps): JSX.Element {
	const [active, setActive] = useState(false);

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	const [inputRef, focusInput] = useElementFocus<HTMLInputElement>();

	return (
		<div
			className={
				`border-solid border ` +
				`h-10 w-full rounded-custom border border-solid flex justify-start items-center px-4 relative float-left transition-all duration-150 ease-in-out focus:outline-none focus:text-blue focus:border-blue-focused ` +
				`${active || value.length > 0 ? "border-blue text-blue" : " "} ` +
				`${!(active || value.length > 0) ? "border-black-quin text-black-quat" : " "} `
			}
			ref={domNode}
			onClick={() => {
				setActive(true);
				focusInput();
			}}
			data-type={dropdownUsage && "dropdown"}
			tabIndex={0}
			onFocus={() => {
				setActive(true);
				focusInput();
			}}
			onBlur={() => {
				setActive(false);
			}}
		>
			<SearchIcon className="stroke-current" data-type={dropdownUsage && "dropdown"} />
			<input
				type="text"
				ref={inputRef}
				className="ml-2 w-full text-sm text-black-secondary outline-none focus:outline-none font-normal  antialiased placeholder-black-quat  overflow-ellipsis overflow-hidden whitespace-nowrap"
				placeholder={placeholder}
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
				data-type={dropdownUsage && "dropdown"}
			/>

			{!!value.length && (
				<span
					className="text-sm text-blue cursor-pointer"
					onClick={() => {
						setActive(false);
						onChange("");
					}}
					data-type={dropdownUsage && "dropdown"}
				>
					<CancelRuleIcon data-type={dropdownUsage && "dropdown"} />
				</span>
			)}
		</div>
	);
}

export default SearchBar;
