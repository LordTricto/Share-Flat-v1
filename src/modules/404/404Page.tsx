import React from "react";

function ErrorPage(): JSX.Element {
	return (
		<div className="flex justify-start items-start w-full">
			<div className="bg-error-backdrop rounded-md py-3 px-3 mt-5 w-full">
				<div className="text-error">The page you requested was not found.</div>
			</div>
		</div>
	);
}
export default ErrorPage;
