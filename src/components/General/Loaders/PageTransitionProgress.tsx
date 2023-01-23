import React, {useEffect, useState} from "react";
import TopBarProgress from "react-topbar-progress-indicator";
import {TailSpin} from "react-loader-spinner";
import {useLocation} from "react-router-dom";

function PageTransitionProgress(): JSX.Element {
	TopBarProgress.config({
		barColors: {
			0: "#5466f8",
			"1.0": "#5466f8",
		},
		shadowBlur: 5,
	});

	const [progress, setProgress] = useState(false);
	const [prevLoc, setPrevLoc] = useState("");
	const location = useLocation();

	useEffect(() => {
		setPrevLoc(location.pathname);
		setProgress(true);
		if (location.pathname === prevLoc) {
			setPrevLoc("");
		}
	}, [location]);

	useEffect(() => {
		setProgress(false);
	}, [prevLoc]);

	return (
		<>
			{progress && <TopBarProgress />}
			{progress && (
				<>
					<div className="absolute top-0 right-0 z-50 w-full flex justify-end items-end">
						<TailSpin color="#5466F9" height={20} width={20} />
					</div>
				</>
			)}
		</>
	);
}

export default PageTransitionProgress;
