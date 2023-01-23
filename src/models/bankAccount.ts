import Currency from "./currency";
import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {immerable} from "immer";

export default class BankAccount {
	[immerable] = true;

	constructor(
		public id: string,
		public bankCode: string,
		public accountNumber: string,
		public accountName: string,
		public currency: Currency | null,
		public isVirtual: boolean
	) {}

	static create(obj: GenericObject): BankAccount {
		return new BankAccount(
			Parsers.string(obj.id),
			Parsers.string(obj.bankCode),
			Parsers.string(obj.accountNumber),
			Parsers.string(obj.accountName),
			Parsers.classObject(obj.currency, Currency),
			Parsers.boolean(obj.isVirtual)
		);
	}
}
