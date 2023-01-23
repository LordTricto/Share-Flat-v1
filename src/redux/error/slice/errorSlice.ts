import {PayloadAction, createSlice} from "@reduxjs/toolkit";

interface ErrorInterface {
	message: string | null;
	index: number;
}
interface ErrorState {
	error: ErrorInterface | null;
}

const initialState: ErrorState = {
	error: null,
};

export const errorSlice = createSlice({
	name: "error",
	initialState,
	reducers: {
		errorTrue: (state: ErrorState, action: PayloadAction<string | {message: string} | Error>) => {
			if (typeof action.payload === "string") {
				state.error = {message: action.payload, index: Math.floor(Math.random() * 100000000000000) + 1};
			} else {
				state.error = {message: action.payload.message, index: Math.floor(Math.random() * 100000000000000) + 1};
			}
		},
		errorFalse: (state: ErrorState) => {
			state.error = null;
		},
	},
});

export const {errorFalse, errorTrue} = errorSlice.actions;

export default errorSlice.reducer;
