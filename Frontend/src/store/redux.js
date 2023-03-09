import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { DonorDataReducers } from "./DonorData";
import { RequestDataReducers } from "./RequestStore";
import { SnackReducers } from "./SnackStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
		donorData: DonorDataReducers,
		requestData: RequestDataReducers,
		snack: SnackReducers,
	},
});

export default store;
