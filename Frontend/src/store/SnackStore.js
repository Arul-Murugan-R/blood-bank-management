import { createSlice } from "@reduxjs/toolkit";

const initialSnackstate = {
	message: null,
	severity: null,
	open: false,
};

const SnackSlice = createSlice({
	name: "Snack",
	initialState: initialSnackstate,
	reducers: {
		setSnack(state, action) {
			const { message, severity } = action.payload;
			return { message, severity, open: true };
		},
		closeSnack(state, action) {
			return { ...initialSnackstate };
		},
	},
});

export const SnackActions = SnackSlice.actions;
export const SnackReducers = SnackSlice.reducer;
