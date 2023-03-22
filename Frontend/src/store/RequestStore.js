import { createSlice } from "@reduxjs/toolkit";

const initialRequestState = [
	{
		_id: null,
		requiredBefore: null,
		numberOfUnits: null,
		bloodGroup: null,
		location: { latitude: null, longitude: null },
		hospital: null,
		address: null,
		acceptedBy: [],
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
			return [...state, { ...requestData }];
		},
		deleteRequestData(state, action) {
			const { requestId } = action.payload;
			return state.filter((request) => request._id !== requestId);
		},
		updateRequestData(state, action) {
			const { requestData } = action.payload;
			return state.map((request) => {
				if (request._id === requestData._id) {
					return { ...requestData };
				} else {
					return request;
				}
			});
		},
	},
});

export const RequestDataActions = RequestDataSlice.actions;
export const RequestDataReducers = RequestDataSlice.reducer;
