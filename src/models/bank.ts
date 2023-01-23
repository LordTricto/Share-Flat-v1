import {BankType} from "./bank.constants";
import {GenericObject} from "../helpers/types";
import Parsers from "../utils/parsers";
import {errorTrue} from "../redux/error/slice/errorSlice";
import {immerable} from "immer";

export default class Bank {
	bankAccount: unknown;
	[immerable] = errorTrue;
	constructor(public code: string, public name: string, public nubanCode: string | null, public shortName: string, public type: number | null) {}

	static create(obj: GenericObject): Bank {
		return new Bank(
			Parsers.string(obj.code),
			Parsers.string(obj.name),
			Parsers.nullableString(obj.nubanCode),
			Parsers.string(obj.shortName),
			Parsers.nullableNumber(obj.type)
		);
	}

	get id(): string {
		return this.code;
	}

	isCommercialBank(): boolean {
		return this.type === BankType.COMMERCIAL_BANK;
	}

	isMicroFinanceBank(): boolean {
		return this.type === BankType.MICRO_FINANCE_BANK;
	}
}
