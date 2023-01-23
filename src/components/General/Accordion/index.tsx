import React, {ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

import {ReactComponent as ChevronUpIcon} from "../../../assets/svg/arrows/chevron-arrow-up.svg";
import {ReactComponent as GreenCheckIcon} from "../../../assets/svg/accordion/accordion-green-check.svg";
import {ReactComponent as GreyCheckIcon} from "../../../assets/svg/accordion/accordion-grey-check.svg";

// import useClickOutside from "../../../hooks/useClickOutside";

interface Props {
	header: ReactNode;
	subTitle?: string;
	subTitle2?: string;
	toggle?: () => void;
	isOpened?: boolean | undefined;
	isClosed?: boolean | undefined;
	hasCheck?: boolean | undefined;
	checkActive?: boolean | undefined;
	noPaddingTop?: boolean | undefined;
	children: ReactNode;
}

function Accordion(props: Props): JSX.Element {
	const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);
	// const [childHeight, setChildHeight] = useState<number>(0);
	const childDomRef = useRef<HTMLDivElement | null>(null);

	// const domNode = useClickOutside(() => {
	// setIsAccordionOpen(false);
	// props.toggle && props.toggle();
	// });
	// const domNode = useClickOutside(() => {
	// setActive(false), (eventTarget: HTMLElement) => eventTarget.dataset.type !== "transaction";
	// });

	// const domNode = useClickOutside(() => {
	// setIsAccordionOpen(false), (eventTarget: HTMLElement) => eventTarget.dataset.type !== "transaction";
	// });

	useLayoutEffect(() => {
		if (props.isOpened === undefined) return;
		if (!props.isOpened) return setIsAccordionOpen(false);
		setIsAccordionOpen(true);
	}, [props.isOpened]);

	useEffect(() => {
		if (!props.isClosed) return;
		setIsAccordionOpen(true);
	}, [props.isClosed]);

	// useEffect(() => {
	// if (!childDomRef.current) return;
	// setChildHeight(childDomRef.current.getBoundingClientRect().height);
	// }, [
	// childDomRef.current,
	// childDomRef.current?.getBoundingClientRect().width,
	// childDomRef.current?.getBoundingClientRect().height,
	// childDomRef.current?.clientHeight,
	// childDomRef.current?.offsetHeight,
	// ]);

	const handleToggleAccordion = useCallback(() => {
		setIsAccordionOpen((prev) => !prev);
		props.toggle && props.toggle();
	}, [props.toggle]);

	return (
		// <div className="w-full" ref={domNode}>
		<div className="w-full">
			<div className="w-full">
				<div
					className={
						`w-full cursor-pointer border0.2 justify-between border-grey-secondary border-box rounded-md ` +
						`${props.noPaddingTop ? "" : ""} `
					}
					onClick={handleToggleAccordion}
				>
					<div className="cursor-pointer flex flex-row justify-between items-center font-normal text-md">
						<div className="flex flex-col justify-start font-medium text-md text-black-secondary">
							<div className="flex justify-start items-start">
								<div className="mt-0.5">
									{props.hasCheck && props.checkActive && <GreenCheckIcon />}
									{props.hasCheck && !props.checkActive && <GreyCheckIcon />}
								</div>
								<span className={`${props.hasCheck ? "ml-2" : ""}`}>{props.header}</span>
							</div>
							{props.subTitle && (
								<div className="text-black-tertiary text-sm font-normal">
									{props.subTitle} <br />
									{props.subTitle2}
								</div>
							)}
						</div>
						<div className={`ml-4 transform duration-300 cursor-pointer ` + `${!isAccordionOpen ? "rotate-180" : ""} `}>
							<ChevronUpIcon />
						</div>
					</div>
				</div>
			</div>

			<div
				className={`w-full ` + `${isAccordionOpen ? `pt-4 block` : "hidden"} `}
				// className={
				// `w-full px-4 ` +
				// `transition-all transform duration-150 ease-in-out ` +
				// `${isAccordionOpen ? `pt-4 opacity-100` : "max-h-0 opacity-0 pointer-events-none"} `
				// }
				// style={{
				// maxHeight: isAccordionOpen ? `${childHeight + 16}px` : "0px",
				// }}
			>
				<div className="w-full" ref={childDomRef}>
					{props.children}
				</div>
			</div>
		</div>
	);
}

export default Accordion;
