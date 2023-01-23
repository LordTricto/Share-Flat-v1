import React, {useEffect, useRef, useState} from "react";

import useClickOutside from "../../../hooks/useClickOutside";

interface TextAreaProps {
	placeholder: string;
	value?: string | null;
	onChangeFunc?(newValue: string): void;
	isLoading?: boolean;
	sm?: boolean;
}

function TextArea({placeholder, value = "", onChangeFunc, isLoading = false, sm = false}: TextAreaProps): JSX.Element {
	const [active, setActive] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [hasValue, setHasValue] = useState(false);
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const domNode = useClickOutside(() => {
		setActive(false);
	});

	useEffect(() => {
		setHasValue(!!value && value.trim().length > 0);
	}, [value]);

	return (
		<div>
			<div className={`relative flex flex-col justify-start items-center h-full w-full`} ref={domNode}>
				<div
					className={`relative py-3 w-full bg-white rounded-lg flex items-center justify-between  font-normal outline-none capitalize focus:outline-none transition-all duration-150 whitespace-nowrap  text-base leading-relaxed border border-solid shadow-none text-left hover:text-blue lg:hover:border-blue 
          ${
				hasValue
					? !active
						? "text-black-secondary border-black-quin hover:text-blue lg:hover:border-blue "
						: active
						? "border-blue"
						: "text-black-tertiary border-black-quin hover:text-blue lg:hover:border-blue"
					: active
					? "border-blue text-blue"
					: "text-black-tertiary border-black-quin"
			}
          ${isLoading ? "pointer-events-none" : ""}
          `}
					onFocus={() => {
						if (textAreaRef.current) {
							textAreaRef.current.focus();
						}
						setActive(true);
					}}
					onBlur={() => {
						setActive(false);
					}}
					onClick={() => {
						if (textAreaRef.current) {
							textAreaRef.current.focus();
							setActive(true);
						}
					}}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					ref={domNode}
				>
					<textarea
						className={
							`px-4 w-full z-10 placeholder-transparent focus:outline-none focus:border-none rounded-lg text-black resize-none ` +
							`${hasValue ? "text-black-secondary" : ""} ` +
							`${sm ? "h-12" : "h-12"} `
						}
						ref={textAreaRef}
						value={value || ""}
						placeholder={placeholder}
						cols={30}
						rows={10}
						// ref={domNode}
						onClick={() => setActive(true)}
						onChange={(e) => {
							if (onChangeFunc) {
								onChangeFunc(e.target.value.trim().length > 0 ? e.target.value : "");
							}
						}}
					/>
					<label
						htmlFor={placeholder}
						className={`z-10 absolute ease-in-out duration-150 h-2  pointer-events-none space-x-none ${
							active || hasValue ? "left-2.5 -top-2 text-xs bg-white px-1" : "left-4 top-3 text-base "
						} ${active ? "text-blue" : hasValue ? "text-black-secondary" : "text-black-tertiary"}  ${isHover ? "text-blue" : ""}`}
					>
						{placeholder}
					</label>
				</div>
			</div>
		</div>
	);
}

export default TextArea;
