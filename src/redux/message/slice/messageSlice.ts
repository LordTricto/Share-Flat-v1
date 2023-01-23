import {PayloadAction, createSlice} from "@reduxjs/toolkit";

import {ToastType} from "../../../components/General/ToastContainer";

interface MessageInterface {
	message: string | null;
	type: ToastType;
	index: number;
}
interface MessageState {
	message: MessageInterface | null;
}

const initialState: MessageState = {
	message: null,
};

export const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		messageTrue: (state: MessageState, action: PayloadAction<string | {message: string; type?: ToastType}>) => {
			if (typeof action.payload === "string") {
				state.message = {
					message: action.payload,
					type: ToastType.MESSAGE,
					index: Math.floor(Math.random() * 100000000000000) + 1,
				};
			} else {
				state.message = {
					message: action.payload.message,
					type: action.payload.type ? action.payload.type : ToastType.MESSAGE,
					index: Math.floor(Math.random() * 100000000000000) + 1,
				};
			}
		},
		messageFalse: (state: MessageState) => {
			state.message = null;
		},
	},
});

export const {messageFalse, messageTrue} = messageSlice.actions;

export default messageSlice.reducer;
