import React, {KeyboardEvent, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import useClickOutside from "../../../../hooks/useClickOutside";
import ButtonComp from "../../../General/Buttons/ButtonComp";
import {ReactComponent as ArrowDownIcon} from "../../../../assets/svg/arrows/chevron-arrow-down.svg";
import {canShowPreReleaseFeatures} from "../../../../utils/preReleaseConfig";
import MenuItemChild from "./MenuItemChild";

interface Props {
	onClick(e: React.MouseEvent): void;
	path: string;
	icon: React.ReactElement;
	text: string;
	isPreRelease?: boolean;
	subItems: Array<{
		path: string;
		text: string;
		isPreRelease?: boolean;
		onClick?: (e: React.MouseEvent) => void;
		hide?: boolean;
	}>;
}

function MenuItemWithChildren({onClick, path, icon, text, isPreRelease = false, subItems}: Props): JSX.Element {
	if (isPreRelease && !canShowPreReleaseFeatures) {
		return <></>;
	}

	// const userAccount = useSelector((state: IRootState) => state.init.main?.companyDetails.user);
	// const userAccountMeta = useSelector((state: IRootState) => state.init.main?.companyDetails.userAccountsMeta);

	const [open, setOpen] = useState<boolean>(false);
	const [show, setShow] = useState<boolean>(false);
	const [active, setActive] = useState<boolean>(false);
	// const [canApprove, setCanApprove] = useState<boolean>(false);

	const location = useLocation();

	const domNode = useClickOutside(() => {
		if (location.pathname.includes(path)) return;
		setOpen(false);
	});

	useEffect(() => {
		if (location.pathname.includes(path)) {
			setActive(true);
			setOpen(true);
		} else {
			setActive(false);
			setOpen(false);
		}
	}, [location.pathname]);

	/*useEffect(() => {
		if (!userAccount || !userAccountMeta) return;

		// const canApprove = userAccountMeta.find((el) => el.userAccountId === userAccount?.id)?.canApprove();
		setCanApprove(userAccountMeta.find((el) => el.id === userAccount.id)?.canApprove() || false);
	}, [userAccount, userAccountMeta]);*/

	const handleKeypress = (event: KeyboardEvent<HTMLDivElement>) => {
		//it triggers by pressing the enter key
		if (event.key === "Enter") {
			setActive((prev) => !prev);
			setOpen((prev) => !prev);
		}
	};

	return (
		<div className="relative" ref={domNode} data-type="section" tabIndex={-1}>
			<div
				className={`${show ? "bg-white" : "bg-transparent"}`}
				onMouseEnter={() => (active ? setShow(false) : setShow(true))}
				onMouseLeave={() => (active ? setShow(false) : setShow(false))}
				data-type="section"
				onClick={() => setOpen((prev) => !prev)}
				tabIndex={0}
				onKeyDown={handleKeypress}
			>
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
							`flex justify-start items-center h-9 relative w-full tracking-normal  ` +
							`${active ? "text-blue font-medium  antialiased" : ""}`
						}
						data-type="section"
						tabIndex={-1}
					>
						{React.cloneElement(icon, {className: "stroke-current", "data-type": "section", tabIndex: -1})}
						<div className="ml-2 overflow-ellipsis overflow-hidden whitespace-nowrap text-sm" data-type="section" tabIndex={-1}>
							{text}
						</div>
					</div>
					<span
						className={
							`absolute text-lg font-light transition-all right-6 ` +
							`${open ? "transform -rotate-180" : "rotate-0"} ` +
							`${active ? "text-blue" : "text-black-secondary"}`
						}
						data-type="section"
					>
						<ArrowDownIcon className="stroke-current h-3.5 w-3.5" data-type="section" tabIndex={-1} />
					</span>
				</ButtonComp>
			</div>

			<div className={`${open ? "max-h-96 " : "max-h-0"} ` + "transition-all duration-300 ease-in-out overflow-hidden"} tabIndex={-1}>
				<div className="flex flex-col relative" tabIndex={-1}>
					{subItems
						.filter((subItem) => !subItem.hide)
						.map((subItem, index) => (
							<MenuItemChild
								key={index}
								onClick={(e) => {
									onClick(e);
									if (subItem.onClick) {
										subItem.onClick(e);
									}
								}}
								path={subItem.path}
								text={subItem.text}
								isParentOpen={open}
								isPreRelease={subItem.isPreRelease || false}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

export default MenuItemWithChildren;
