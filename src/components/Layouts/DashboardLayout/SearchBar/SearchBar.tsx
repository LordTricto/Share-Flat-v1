import React, {useEffect, useRef, useState} from "react";

import {Link} from "react-router-dom";
import useClickOutside from "../../../../hooks/useClickOutside";
import {ReactComponent as SearchIcon} from "../../../../assets/svg/search/search.svg";
import {AccountsSearchCard} from "./AccountsSearch";

interface SearchBarProps {
	placeholder: string;
}

function SearchBar({placeholder}: SearchBarProps): JSX.Element {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [hasSearchTerm, setHasSearchTerm] = useState<boolean>(false);
	const [active, setActive] = useState<boolean>(false);

	const inputRef = useRef<HTMLInputElement | null>(null);

	const domNode = useClickOutside(() => {
		setActive(false), (eventTarget: HTMLElement) => eventTarget.dataset.type !== "transaction";
	});

	useEffect(() => {
		setHasSearchTerm(searchTerm.trim().length > 0);
	}, [searchTerm]);

	return (
		<div
			className={
				`h-10 w-full mx-auto max-w-xl border border-solid hidden lg:flex justify-start items-center px-4 cursor-text ` +
				`relative transition-all duration-150 ease-in-out focus:outline-none focus:text-blue focus:border-blue-focused  ` +
				`${active ? `border-blue text-blue ${hasSearchTerm ? "rounded-t-lg rounded-b-none" : "rounded-custom"} ` : ""} ` +
				`${!active ? "rounded-custom" : ""} ` +
				`${!active && hasSearchTerm ? "border-blue text-black" : ""} ` +
				`${!active && !hasSearchTerm ? "border-black-quin hover:text-blue hover:border-blue focus:border-blue text-black-quat" : ""} `
			}
			ref={domNode}
			onClick={() => {
				setActive(true);
				if (inputRef.current) {
					inputRef.current.focus();
				}
			}}
			tabIndex={0}
			onFocus={() => {
				if (inputRef.current) {
					inputRef.current.focus();
				}
				setActive(true);
			}}
			// onBlur={() => {
			// setActive(false);
			// }}
			data-type="transaction"
		>
			<SearchIcon className="stroke-current" tabIndex={-1} data-type="transaction" />

			<input
				type="text"
				ref={inputRef}
				className="ml-2 w-full text-sm text-black-secondary outline-none focus:outline-none font-normal antialiased placeholder-black-quat"
				placeholder={placeholder}
				value={searchTerm}
				onChange={(e) => {
					setSearchTerm(e.target.value);
				}}
				maxLength={40}
				tabIndex={-1}
				data-type="transaction"
			/>

			{hasSearchTerm && (
				<span
					className="text-sm text-blue cursor-pointer pr-1"
					onClick={(e) => {
						inputRef.current?.blur();
						setSearchTerm("");
						setActive(false);
						e.preventDefault();
						e.stopPropagation();
					}}
					tabIndex={-1}
					data-type="transaction"
				>
					Clear
				</span>
			)}

			<div className="absolute -bottom-0.5 left-0 w-full " tabIndex={-1} data-type="transaction">
				<div
					className={
						`w-full absolute bg-white shadow-custom py-4 z-40 rounded-b-lg max-h-120 overflow-auto ` +
						`${!active || !hasSearchTerm ? "hidden" : ""}`
					}
					tabIndex={-1}
					data-type="transaction"
				>
					{/* //Accounts */}
					<div className="flex flex-row justify-between border-b pb-2.5  border-grey-tertiary px-4" tabIndex={-1} data-type="transaction">
						<div className="" tabIndex={-1} data-type="transaction">
							<p className="text-xs text-black-tertiary" data-type="transaction">
								Accounts
							</p>
						</div>
						<div className="" tabIndex={-1} data-type="transaction">
							<p className="text-xs text-blue-tertiary hover:text-blue cursor-pointer" tabIndex={-1} data-type="transaction">
								<Link
									to={`/payments/recipients/${searchTerm}`}
									onClick={() => {
										inputRef.current?.blur();
										setSearchTerm("");
									}}
									tabIndex={active ? 0 : -1}
									data-type="transaction"
								>
									Search Recipients
								</Link>
							</p>
						</div>
					</div>
					<div className="accounts-search" tabIndex={-1} data-type="transaction">
						<AccountsSearchCard
							index={0}
							onClick={() => {
								setActive(false);
								setSearchTerm("");
								inputRef.current?.blur();
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SearchBar;
