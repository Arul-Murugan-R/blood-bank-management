import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialUserDataState = {
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
