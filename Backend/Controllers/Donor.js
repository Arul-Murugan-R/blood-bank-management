const ExpressError = require("../utilities/ExpressError");
const Donor = require("../Models/Donor");
const User = require("../Models/User");
const { canDonate, calculateAge } = require("../utilities/ValidationFunctions");

module.exports.insertDonorData = async (req, res, next) => {
	try {
		const {
			tattoo,
			recentTravel,
			diseases,
			previousDonation,
			bloodGroup,
			lastDonation,
			location,
			antibiotics,
			userId,
		} = req.body.data;
		const donor = new Donor({
			tattoo,
			recentTravel,
			diseases,
			previousDonation,
			bloodGroup,
			lastDonation,
			location,
			antibiotics,
			userId,
		});
		await donor.save();
		return res.status(200).json({
			message: "Donor data inserted successfully",
			donorData: donor,
		});
	} catch (e) {
		console.log(e);
		return res.status(401).json({
			message: "Donor data insertion failed",
			err: e,
		});
	}
};

module.exports.updateLastDonation = async (req, res, next) => {
	try {
		const { userId } = req.params;
		const donor = await Donor.findOne({ userId: userId });
		donor.lastDonation = new Date();
		donor.previousDonation = true;
		await donor.save();
		return res.status(200).json({
			message: "Donor data updated successfully",
			donorData: donor,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Donor data updation failed",
			err: e,
		});
	}
};

module.exports.getDonorDetails = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const donor = await Donor.findOne({ userId: userId });
		return res.status(200).json({
			message: "Donor data fetched successfully",
			donorData: donor,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Donor data fetching failed",
			err: e,
		});
	}
};

module.exports.getAllDonors = async (req, res, next) => {
	try {
		const data = [];
		const donors = await Donor.find({});
		for (let i = 0; i < donors.length; i++) {
			if (canDonate(donors[i].lastDonation)) {
				const donor = {
					user_id: donors[i].userId,
					username: await User.findById(donors[i].userId).username,
					mobileNumber: await User.findById(donors[i].userId)
						.mobileNumber,
					location: {
						latitude: donors[i].location.latitude,
						longitude: donors[i].location.longitude,
					},
					bloodGroup: donors[i].bloodGroup,
					age: calculateAge(donors[i].dob),
				};
				data.push(donor);
			}
		}
		return res.status(200).json({
			message: "Donor data fetched successfully",
			donorData: data,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Donor data fetching failed",
			err: e,
		});
	}
};
