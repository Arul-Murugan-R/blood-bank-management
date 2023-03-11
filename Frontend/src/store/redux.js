import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { DonorDataReducers } from "./DonorData";
import { donorInfoReducers } from "./DonorInfoData";
import { RequestDataReducers } from "./RequestStore";
import { SnackReducers } from "./SnackStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
		donorData: DonorDataReducers,
		donorInfo: donorInfoReducers,
		requestData: RequestDataReducers,
		snack: SnackReducers,
	},
});

export default store;
