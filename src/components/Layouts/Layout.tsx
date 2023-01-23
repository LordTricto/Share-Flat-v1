import {useNavigate} from "react-router-dom";

import React from "react";

// const homeUrl: string = process.env.REACT_APP_HOME_URL || "/";
interface LayoutProps {
	children: React.ReactNode;
}

function Layout({children}: LayoutProps): JSX.Element {
	const navigate = useNavigate();

	return (
		<>
			<div
				className="grid lg:grid-cols-12 grid-cols-1 layout-section overflow-x-hidden lg:bg-blue-backdrop bg-white h-screen w-full"
				tabIndex={-1}
			>
				<div className="flex flex-col w-full h-full p-0 m-0  bg-white relative col-span-7" tabIndex={-1}>
					<div className="flex justify-between items-center pt-6 px-4 2xs:px-10">
						<div onClick={() => navigate("/login")}>{/* <LencoLogo className="lg:w-full" /> */}</div>
						<div>
							{/* {showHeaderLogin && (
								<p className="flex flex-row  text-black-tertiary text-sm space-x-2 font-normal pt-2">
									<span className="hidden lg:flex -mr-1"> Already have an account?</span>
									<Link to={inviteURL || "/login"}>
										<span className=" text-blue whitespace-nowrap">Log In</span>
									</Link>
								</p>
							)}

							{showHeaderSignup && (
								<div>
									<p className="flex flex-row  text-black-tertiary  text-sm space-x-2 font-normal pt-2 ">
										<span className="hidden lg:flex -mr-1"> Don’t have a Lenco account?</span>
										<Link to={inviteURL || "/signup"}>
											<span className="text-blue whitespace-nowrap">Sign Up</span>
										</Link>
									</p>
								</div>
							)} */}
						</div>
					</div>
					<main className="w-full max-w-6xl flex justify-center items-center flex-col h-full overflow-y-auto relative">{children}</main>
				</div>
			</div>
		</>
	);
}

export default Layout;
