import React, {useCallback, useEffect, useLayoutEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";

import useDimension from "../../../hooks/useDimension";
import usePing from "../../../hooks/usePing";
import {Routes} from "../../../routes/routes.constants";
import {ReactComponent as HomeIcon} from "../../../assets/svg/sections/home.svg";
import {ReactComponent as SendMoneyIcon} from "../../../assets/svg/sections/send-money.svg";
import {ReactComponent as NotificationIcon} from "../../../assets/svg/notification/notification.svg";
import ToastContainer from "../../General/ToastContainer";
import Overlay from "../../General/Overlay/Overlay";
import Hamburger from "./Hamburger/Hamburger";
import HamburgerClose from "./Hamburger/HamburgerClose";
import IdleModal from "./Modal/IdleModal";
import MenuItem from "./Sections/MenuItem";
import MenuItemWithChildren from "./Sections/MenuItemWithChildren";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

function DashboardLayout({children}: DashboardLayoutProps): JSX.Element {
	const {width} = useDimension();
	const location = useLocation();
	const {initPing} = usePing();

	const [showNav, setShowNav] = useState<boolean>(false);

	useLayoutEffect(() => {
		initPing();
	}, []);

	useEffect(() => {
		setShowNav(false);
		document.body.style.overflow = "auto";
		// dispatch(hideTransactionDetails());
	}, [location]);

	// useEffect(() => {
	// const script = document.createElement("script");
	// script.async = true;
	// script.src = "https://cdn.headwayapp.co/widget.js";
	// document.head.appendChild(script);
	// const config = {
	// selector: ".headway-badge",
	// account: process.env.REACT_APP_HEADWAY_KEY,
	// trigger: ".headway-trigger",
	// };
	// script.onload = function () {
	// window.Headway.init(config);
	// };
	// }, []);

	const handleOpenNav = useCallback(() => {
		if (width < 1025) {
			setShowNav(true);
			document.body.style.overflow = "hidden";
		}
	}, [width]);

	const handleCloseNav = useCallback(() => {
		if (width < 1025) {
			setShowNav(false);
			document.body.style.overflow = "auto";
		}
	}, [width]);

	return (
		<>
			<div className="4xs:grid lg:grid-cols-dash bg-white min-h-screen relative" id="dashboard" tabIndex={-1}>
				<ToastContainer />
				<IdleModal />
				{showNav && <Overlay onClick={handleCloseNav} />}
				<aside
					className={`${
						showNav ? " translate-x-0" : "-translate-x-full"
					} w-80% lg:w-auto max-w-16 z-40 transform fixed transition-all lg:-translate-x-0 lg:transition-none lg:relative flex justify-between items-center flex-col h-fit-available  bg-blue-senary  `}
					tabIndex={-1}
				>
					<div className="absolute top-10 -right-12  4xs:-right-14 xs:-right-24 hidden">
						<HamburgerClose active={showNav} func={handleCloseNav} />
					</div>

					<div className="w-full h-full flex justify-between flex-col items-start pt-10 overflow-y-auto lg:overflow-y-auto scrollbar-hide">
						<div className="w-full">
							<div className="flex justify-between items-center px-6">
								<Link to={Routes.DASHBOARD} tabIndex={showNav ? 0 : -1}>
									<div className="flex justify-center items-center w-28 -mt-6 cursor-pointer">{/* <LencoLogo /> */}</div>
								</Link>
							</div>

							<div className="mt-10 mx-6 ">{/* <BusinessDropdown handleAddNewBusiness={handleAddNewBusiness} /> */}</div>

							<div className="py-4">
								<MenuItem onClick={handleOpenNav} path={Routes.DASHBOARD} icon={<HomeIcon />} text="Home" />
								<MenuItemWithChildren
									onClick={handleOpenNav}
									path="/payments"
									icon={<SendMoneyIcon />}
									text="Payments"
									subItems={[
										{
											path: "/payments/make",
											text: "Send Money",
											onClick: () => {
												// dispatch(setPaymentType(PaymentType.SINGLE_TRANSFER));
												// dispatch(setPaymentStage(PaymentStageType.INITIAL));
											},
										},
										{
											path: "/payments/bill/make",
											text: "Bill Payments",
											onClick: () => {
												// dispatch(setBillPaymentType(BillPaymentType.AIRTIME_PAYMENT));
												// dispatch(setBillPaymentStage(BillPaymentStage.INITIAL));
											},
											hide: true,
										},
										{path: "/payments/pending", text: "Pending Payments"},
										{path: "/payments/recipients", text: "Saved Recipient"},
									]}
								/>
							</div>
						</div>
						{width < 1023 && (
							<div className="flex lg:hidden mx-2.5 mt-20 pb-10 justify-center items-center headway-trigger cursor-pointer">
								<div className="flex justify-center items-center pl-4 pr-3 relative headway-trigger cursor-pointer" tabIndex={0}>
									<div className="flex justify-center items-center headway-badge" id="headway-badge">
										<NotificationIcon />
									</div>
								</div>
								<span className="text-sm font-normal text-black-tertiary">Notification</span>
							</div>
						)}
					</div>
				</aside>
				<section className="w-full">
					<div className="flex flex-col justify-start items-start w-full h-screen 4xs:h-full max-h-screen">
						<header className="border-grey border-b-0.2 flex justify-center items-center flex-row py-1 w-full h-16 " tabIndex={-1}>
							<div className="w-full mx-auto px-4 lg:px-8  flex justify-between  items-center flex-row ">
								<div className="flex justify-between w-full pt-2 pb-2 space-x-6 sm:space-x-12">
									<div className="flex flex-col justify-center items-center w-max lg:w-full">
										<div className="flex space-x-2" tabIndex={-1}>
											<div>
												<Hamburger func={handleOpenNav} />
											</div>
											<div
												className="-mt-3 headway-badge-hamburger flex lg:hidden pointer-events-none"
												id="headway-badge-hamburger"
											/>
										</div>
									</div>

									<div
										className="flex flex-row justify-center items-center w-max space-x-2 lg:space-x-6 sm:space-x-3 "
										tabIndex={-1}
									>
										{width > 1023 && (
											<div
												className="hidden lg:flex justify-center items-center pl-4 pr-3 relative headway-trigger cursor-pointer"
												tabIndex={0}
											>
												<div className="flex justify-center items-center headway-badge" id="headway-badge">
													<NotificationIcon />
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</header>

						<main className="w-full px-4  lg:px-8 flex justify-start items-center flex-col relative flex-grow flex-shrink basis-auto overflow-y-auto h-fit-available">
							{children}
							{/* <TransactionDetailCard /> */}
						</main>
					</div>
				</section>
			</div>
		</>
	);
}

export default DashboardLayout;
