import {DropdownItem, DropdownItemValueType} from "../../../helpers/types";
import React, {useCallback, useEffect, useState} from "react";

import CustomSelect from "./CustomSelect";
import Input from "../Inputs/Input";

interface Props<T extends DropdownItemValueType, U extends DropdownItemValueType> {
	placeholder?: string;
	value: T | U | undefined;
	otherValue: string | undefined;
	options: Array<DropdownItem<T>>;
	otherOptionValue: U; // the "value" that will be passed to onChange when the user selects the "other" option
	onSelect: (value: T | U | undefined, otherText: string | undefined) => void;
	canCancel?: boolean;
	onCancel?: () => void;
	reset?: () => void;
	resetDropdownValue?: () => void;
}

function CustomSelectWithOther<T extends DropdownItemValueType, U extends DropdownItemValueType>(props: Props<T, U>): JSX.Element {
	const [showSelect, setShowSelect] = useState(true);
	const [optionsWithOther, setOptionsWithOther] = useState<Array<DropdownItem<T | U>>>([]);
	const [autofocusTextInput, setAutofocusTextInput] = useState<boolean>(false);
	const [initialValue, setInitialValue] = useState<T | U | undefined>(undefined);

	// add "other" to the display options
	useEffect(() => {
		setOptionsWithOther([...props.options, {value: props.otherOptionValue, text: "Other"}]);
	}, [props.options, props.otherOptionValue]);

	const switchToInput = (focus = true) => {
		// only set this here when switching between dropdown and input, so that it does not autofocus when the component first loads
		if (focus) {
			setAutofocusTextInput(true);
		}
		props.resetDropdownValue && props.resetDropdownValue();
		setShowSelect(false);
	};

	const switchToDropdown = useCallback(() => {
		setAutofocusTextInput(false);
		setShowSelect(true);
		if (props.reset) {
			props.reset();
		} else {
			props.onSelect(initialValue, undefined);
		}
	}, [props.reset, initialValue]);

	// useEffect(() => {
	// if (props.value === props.otherOptionValue && showSelect) {
	// switchToInput(false);
	// }
	// if (props.value !== props.otherOptionValue && !showSelect) {
	// switchToDropdown();
	// }
	// }, [props.value, props.otherOptionValue, showSelect]);

	//keep track of initial value
	useEffect(() => {
		if (props.otherValue) return;
		setInitialValue(props.value);
	}, [props.value, props.otherValue]);

	useEffect(() => {
		if (!props.otherValue) return;
		setShowSelect(false);
	}, [props.otherValue]);

	return (
		<>
			{showSelect && (
				<CustomSelect
					placeholder={props.placeholder}
					value={props.value}
					options={optionsWithOther}
					onSelect={(value: T | U | undefined) => {
						if (value === props.otherOptionValue) {
							switchToInput();
						}
						if (value !== props.otherOptionValue) {
							props.onSelect(value, undefined);
						}
					}}
					canCancel={props.canCancel}
					onCancel={props.onCancel}
					// clickOutsideFunc={() => props.onSelect(initialValue, undefined)}
				/>
			)}

			{!showSelect && (
				<Input
					placeholder={props.placeholder}
					value={props.otherValue}
					// Can change the icon
					icon={
						<>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								preserveAspectRatio="xMidYMid meet"
								viewBox="0 0 24 24"
								className={"cursor-pointer"}
								onClick={switchToDropdown}
							>
								<path fill="currentColor" d="M20 11v2H8l5.5 5.5l-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5L8 11h12Z" />
							</svg>
							&nbsp; Other:
						</>
					}
					type="text"
					onChange={(text) => {
						props.onSelect(props.otherOptionValue, text);
					}}
					isFocused={autofocusTextInput}
					alwaysActive={true}
				/>
			)}
		</>
	);
}

export default CustomSelectWithOther;
