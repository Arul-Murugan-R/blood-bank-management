const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		unique: true,
	},
	role: {
		type: String,
		required: true,
		enum: ["recipient", "donor"],
	},
	dob: {
		type: Date,
	},
	mobileNumber: {
		type: Number,
		required: true,
	},
	isProfileComplete: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("User", UserSchema);
