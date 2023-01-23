import {useEffect, useState} from "react";

import moment from "moment";

const dateFormat = (date: Date | null): string => {
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {
		setFormattedDate(`${moment(date).format("DD")} ${moment(date).format("MMMM").slice(0, 3)}, ${moment(date).format("YYYY")}`);
	}, [date]);

	return formattedDate;
};

export default dateFormat;
