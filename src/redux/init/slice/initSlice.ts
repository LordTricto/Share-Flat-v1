import {createSlice} from "@reduxjs/toolkit";
import {InitState} from "./initSlice.types";

const initialState: InitState = {
	isLoggedIn: false,
	loading: false,
	error: null,
};

export const initSlice = createSlice({
	name: "init",
	initialState,
	reducers: {
		initRequest: (state: InitState) => {
			state.isLoggedIn = true;
			state.loading = true;
			state.error = null;
		},
	},
});

export const {initRequest} = initSlice.actions;

export default initSlice.reducer;
