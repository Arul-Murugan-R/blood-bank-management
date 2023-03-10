const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// antibiotics: null,
// recentTravel: null,
// diseases: null,
// previousDonation: null,
// bloodGroup: null,
// location: { latitude: null, longitude: null },
// lastDonation: null,
// tattoos: null,

const DonorInfoSchema = new Schema({
	tattoo: {
		type: Boolean,
		required: true,
	},
	recentTravel: {
		type: Boolean,
		required: true,
	},
	diseases: {
		type: Boolean,
		required: true,
	},
	previousDonation: {
		type: Boolean,
		required: true,
	},
	bloodGroup: {
		type: String,
		required: true,
	},
	lastDonation: {
		type: Date,
	},
	location: {
		type: {
			latitude: Number,
			longitude: Number,
		},
		required: true,
	},
	antibiotics: {
		type: Boolean,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Donor", DonorInfoSchema);
