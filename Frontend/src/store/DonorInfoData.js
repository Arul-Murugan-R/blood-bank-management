import { createSlice } from "@reduxjs/toolkit";

const initialDonorInfoState = [
	{
		user_id: null,
		username: null,
		mobileNumber: null,
		location: {
			latitude: null,
			longitude: null,
		},
		bloodGroup: null,
		age: null,
	},
];

const donorInfoSlice = createSlice({
	name: "donorInfo",
	initialState: initialDonorInfoState,
	reducers: {
		setDonorInfo(state, action) {
			const { donorInfo } = action.payload;
			return donorInfo;
		},
		removeDonorInfo(state, action) {
			const filteredDonorInfo = state.filter(
				(donorInfo) => donorInfo.user_id !== action.payload.user_id
			);
			return filteredDonorInfo;
		},
	},
});

export const donorInfoActions = donorInfoSlice.actions;
export const donorInfoReducers = donorInfoSlice.reducer;
