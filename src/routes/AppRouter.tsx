import {Navigate, Route, Routes} from "react-router-dom";

// import AccountOpeningCompanyBase from "../modules/Landing/CompanyBase/Pages/CompanyBase";
import BankingAppWrapper from "./BankingAppWrapper";
// import CardsPage from "../modules/Dashboard/Cards/Pages";
import PageTransitionProgress from "../components/General/Loaders/PageTransitionProgress";
// import AppRoute from "./AppRoute";
import React from "react";

function AppRouter(): JSX.Element {
	return (
		<>
			<PageTransitionProgress />

			<Routes>
				{/*Routes outside the banking app -> i.e. does not need to be logged in*/}
				<Route path="*" element={<Navigate to="/" replace />} />
				<BankingAppWrapper>
					{/*Routes inside the banking app -> i.e. needs to be logged in*/}
					{/* <AppRoute path="transactions" exact isPreRelease element={TransactionsPage} /> */}
					{/* === how to do nested routing === */}
					{/* <Route path="users" element={<Users />}>
						<Route path=":id" element={<UserInfo />} />
						<Route path="profile" element={<UserProfile />} />
					</Route> */}

					{/* === Add outlet in the parent file === */}
					{/* <div>
						// you can do something here // Outlet: This element is used as a placholder for the child route. // Which means it will be
						either <UserInfo /> or <UserProfile />
						<Outlet />
					</div> */}
					<Route path="*" element={<Navigate to="/" replace />} />
				</BankingAppWrapper>
			</Routes>
		</>
	);
}

export default AppRouter;
