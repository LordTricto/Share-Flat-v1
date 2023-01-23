import React from "react";
import {Link} from "react-router-dom";
import TooltipIcons from "../../../General/TooltipIcons/TooltipIcons";

interface AccountsSearchCardProps {
	index: number;
	onClick: (e: React.MouseEvent) => void;
}

export function AccountsSearchCard({index, onClick}: AccountsSearchCardProps): JSX.Element {
	return (
		<>
			<Link
				to={{
					pathname: "/payments/make/single",
					// search: `?to=${account.id}`,
					// state: {
					// typeOfTransfer: PaymentsType.SINGLE_TRANSFER,
					// to: account.id,
					// },
				}}
				onClick={onClick}
				tabIndex={-1}
				data-type="transaction"
			>
				<div className="" key={index} data-type="transaction">
					<div data-type="transaction">
						<div
							className="flex flex-row items-center justify-start pt-2.5 pb-2.5 space-x-4 hover:bg-grey-backdrop cursor-pointer px-4"
							data-type="transaction"
						>
							<div className="w-30% pr-1" data-type="transaction">
								<p
									className="text-xs text-black-secondary capitalize overflow-ellipsis overflow-hidden whitespace-nowrap max-w-2xs"
									data-type="transaction"
								>
									test
								</p>
							</div>
							<div className="w-30% flex justify-start items-center" data-type="transaction">
								<p
									className="text-xs text-black-tertiary capitalize overflow-ellipsis overflow-hidden whitespace-nowrap max-w-2xs"
									data-type="transaction"
								>
									test
								</p>
							</div>
							<div className="flex  items-center justify-between w-35%" data-type="transaction">
								<p
									className="text-xs text-black-tertiary capitalize overflow-ellipsis overflow-hidden whitespace-nowrap max-w-2xs "
									data-type="transaction"
								>
									Test{" "}
								</p>
								<div className="pl-6" data-type="transaction">
									<TooltipIcons icon={""} size="small" message="Send Money" placement="right" data-type="transaction" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
}
