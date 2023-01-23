import Parsers from "../utils/parsers";
import {GenericObject} from "../helpers/types";
import {immerable} from "immer";

export default class Notification {
	[immerable] = true;

	constructor(public id: string, public event: string, public data: GenericObject | null) {}

	static create(obj: GenericObject): Notification {
		return new Notification(Parsers.string(obj.id), Parsers.string(obj.event), obj.data as GenericObject | null);
	}
}
