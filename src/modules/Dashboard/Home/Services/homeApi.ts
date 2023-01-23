export enum SingleTransferRequestType {
	INIT = "single-transfer.init",
	VERIFY_ACCOUNT = "single-transfer.verify-account",
	RECIPIENT_AUTOCOMPLETE = "single-transfer.recipient-autocomplete",
}

// export const singlePaymentInit = async (data: SinglePaymentInitRequest): Promise<SinglePaymentInitResponse> => {
// const signal = getAbortControllerSignal(SingleTransferRequestType.INIT);
// const res = await makeRequestWithSignal("/main/payments/initiate", data, signal);
// if (res instanceof Error) {
// throw res;
// }
// return {
// success: Parsers.boolean(res.success),
// message: Parsers.string(res.message),
// transaction: Parsers.classObjectNonNullable(res.transaction, Transaction),
// isApproved: Parsers.boolean(res.isApproved),
// processing: Parsers.boolean(res.processing),
// accountsToActivate: Parsers.stringArray(res.accountsToActivate),
// };
// };

// export const verifyAccount = async (data: VerifyAccountRequest): Promise<VerifyAccountResponse> => {
// const signal = getAbortControllerSignal(SingleTransferRequestType.VERIFY_ACCOUNT);
// const res = await makeRequestWithSignal("/main/payments/initiate/verify-account", data, signal);
// if (res instanceof Error) {
// throw res;
// }
// return {
// success: Parsers.boolean(res.success),
// message: Parsers.string(res.message),
// bankAccount: Parsers.classObjectNonNullable(res.bankAccount, BankAccount),
// };
// };

// export function abortSingleTransferRequest(type: SingleTransferRequestType): void {
// abortRequest(type);
// }

// export function abortAllSingleTransferRequests(): void {
// Object.values(SingleTransferRequestType).forEach((type) => abortRequest(type));
// }
