import { createSlice } from "@reduxjs/toolkit";

const initialRequestState = [
	{
		requestId: null,
		requiredBefore: null,
		numberOfUnits: null,
		bloodGroup: null,
		location: { latitude: null, longitude: null },
		hospital: null,
		address: null,
	},
];

const RequestDataSlice = createSlice({
	name: "RequestsData",
	initialState: initialRequestState,
	reducers: {
		setRequestsData(state, action) {
			const { requestsData } = action.payload;
			return [...requestsData];
		},
		addRequestData(state, action) {
			const { requestData } = action.payload;
			return [...state, { ...requestData, requestId: requestData._id }];
		},
		deleteRequestData(state, action) {
			const { requestId } = action.payload;
			return state.filter((request) => request.requestId !== requestId);
		},
		updateRequestData(state, action) {
			const { requestData } = action.payload;
			return state.map((request) => {
				if (request.requestId === requestData._id) {
					return { ...requestData, requestId: requestData._id };
				} else {
					return request;
				}
			});
		},
	},
});

export const RequestDataActions = RequestDataSlice.actions;
export const RequestDataReducers = RequestDataSlice.reducer;
