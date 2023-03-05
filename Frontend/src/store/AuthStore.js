import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DonorDataActions } from "./DonorData";

const initialAuthState = {
	isLoggedIn: false,
	username: null,
	userId: null,
	token: null,
	expiresIn: 0,
	role: null,
};

const base_url = import.meta.env.VITE_BACKEND_URL + "/user";

const AuthSlice = createSlice({
	name: "Authentication",
	initialState: initialAuthState,
	reducers: {
		loginHandler(state, action) {
			const { user } = action.payload;
			localStorage.setItem("token", user.token);
			localStorage.setItem("expiresAt", user.expiresAt);
			localStorage.setItem("userId", user.userId);
			return { ...user, isLoggedIn: true };
		},
		logoutHandler(state, action) {
			localStorage.removeItem("token");
			localStorage.removeItem("expiresAt");
			localStorage.removeItem("userId");
			return { ...initialAuthState };
		},
		checkToken(state, action) {
			const { userId, username, token, role } = action.payload;
			const storedUserId = localStorage.getItem("userId");
			const storedUsername = localStorage.getItem("username");
			if (
				(userId !== storedUserId && username !== storedUsername) ||
				userId === null ||
				username === null
			)
				return { ...initialAuthState };
			return {
				isLoggedIn: true,
				userId: userId,
				username: username,
				token: token,
				role,
				expiresIn: +localStorage.getItem("expiresAt"),
			};
		},
	},
});

export const authActions = AuthSlice.actions;
export const authReducers = AuthSlice.reducer;

export const verifyToken = () => {
	return async (dispatch) => {
		const verifier = async () => {
			const token = localStorage.getItem("token");
			const expiresAt = localStorage.getItem("expiresAt");
			if (+expiresAt > Date.now()) {
				try {
					const response = await axios.post(base_url + "/verify", {
						token: token,
					});
					if (response.data.user.role === "donor") {
						const donorDataResponse = await axios.get(
							base_url + "/donor/" + response.data.user.userId
						);
						const donorData = donorDataResponse.data.donorData;
						dispatch(
							DonorDataActions.setDonorData({
								donorData: donorData,
							})
						);
					}
					console.log(response);
					return {
						userId: response.data.user.userId,
						username: response.data.user.username,
						token: token,
						role: response.data.user.role,
					};
				} catch (error) {
					return {
						userId: null,
						username: null,
					};
				}
			} else
				return {
					userId: null,
					username: null,
				};
		};

		const verificationResult = await verifier();
		console.log(verificationResult);
		dispatch(authActions.checkToken({ ...verificationResult }));
	};
};
