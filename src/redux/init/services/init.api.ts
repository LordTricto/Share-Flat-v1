import {makeRequest} from "../../../helpers/request/makeRequest";

// export async function mainInit(): Promise<MainInitState> {
// const res = await makeRequest("/main/init");
// if (res instanceof Error) {
// throw res;
// }

// const options: GenericObject = (res.options as GenericObject) || {};
// const meta: GenericObject = (res.meta as GenericObject) || {};
// const companyDetails: GenericObject = (res.companyDetails as GenericObject) || {};
// const socket: GenericObject = (res.socket as GenericObject) || {};

// return {
// options: {
// banks: Parsers.classObjectArray(options.banks, Bank),
// },
// companyDetails: {
// user: Parsers.classObjectNonNullable(companyDetails.user, User),
// userAccountsMeta: Parsers.classObjectArray(companyDetails.userAccountsMeta, UserAccountMeta),
// company: Parsers.classObjectNonNullable(companyDetails.company, Corporate),
// accounts: Parsers.classObjectArray(companyDetails.accounts, UserAccount),
// cards: Parsers.classObjectArray(companyDetails.cards, Card),
// userGroups: Parsers.classObjectArray(companyDetails.userGroups, UserGroup),
// transactionCategories: Parsers.classObjectArray(companyDetails.transactionCategories, TransactionCategory),
// },
// meta: {
// transferCharges: {
// 1: Parsers.number((meta.transferCharges as GenericObject)[1]),
// 2: Parsers.number((meta.transferCharges as GenericObject)[2]),
// 3: Parsers.number((meta.transferCharges as GenericObject)[3]),
// },
// cardCreationCharges: {
// 1: Parsers.number((meta.cardCreationCharges as GenericObject)[1]),
// },
// faqs: Parsers.classObjectArray(meta.faqs, AccountFaq),
// accountTypes: Parsers.classObjectArray(meta.accountTypes, AccountType),
// },
// socket: {
// token: res.socket ? Parsers.string(socket.token) : "",
// url: res.socket ? Parsers.string(socket.url) : "",
// secure: res.socket ? Parsers.boolean(socket.secure) : true,
// },
// };
// }

export async function logout(): Promise<void> {
	await makeRequest("/accounts/logout");
}
