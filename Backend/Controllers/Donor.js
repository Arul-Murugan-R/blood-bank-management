const ExpressError = require("../utilities/ExpressError");
const Donor = require("../models/DonorInfo");

module.exports.insertDonorData = async (req, res, next) => {
	try {
		const {
			mobilenumber,
			tattoo,
			recentTravel,
			diseases,
			previousDonation,
			bloodGroup,
			lastDonation,
			location,
			antibiotics,
			userId,
		} = req.body;
		const donor = new Donor({
			mobilenumber,
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
			donor: donor,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Donor data insertion failed",
			err: e,
		});
	}
};
