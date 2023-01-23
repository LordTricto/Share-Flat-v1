import React, {useEffect, useState} from "react";

import {Calendar} from "react-date-range";
import Input from "./Input";
import moment from "moment";
import useClickOutside from "../../../hooks/useClickOutside";

interface DateComponentProps {
	date: Date | null;
	setDate: React.Dispatch<React.SetStateAction<Date | null>>;
	placeholder: string;
}
function DateComponent(props: DateComponentProps): JSX.Element {
	const {date, setDate, placeholder} = props;
	const [active, setActive] = useState<boolean>(false);
	const [positionTop, setPositionTop] = useState<boolean>(false);
	const [y, setY] = useState<number | null>(null);

	const domNode = useClickOutside(() => {
		setActive(false);
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

	return (
		<>
			<div className="relative h-12 w-full z-2 cursor-pointer " ref={domNode} onClick={() => setActive(true)}>
				<div className="absolute top-0 left-0 z-10 h-full w-full pointer-events-none">
					<Input type="text" placeholder={placeholder} name="date" value={date ? moment(date).format("YYYY-MM-DD") : undefined} readOnly />
				</div>
				<div
					className={
						`absolute bg-white px-4 border rounded-lg w-full 2xs:w-max max-w-sm z-20 ` +
						`${active ? "block" : "hidden"} ` +
						`${positionTop ? "origin-bottom bottom-full left-0 mb-2" : "origin-top top-full left-0 mt-1"} `
					}
				>
					<Calendar date={date || undefined} onChange={(item) => setDate(item)} />
				</div>
			</div>
		</>
	);
}

export default DateComponent;
