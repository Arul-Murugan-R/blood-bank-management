const Request = require("../Models/Request");
const User = require("../Models/User");

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
		console.log(requests);
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
		if (request.userId !== req.body.userId) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		const updatedRequest = await Request.findByIdAndUpdate(
			reqID,
			req.body.request,
			{ new: true }
		);
		return res.status(200).json({
			message: "Request updated successfully",
			request: updatedRequest,
		});
	} catch (e) {
		return res.status(401).json({
			message: "Request update failed",
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
		if (request.userId !== req.body.userId) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		await Request.findByIdAndDelete(reqID);
		return res.status(200).json({
			message: "Request deleted successfully",
		});
	} catch (e) {
		return res.status(401).json({
			message: "Request deletion failed",
			err: e,
		});
	}
};
