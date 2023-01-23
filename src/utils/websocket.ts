import io, {Socket} from "socket.io-client";

import {GenericObject} from "../helpers/types";
import {getErrorMessage} from "./getErrorMessage";

export default class Websocket {
	public isSubscribed: boolean;
	private token: string | null;
	private socket: Socket | null;
	private readonly isDevMode: boolean;

	constructor(url: string, isSecure: boolean) {
		this.isSubscribed = false;
		this.token = null;
		this.socket = null;
		this.isDevMode = process.env.NODE_ENV === "development";
		this.setup(url, isSecure);
	}

	public subscribe(token: string | null): void {
		if (!token || this.isSubscribed) {
			return;
		}

		if (!this.socket) {
			setTimeout(
				(t) => {
					this.subscribe(t);
				},
				10000,
				token
			);
			return;
		}

		this.token = token;
		this.socket.emit("subscribe", this.token);
	}

	public unsubscribe(): void {
		if (!this.isSubscribed || !this.socket) {
			return;
		}

		this.socket.emit("un-subscribe", this.token);
	}

	public resubscribe(token: string): void {
		if (!this.socket) {
			setTimeout(
				(t) => {
					this.resubscribe(t);
				},
				10000,
				token
			);
			return;
		}

		this.socket.once("un-subscribed", () => {
			this.subscribe(token);
		});

		this.unsubscribe();
	}

	public registerEventHandler(event: string, callback: (payload: GenericObject) => void): void {
		if (!this.socket) {
			setTimeout(
				(ev: string, cb: (payload: GenericObject) => void) => {
					this.registerEventHandler(ev, cb);
				},
				10000,
				event,
				callback
			);
			return;
		}
		this.socket.on(event, callback);
	}

	public deregisterEventHandler(event: string, callback: ((payload: GenericObject) => void) | undefined): void {
		if (this.socket) {
			if (callback) {
				this.socket.off(event, callback);
			} else {
				this.socket.off(event);
			}
		}
	}

	private setup(url: string, isSecure: boolean): void {
		// console.log(url, isSecure);
		this.socket = io(url, {secure: isSecure, transports: ["websocket", "polling"]});

		this.socket.on("connect", () => {
			this.log("Connected");
			this.subscribe(this.token);
		});

		this.socket.on("disconnect", () => {
			this.log("disConnected");
			this.isSubscribed = false;
		});
		this.socket.on("subscribed", () => {
			this.log("subscribed");
			this.isSubscribed = true;
		});
		this.socket.on("un-subscribed", () => {
			this.log("un-subscribed");
			this.isSubscribed = false;
			this.token = null;
		});

		this.socket.on("connect_error", (error: Error | string) => {
			this.log(`Connect Error: ${getErrorMessage(error)}`);
		});
		this.socket.on("connect_timeout", () => {
			this.log("Connection Timed out");
		});
		this.socket.on("error", (error: Error | string) => {
			this.log(`Error: ${getErrorMessage(error)}`);
		});
		this.socket.on("reconnect_failed", () => {
			this.log("Reconnect Failed");
		});
	}

	private log(message: string): void {
		if (this.isDevMode) {
			console.log(message);
		}
	}
}
