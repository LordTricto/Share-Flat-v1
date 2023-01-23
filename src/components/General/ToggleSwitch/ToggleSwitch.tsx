import React, {useCallback, useState} from "react";

interface SwitchProps {
	isActive: boolean;

	onToggle: (state: boolean) => void;
}

function ToggleSwitch({isActive = false, onToggle}: SwitchProps): JSX.Element {
	const [active, setActive] = useState(isActive);

	const handleToggle = useCallback(() => {
		setActive((prev) => !prev);
		onToggle(!active);
	}, []);

	return (
		<div
			role="checkbox"
			tabIndex={0}
			onClick={handleToggle}
			aria-checked={active ? "true" : "false"}
			className={`flex items-center cursor-pointer w-9 h-5 rounded-full relative px-1.5 ` + `${active ? "bg-blue" : "bg-grey justify-end"}`}
		>
			<div
				className={
					`w-4 h-4 rounded-full absolute transform duration-200 ease-out bg-white left-0.5 ` +
					`${active ? "translate-x-4" : "translate-x-0"}`
				}
			/>
		</div>
	);
}

export default ToggleSwitch;
