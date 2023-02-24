import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
	},
});

export default store;
