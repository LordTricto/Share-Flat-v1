import React, {useLayoutEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import ButtonComp from "../../../General/Buttons/ButtonComp";
import {canShowPreReleaseFeatures} from "../../../../utils/preReleaseConfig";

interface Props {
	onClick(e: React.MouseEvent): void;
	path: string;
	text: string;
	isPreRelease?: boolean;
	isParentOpen: boolean;
}

function MenuItemChild({onClick, path, text, isPreRelease = false, isParentOpen}: Props): JSX.Element {
	if (isPreRelease && !canShowPreReleaseFeatures) {
		return <></>;
	}

	const [active, setActive] = useState(false);
	const location = useLocation();

	useLayoutEffect(() => {
		location.pathname.includes(path) ? setActive(true) : setActive(false);
	}, [location.pathname]);

	return (
		<Link to={path} onClick={onClick} tabIndex={isParentOpen ? 0 : -1}>
			<div className={`${active ? "" : "hover:bg-white"}`} tabIndex={-1}>
				<ButtonComp ripple="dark" color="transparent" type="button" buttonType="primary" data-type="section" className="pl-6" noTabIndex>
					<div className="flex justify-start items-center h-9 w-full relative" tabIndex={-1}>
						<div
							className={
								`ml-6 overflow-ellipsis overflow-hidden whitespace-nowrap text-sm  tracking-normal ` +
								`${active ? "text-blue font-medium  antialiased" : ""}`
							}
							tabIndex={-1}
						>
							{text}
						</div>
					</div>
				</ButtonComp>
			</div>
		</Link>
	);
}

export default MenuItemChild;
