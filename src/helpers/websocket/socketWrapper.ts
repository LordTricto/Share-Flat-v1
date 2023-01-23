import Websocket from "../../utils/websocket";

class SocketWrapper {
	private static socketInstance: Websocket | undefined = undefined;

	public static get socket(): Websocket | undefined {
		return SocketWrapper.socketInstance;
	}

	public static setup(url: string, isSecure: boolean, token: string | null): Websocket {
		this.socketInstance = new Websocket(url, isSecure);
		if (token) {
			this.socketInstance.subscribe(token);
		}
		return this.socketInstance;
	}
}

export default SocketWrapper;
