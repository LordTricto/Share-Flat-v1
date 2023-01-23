import React, {useEffect, useRef, useState} from "react";

import OtpInput from "react-otp-input";

export interface otpProps {
	value: string | null | undefined;
	isError?: boolean;

	onSend: () => void;
	otpFunc: (e: string) => void | undefined;
	handleResend: () => void;
}

function Otp({value, isError = false, onSend, otpFunc, handleResend}: otpProps): JSX.Element {
	const otpRef = useRef<OtpInput | null>(null);

	const [minutes, setMinutes] = useState<number>(3);
	const [seconds, setSeconds] = useState<number>(0);
	const [optFocusValue, setOtpFocusValue] = useState<number>(0);

	useEffect(() => {
		if (isError) return;
		const optTimerInterval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			}
			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(optTimerInterval);
				} else {
					setMinutes(minutes - 1);
					setSeconds(59);
				}
			}
		}, 1000);
		return () => {
			clearInterval(optTimerInterval);
		};
	});

	useEffect(() => {
		return () => {
			setMinutes(2);
			setSeconds(59);
		};
	}, []);

	useEffect(() => {
		setOtpFocusValue(() => {
			if (!value) {
				return 0;
			}
			if (value.length <= 6) {
				return value.length;
			}
			return 6;
		});
	}, [value]);

	useEffect(() => {
		if (!value || value.length < 6) return;
		onSend();
	}, [value]);

	useEffect(() => {
		otpRef.current?.focusInput(optFocusValue);
	}, [otpRef.current]);

	return (
		<>
			<div className="w-full" onClick={() => otpRef.current?.focusInput(optFocusValue)}>
				<OtpInput
					value={value || undefined}
					onChange={otpFunc}
					placeholder=""
					inputStyle={"otp font-normal text-3xl border rounded-lg cursor-text " + `${isError ? "border-error" : ""}`}
					numInputs={6}
					containerStyle="flex justify-between item-center space-x-2 w-full"
					focusStyle="outline-none"
					isInputNum={true}
					shouldAutoFocus={true}
					ref={otpRef}
				/>
			</div>
			<div className="flex justify-start items-center pt-4">
				<div>
					{minutes === 0 && seconds === 0 ? (
						<div onClick={handleResend}>
							<span className="text-sm  text-blue cursor-pointer">Resend OTP</span>
						</div>
					) : (
						<span className="text-sm  text-black-tertiary cursor-not-allowed">
							Resend OTP in{" "}
							<span className="text-black-secondary">
								{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
							</span>
						</span>
					)}
				</div>
			</div>
		</>
	);
}

export default Otp;
