import React, {useState} from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import {ReactComponent as Copy} from "../../../assets/svg/general/copy/copy.svg";

interface Props {
	text: string;
	children?: React.ReactNode;
	withCopyIcon?: boolean;
	onClickedText?: string;
}
function Clipboard(props: Props): JSX.Element {
	const {withCopyIcon = true} = props;
	const [isCopied, setIsCopied] = useState<boolean>(false);
	//copy username
	const onCopyText = () => {
		const timeOut = setTimeout(() => setIsCopied(false), 1000);
		clearTimeout(timeOut);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1000);
	};
	return (
		<>
			<CopyToClipboard text={props.text} onCopy={onCopyText}>
				<div className="relative">
					<div className="flex flex-row justify-start items-center cursor-pointer">
						{props.children && props.children}
						{withCopyIcon && (
							<div className="ml-2">
								<Copy className="h-5 w-6" />
							</div>
						)}
					</div>
					<div
						className={
							`absolute -top-4 -right-12 pr-10 rounded-lg ` +
							`${isCopied ? "block animate__animated animate__fadeOutUp animate__infinite infinite" : "hidden"} `
						}
					>
						<div className="font-normal text-xs">
							<div className="bg-grey-backdrop rounded-lg px-2 text-info-text">
								{props.onClickedText ? props.onClickedText : "Copied!"}
							</div>
						</div>
					</div>
				</div>
			</CopyToClipboard>
		</>
	);
}

export default Clipboard;
