import { createSlice } from "@reduxjs/toolkit";

const initialDonorDataState = {
	mobileNumber: null,
	antibiotics: null,
	recentTravel: null,
	diseases: null,
	previousDonation: null,
	bloodGroup: null,
	location: { latitude: null, longitude: null },
	lastDonation: null,
	tattoos: null,
};

const DonorDataSlice = createSlice({
	name: "DonorData",
	initialState: initialDonorDataState,
	reducers: {
		setDonorData(state, action) {
			const { donorData } = action.payload;
			return { ...donorData };
		},
		clearDonorData(state, action) {
			return { ...initialDonorDataState };
		},
	},
});

export const DonorDataActions = DonorDataSlice.actions;
export const DonorDataReducers = DonorDataSlice.reducer;
