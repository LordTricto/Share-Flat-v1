import {WebSocketEvent} from "./websocket.constants";
import Websocket from "../../utils/websocket";
// import store from "../../redux/store";

// function updateAccountBalance(payload: GenericObject) {
// const userAccountId = Parsers.string(payload.userAccountId);
// const balance = Parsers.number(payload.balance);
// const todayTransfersTotal = Parsers.number(payload.todayTransfersTotal);

// if (userAccountId) {
// store.dispatch(
// mainUpdateUserAccountCallback({
// id: userAccountId,
// callback: (userAccount: UserAccount) => {
// userAccount.balance = balance;
// userAccount.todayTransfersTotal = todayTransfersTotal;
// },
// })
// );
// }
// }

// function authAppLinked(payload: GenericObject) {
// const authApp = Parsers.classObjectNonNullable(payload.authApp, UserApp);

// if (authApp) {
// store.dispatch(mainUpdateUserAuthApp(authApp));
// }
// }

function authAppUnlinked() {
	// store.dispatch(mainUpdateUserAuthApp(UserApp.createDefault()));
}

export function registerEventHandlers(websocket: Websocket): void {
	websocket.registerEventHandler(WebSocketEvent.AUTH_APP_UNLINKED, authAppUnlinked);
}
