const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
	hospitalName: {
		type: String,
		required: true,
	},
	hospitalAddress: {
		type: String,
		required: true,
	},
	numberOfUnits: {
		type: Number,
		required: true,
	},
	bloodGroup: {
		type: String,
		required: true,
	},
	requestDeadline: {
		type: Date,
		required: true,
	},
	location: {
		type: {
			latitude: Number,
			longitude: Number,
		},
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Request", RequestSchema);
