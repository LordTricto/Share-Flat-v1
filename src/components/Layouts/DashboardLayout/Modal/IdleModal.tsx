import {ToastType} from "../../../../helpers/AppConstants";
import React, {useCallback, useEffect, useRef, useState} from "react";

import IdleTimer from "react-idle-timer";
import Modal from "../../../General/Modals/Modal";
import ModalBody from "../../../General/Modals/ModalBody";
import ModalFooter from "../../../General/Modals/ModalFooter";
import ModalHeader from "../../../General/Modals/ModalHeader";
import {useLocation} from "react-router";
import useLogout from "../../../../redux/init/services/hooks/useLogout";
import usePing from "../../../../hooks/usePing";

function IdleModal(): JSX.Element {
	const {initPing} = usePing();
	const {handleLogout} = useLogout();
	const location = useLocation();
	const [counter, setCounter] = useState(59);
	const [isIdle, setIsIdle] = useState(false);
	const countDownTimeoutRef = useRef<number | undefined>(undefined);

	useEffect(() => {
		if (!counter || !isIdle) return;
		countDownTimeoutRef.current = window.setInterval(() => setCounter(counter - 1), 1000);
		return () => window.clearInterval(countDownTimeoutRef.current);
	}, [counter, isIdle]);

	const handleStayActive = useCallback(() => {
		initPing();
		setIsIdle(false);
		setCounter(59);
		window.clearInterval(countDownTimeoutRef.current);
	}, [countDownTimeoutRef.current]);

	const handleIdle = useCallback(() => {
		setIsIdle(true);
	}, []);

	useEffect(() => {
		if (counter < 1 && isIdle) {
			console.log("Inactive logout...");
			handleLogout();
		}
	}, [counter, isIdle]);

	return (
		<>
			<IdleTimer timeout={location.pathname === "/application" ? 60 * 1000 : 60 * 1000} onIdle={handleIdle} />

			<div className={`fixed h-screen w-screen z-80 ${isIdle ? " opacity-100" : "  opacity-0 pointer-events-none"}`}>
				<Modal size="fit" active={isIdle} toggler={handleStayActive}>
					<ModalHeader toggler={handleStayActive} headingType={ToastType.WARNING}>
						Warning
					</ModalHeader>
					<ModalBody>
						<div className="w-full text-left text-black-secondary">
							Your session will timeout in{" "}
							<span className="text-error">
								{" "}
								{counter < 10 && "0"}
								{counter}s{" "}
							</span>{" "}
							due <br />
							to inactivity.
						</div>
					</ModalBody>
					<ModalFooter>
						<div
							onClick={function (e) {
								e.preventDefault();
								handleLogout();
							}}
							className="cursor-pointer"
						>
							<span className="text-error"> Logout</span>
						</div>
						<div onClick={handleStayActive}>
							<div className="cursor-pointer">
								<span className="text-blue"> Continue</span>
							</div>
						</div>
					</ModalFooter>
				</Modal>
			</div>
		</>
	);
}

export default IdleModal;
