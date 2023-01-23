import {combineReducers} from "redux";
import errorReducer from "./error/slice/errorSlice";
import initReducer from "./init/slice/initSlice";
import messageReducer from "./message/slice/messageSlice";

const rootReducer = combineReducers({
	/* your app’s top-level reducers */
	error: errorReducer,
	message: messageReducer,
	init: initReducer,
});

export default rootReducer;

export type IRootState = ReturnType<typeof rootReducer>;
