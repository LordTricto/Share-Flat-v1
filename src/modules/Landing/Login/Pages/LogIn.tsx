import * as Yup from "yup";

import {PageTitle} from "../../../../helpers/AppConstants";

import YupPassword from "yup-password";
import Layout from "../../../../components/Layouts/Layout";
import React from "react";

YupPassword(Yup);

function AccountLogIn(): JSX.Element {
	document.title = PageTitle.LANDING_PAGE;

	return (
		<Layout>
			<div className="w-full flex justify-center items-center flex-col"></div>
		</Layout>
	);
}
export default AccountLogIn;
