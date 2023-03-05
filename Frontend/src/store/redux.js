import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { DonorDataReducers } from "./DonorData";
import { RequestDataReducers } from "./RequestStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
		donorData: DonorDataReducers,
		requestData: RequestDataReducers,
	},
});

export default store;
