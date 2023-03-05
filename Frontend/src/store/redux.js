import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { DonorDataReducers } from "./DonorData";

const store = configureStore({
	reducer: {
		auth: authReducers,
		donordata: DonorDataReducers,
	},
});

export default store;
