import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import ButtonComp from "../../../General/Buttons/ButtonComp";
import {canShowPreReleaseFeatures} from "../../../../utils/preReleaseConfig";

interface Props {
	onClick(e: React.MouseEvent): void;
	path: string;
	icon: React.ReactElement;
	text: string;
	isPreRelease?: boolean;
}

function MenuItem({onClick, path, icon, text, isPreRelease = false}: Props): JSX.Element {
	if (isPreRelease && !canShowPreReleaseFeatures) {
		return <></>;
	}

	const [active, setActive] = useState(false);
	const location = useLocation();

	useEffect(() => {
		setActive(location.pathname === path);
	}, [location.pathname]);

	return (
		<Link to={path} onClick={onClick} data-type="section">
			<div className={` ${active ? "" : "hover:bg-white "}`} data-type="section" tabIndex={-1}>
				<ButtonComp
					ripple="dark"
					color="transparent"
					type="button"
					buttonType="primary"
					data-type="section"
					className="pl-6"
					noTabIndex
					fullWidth
				>
					<div
						className={
							`flex justify-start items-center h-9 relative w-full tracking-normal ` +
							`${active ? "text-blue font-medium  antialiased" : ""}`
						}
						data-type="section"
						tabIndex={-1}
					>
						{React.cloneElement(icon, {className: "stroke-current", "data-type": "section", tabIndex: -1})}
						<div className="ml-2 overflow-ellipsis overflow-hidden whitespace-nowrap text-sm" tabIndex={-1} data-type="section">
							{text}
						</div>
					</div>
				</ButtonComp>
			</div>
		</Link>
	);
}

export default MenuItem;
