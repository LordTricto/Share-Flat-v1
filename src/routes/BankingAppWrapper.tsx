import React from "react";
import {Routes} from "react-router";

import DashboardLayout from "../components/Layouts/DashboardLayout/DashboardLayout";

interface Props {
	children: React.ReactNode;
}

function BankingAppWrapper({children}: Props): JSX.Element {
	return (
		<>
			<div>
				<DashboardLayout>
					<Routes>{children}</Routes>
				</DashboardLayout>
			</div>
		</>
	);
}

export default BankingAppWrapper;
