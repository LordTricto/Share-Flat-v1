import React, {useEffect, useRef, useState} from "react";

import useClickOutside from "../../../../hooks/useClickOutside";
import ButtonComp from "../../Buttons/ButtonComp";

interface SendableTextareaProps {
	placeholder: string;
	onChangeFunc(newValue: string): void;
	onClickFunc(e: React.MouseEvent): void;
	isLoading?: boolean;
	value: string | null;
	sm?: boolean;
	transactionCard?: boolean;
	buttonText: string;
}

function SendableTextarea({placeholder, onChangeFunc, isLoading, value, transactionCard, buttonText}: SendableTextareaProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [hasValue, setHasValue] = useState(false);

	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
	const domNode = useClickOutside(() => setActive(false));

	useEffect(() => {
		setHasValue(!!value && value.trim().length > 0);
	}, [value]);

	return (
		<div ref={domNode} className={`relative ${isLoading ? "pointer-events-none" : ""}`} data-type={transactionCard ? "transaction-active" : ""}>
			<div
				className={
					`relative cursor-text rounded-lg w-full pt-1 pb-3 outline-none capitalize focus:outline-none transition-all duration-75 ` +
					`leading-relaxed bg-transparent border border-solid shadow-none hover:text-blue lg:hover:border-blue whitespace-nowrap text-base ` +
					`${isLoading ? "pointer-events-none" : "pointer-events-auto"} ` +
					`${isHover ? "text-blue" : ""} ` +
					`${
						hasValue
							? !active
								? "text-black-secondary border-black-quin hover:text-blue lg:hover:border-blue "
								: active
								? "border-blue"
								: "text-black-tertiary border-black-quin hover:text-blue lg:hover:border-blue"
							: active
							? "border-blue text-blue"
							: "text-black-tertiary border-black-quin"
					} `
				}
				onFocus={() => {
					if (textAreaRef.current) {
						textAreaRef.current.focus();
					}
					setActive(true);
				}}
				onBlur={() => {
					setActive(false);
				}}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				onClick={() => {
					if (textAreaRef.current) {
						textAreaRef.current.focus();
					}
					setActive(true);
				}}
				data-type={transactionCard ? "transaction-active" : ""}
			>
				<textarea
					className={` px-4 w-full h-full z-10 placeholder-transparent focus:outline-none focus:border-none resize-none 
						${hasValue ? "text-black-secondary" : ""} 
					  	text-black`}
					ref={textAreaRef}
					value={value || ""}
					placeholder={placeholder}
					onClick={() => setActive(true)}
					onChange={(e) => {
						onChangeFunc(e.target.value);
					}}
					data-type={transactionCard ? "transaction-active" : ""}
				/>
				<label
					htmlFor="text"
					className={`absolute ease-in-out duration-75 z-10 cursor-text space-x-none  ${
						active || hasValue ? "left-2.5 -top-2 text-xs px-1 bg-white " : "left-4 top-3 text-base "
					} 
            ${active ? "text-blue" : ""}
            ${active ? "text-blue" : hasValue ? "text-black-secondary" : "text-black-tertiary"} 
            ${isHover ? "text-blue" : ""}`}
					onClick={() => {
						if (domNode.current) {
							domNode.current.focus();
						}
					}}
					data-type={transactionCard ? "transaction-active" : ""}
				>
					{placeholder}
				</label>
				<div className="flex flex-row justify-end items-end w-full pr-4" data-type={transactionCard ? "transaction-active" : ""}>
					<ButtonComp type="submit" buttonType="primary" color="blue" size="sm" isLoading={isLoading} disable={!hasValue} borderSmall>
						<span className="text-sm">{buttonText}</span>
					</ButtonComp>
				</div>
			</div>
		</div>
	);
}

export default SendableTextarea;
