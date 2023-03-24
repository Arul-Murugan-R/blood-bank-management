const Request = require("../Models/Request");
const User = require("../Models/User");
const nodemailer = require("nodemailer");

const secret = process.env.SECRET;
const ClientUrl = process.env.FRONT_END_URL;

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	service: "gmail",
	secure: false,
	auth: {
		user: "18balagurus@gmail.com",
		pass: process.env.APP_PASSWORD,
	},
	debug: false,
	tls: {
		rejectUnauthorized: false,
	},
});

module.exports.insertRequestData = async (req, res, next) => {
	try {
		const {
			hospitalAddress,
			hospitalName,
			numberOfUnits,
			bloodGroup,
			requestDeadline,
			location,
			userId,
		} = req.body.data;
		const request = new Request({
			hospitalAddress,
			hospitalName,
			numberOfUnits,
			bloodGroup,
			requestDeadline,
			location,
			userId,
		});
		await request.save();
		return res.status(200).json({
			message: "Request data inserted successfully",
			requestData: request,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Request data insertion failed",
			err: e,
		});
	}
};

module.exports.getRequestDetails = async (req, res, next) => {
	try {
		const reqID = req.params.id;
		const request = await Request.findById(reqID);
		if (request === null) {
			return res.status(404).json({
				message: "Request not found",
			});
		}
		return res.status(200).json({
			message: "Request data fetched successfully",
			requestData: request,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Request data fetching failed",
			err: e,
		});
	}
};

module.exports.getAllRequests = async (req, res, next) => {
	try {
		const requests = await Request.find({});
		return res.status(200).json({
			message: "Requests fetched successfully",
			requests: requests,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Requests fetching failed",
			err: e,
		});
	}
};

module.exports.updateRequest = async (req, res, next) => {
	try {
		const reqID = req.body.request.id;
		const request = await Request.findById(reqID);
		if (request === null) {
			return res.status(404).json({
				message: "Request not found",
			});
		}
		if (request.userId.equals(req.body.request.userId)) {
			const updatedRequest = await Request.findByIdAndUpdate(
				reqID,
				req.body.request,
				{ new: true }
			);
			return res.status(200).json({
				message: "Request updated successfully",
				request: updatedRequest,
			});
		}
		return res.status(401).json({
			message: "Unauthorized",
		});
	} catch (e) {
		return res.status(401).json({
			message: "Request update failed",
			err: e,
		});
	}
};

module.exports.updateDonationInfo = async (req, res, next) => {
	try {
		const reqID = req.params.requestId;
		// const userId = req.params.userId;
		const request = await Request.findById(reqID);
		if (request === null) {
			return res.status(404).json({
				message: "Request not found",
			});
		}
		if(request.status === "Accepted"){
			return res.status(401).json({
				message: "Request already accepted",
			});
		}
		console.log(req.userId);
		if(request.userId.equals(req.userId)){
			return res.status(401).json({
				message: "You cannot accept your own request",
			});
		}
		const recipient = await User.findById(request.userId);
		const donor = await User.findById(req.userId);
		request.numberOfUnits = request.numberOfUnits - 1;
		request.acceptedBy.push(req.userId);
		if (request.numberOfUnits === 0) request.status = "Accepted";
		await request.save();
		const mailOptions = {
			from: "bloodbank@email.com",
			to: recipient.email,
			subject: "Donation acceptance",
			html: `<h3>Donor ${donor.username} has accepted your request</h3>
                <p>Donor's contact number: ${donor.mobileNumber}</p>
                <p>Donor's email: ${donor.email}</p>`,
		};
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				return res.status(500).json({
					message: "Notification failure! Please try again.",
					error: err,
				});
			} else {
				return res.status(200).json({
					message: "Notification sent successfully!",
				});
			}
		});

		return res.status(200).json({
			message: "Donation info updated successfully",
			request: request,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Donation info update failed",
			err: e,
		});
	}
};

module.exports.getAcceptedBy = async (req, res, next) => {
	try {
		const reqID = req.params.id;
		const request = await Request.findById(reqID);
		if (request === null) {
			return res.status(404).json({
				message: "Request not found",
			});
		}
		let acceptedBy = [];
		for (let i = 0; i < request.acceptedBy.length; i++) {
			var index = acceptedBy.findIndex((user) => user._id.toString() == request.acceptedBy[i].toString());
			if(index!=-1){
				acceptedBy[index].password++;
				continue;
			}
			let user = await User.findById(request.acceptedBy[i]);
			if(!user)continue;
			acceptedBy.push(user);
			if(user)acceptedBy[i]['password']=1;
		}
		return res.status(200).json({
			message: "Accepted by fetched successfully",
			acceptedBy: acceptedBy,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Accepted by fetching failed",
			err: e,
		});
	}
};

module.exports.deleteRequest = async (req, res, next) => {
	try {
		const reqID = req.body.requestId;
		const request = await Request.findById(reqID);
		if (request === null) {
			return res.status(404).json({
				message: "Request not found",
			});
		}
		if (request.userId.equals(req.body.userId)) {
			await Request.findByIdAndDelete(reqID);
			return res.status(200).json({
				message: "Request deleted successfully",
			});
		}
		return res.status(401).json({
			message: "Unauthorized",
		});
	} catch (e) {
		return res.status(401).json({
			message: "Request deletion failed",
			err: e,
		});
	}
};
