import {AxiosRequestHeaders, AxiosResponse} from "axios";

import Cookies from "js-cookie";
import {GenericObject} from "../types";
import {apiInstance} from "../../utils/utils";
// import store from "../../redux/store";
import {RequestCancelledError, UnauthorizedError} from "./requestErrors";

export enum ErrorMessage {
	AXIOS_CANCEL_ERROR = "canceled",
	GENERIC_ERROR = "Something went wrong. Please try again or contact support.",
	UNAUTHORIZED_ERROR = "Unauthorized",
	UNAUTHORIZED_TEXT_ERROR = "Request failed with status code 401",
	ACCOUNT_CREATED_ERROR = "The account has already been created",
	TIMEOUT_ERROR = "timeout of 180000ms exceeded",
}

export interface BaseRequest {
	success: boolean;
	message: string;
}

function processResponse(res: AxiosResponse<GenericObject | string>): GenericObject | Error {
	const data = typeof res.data === "string" ? (JSON.parse(res.data) as GenericObject) : res.data;
	if (!data.success) {
		return new Error(data.message as string);
	}
	return data;
}

function isError(err: unknown): err is Error {
	return (
		typeof err === "object" &&
		!!err &&
		(err instanceof Error ||
			("name" in err && "message" in err) ||
			("message" in err && (err as Error).message === ErrorMessage.AXIOS_CANCEL_ERROR))
	);
}

function getErrorResponse(err: unknown): Error {
	if (isError(err)) {
		// Checking if error message is "canceled" i.e default axios abort message
		if (err.name === "AbortError" || err.message === ErrorMessage.AXIOS_CANCEL_ERROR) {
			return new RequestCancelledError();
		}
		if (err.message === ErrorMessage.UNAUTHORIZED_ERROR || err.message === ErrorMessage.UNAUTHORIZED_TEXT_ERROR) {
			return new UnauthorizedError();
		}
		if (err.message === ErrorMessage.TIMEOUT_ERROR) {
			return new Error(ErrorMessage.GENERIC_ERROR);
		}
		return err;
	}

	if (typeof err === "string") {
		return new Error(err);
	}

	return new Error(ErrorMessage.GENERIC_ERROR);
}

function getHeaders(): AxiosRequestHeaders {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const headers: AxiosRequestHeaders = {};
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
	const xApiKey: string | undefined = Cookies.get("lenco-csrf") as string | undefined;
	if (xApiKey) {
		headers["x-api-key"] = xApiKey;
	}
	return headers;
}

function getCompanyId(): {companyId?: string} {
	// const state = store.getState();
	// const selectedCompanyId = state.init.selectedCompanyId || undefined;
	const selectedCompanyId = undefined;
	if (!selectedCompanyId) {
		return {};
	}
	return {companyId: selectedCompanyId};
}

export async function makeRequest(url: string, data: GenericObject = {}): Promise<GenericObject | Error> {
	try {
		const requestData = {...getCompanyId(), ...data};
		const res: AxiosResponse<string> = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}

export async function makeRequestWithSignal(url: string, data: GenericObject = {}, signal: AbortSignal): Promise<GenericObject | Error> {
	try {
		const requestData = {...getCompanyId(), ...data};
		const res: AxiosResponse<string> = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			signal,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err: unknown) {
		return getErrorResponse(err);
	}
}
export async function makeRequestThrowError(url: string, data: GenericObject = {}): Promise<GenericObject> {
	let axiosResponse: AxiosResponse<string>;
	try {
		const requestData = {...getCompanyId(), ...data};
		axiosResponse = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			timeout: 180000, // only wait for 3mins
		});
	} catch (err) {
		throw getErrorResponse(err);
	}

	const res = processResponse(axiosResponse);
	if (res instanceof Error) {
		throw getErrorResponse(res);
	}

	return res;
}

export async function makeRequestUploadFile(url: string, data: FormData): Promise<GenericObject | Error> {
	try {
		const companyIdData = getCompanyId();
		if (companyIdData.companyId) {
			data.set("companyId", companyIdData.companyId);
		}

		const headers = getHeaders();
		headers["Content-Type"] = "multipart/form-data";

		const res: AxiosResponse<GenericObject> = await apiInstance.post(url, data, {
			headers,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}
export async function makeRequestUploadFileWithSignal(url: string, data: FormData, signal: AbortSignal): Promise<GenericObject | Error> {
	try {
		const companyIdData = getCompanyId();
		if (companyIdData.companyId) {
			data.set("companyId", companyIdData.companyId);
		}

		const headers = getHeaders();
		headers["Content-Type"] = "multipart/form-data";

		const res: AxiosResponse<GenericObject> = await apiInstance.post(url, data, {
			headers,
			signal,
			timeout: 180000, // only wait for 3mins
		});
		return processResponse(res);
	} catch (err) {
		return getErrorResponse(err);
	}
}
export async function makeRequestDownloadFile(url: string, data: GenericObject = {}): Promise<Blob | Error> {
	try {
		const requestData = {...getCompanyId(), ...data};
		const res: AxiosResponse<string> = await apiInstance.post(url, requestData, {
			headers: getHeaders(),
			responseType: "blob",
			timeout: 180000, // only wait for 3mins
		});
		const contentTypeHeader = res.headers["content-type"];
		if (contentTypeHeader && contentTypeHeader !== "application/json" && contentTypeHeader.indexOf("text/plain") !== 0) {
			return new Blob([res.data as unknown as string], {type: contentTypeHeader});
		}
		return processResponse(res) as Error;
	} catch (err) {
		return getErrorResponse(err);
	}
}
