import Parsers from "../utils/parsers";
import {GenericObject} from "../helpers/types";
import {CurrencyCodes} from "./currency.constants";
import {immerable} from "immer";

export default class Currency {
	[immerable] = true;

	constructor(public id: number, public htmlCode: string, public isoCode: string) {}

	static create(obj: GenericObject): Currency {
		return new Currency(Parsers.number(obj.id), Parsers.string(obj.htmlCode), Parsers.string(obj.isoCode));
	}

	get singleCode(): string {
		return this.htmlCode || this.isoCode || "";
	}

	public static getCurrencyString(currency: Currency | undefined | null): string {
		const code = currency ? currency.singleCode : CurrencyCodes.NAIRA;
		const addSpace = code.length === 3;
		return code + (addSpace ? " " : "");
	}
}
