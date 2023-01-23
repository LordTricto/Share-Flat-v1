export type loginData = {
	username: string;
	password: string;
};

export interface loginDataResponse {
	success: boolean;
	message: string;
	isAuthAppSetup: boolean;
	name: string;
	otp: boolean;
}

export type otpData = {
	otp: string | null;
	username: string;
	password: string;
};

export interface otpDataResponse {
	success: boolean;
	message: string;
	isAuthAppSetup: boolean;
	name: string | null;
	otp: boolean;
}

export type inviteLoginData = {
	a: string;
	b: string;
	type: string;
	username: string;
	password: string;
	// otp: string;
};

export interface inviteLoginResponse {
	success: boolean;
	message: string;
	isAuthAppSetup: boolean;
	name: string | undefined;
	otp: boolean;
}

export type inviteOtpData = {
	a: string;
	b: string;
	type: string;
	username: string;
	password: string;
	otp: string | null;
};

export interface inviteOtpDataResponse {
	success: boolean;
	message: string;
	isAuthAppSetup: boolean;
	name: string;
	otp: boolean;
}

export type verifyInviteLoginData = {
	auth: string;
	a: string;
	b: string;
	type: string;
};

export interface verifyInviteLoginDataResponse {
	success: boolean;
	message: string;
	firstName: string;
	lastName: string;
	email: string;
	businessName: string;
	phone: string | undefined;
}
