const User = require("../Models/User");
const ExpressError = require("../utilities/ExpressError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const secret = process.env.SECRET;
const options = {
	expiresIn: process.env.EXPIRESIN,
};
const ClientUrl = process.env.FRONT_END_URL;
const Request = require("../Models/Request");

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

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, password, role, mobileNumber, dob } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({
			email,
			username,
			password: hashedPassword,
			role,
			dob,
			mobileNumber,
		});
		await user.save();
		const token = jwt.sign({ id: user._id.toString() }, secret, options);

		const expiry =
			Date.now() + +options.expiresIn.slice(0, 2) * 60 * 60 * 100;

		return res.status(200).json({
			message: "Registration successfull",
			user: {
				token: "BEARER " + token,
				username: user.username,
				userId: user._id,
				expiresAt: expiry,
			},
		});
	} catch (e) {
		console.log(e);
		const existingField =
			Object.keys(e.keyPattern)[0][0].toUpperCase() +
			Object.keys(e.keyPattern)[0].slice(1);
		return res.status(401).json({
			message: `Registration failed. ${existingField} exists!`,
			err: e,
		});
	}
};

module.exports.loginUser = async (req, res, next) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	if (user) {
		const userIsValid = await bcrypt.compare(password, user.password);
		if (userIsValid) {
			const token = jwt.sign({ id: user._id }, secret, options);
			const expiry =
				Date.now() + +options.expiresIn.slice(0, 2) * 60 * 60 * 100;
			return res.status(200).json({
				message: "Login successfull!",
				user: {
					token: "BEARER " + token,
					userId: user._id,
					expiresAt: expiry,
					username: user.username,
					role: user.role,
				},
			});
		}
		return next(new ExpressError("Password is incorrect.Try again!", 401));
	}
	return res.status(404).json({
		message: "User not found!",
	});
};

module.exports.verifyUser = async (req, res, next) => {
	const token = req.body.token.slice(7);
	try {
		const verificationResult = jwt.verify(token, secret);
		const user = await User.findById(verificationResult.id);
		return res.status(200).json({
			message: "Authentic user",
			user: {
				username: user.username,
				userId: user._id,
				role: user.role,
			},
		});
	} catch (error) {
		res.status(401).json({
			message: "Unauthorized user",
			error: error,
		});
	}
};

module.exports.getUserInfo = async (req, res, next) => {
	const { userId } = req.params;
	try {
		const user = await User.findById(userId);
		if (user) {
			return res.status(200).json({
				message: "User found",
				user: {
					username: user.username,
					email: user.email,
					role: user.role,
				},
			});
		}
	} catch (e) {
		return res.status(404).json({
			message: "User not found",
			error: e,
		});
	}
};

module.exports.notifyDonor = async (req, res, next) => {
	const { donorId, reqId, fake } = req.body;
	if (fake)
		return res.status(200).json({
			message: "Notification sent successfully!",
		});
	try {
		const user = await User.findById(donorId);
		const request = await Request.findById(reqId);
		const recipient = await User.findById(request.userId);
		const token = jwt.sign({ id: user._id }, secret, options);
		const expiry =
			Date.now() + +options.expiresIn.slice(0, 2) * 60 * 60 * 100;
		const href = `${ClientUrl}email-login/${reqId}/BEARER ${token}/${expiry}/${user._id}`;
		if (user.role == "donor") {
			const mailOptions = {
				from: "bloodbank@email.com",
				to: user.email,
				subject: "Blood Donation",
				html: `<h3>Urgent Blood required: ${request.numberOfUnits}units of ${request.bloodGroup} at ${request.hospitalName}, ${request.hospitalAddress}</h3>
                <a href='${href}'>Click here to view more</a>
                <a href='https://www.google.com/maps/search/${request.location.latitude},${request.location.longitude}/@${request.location.latitude},${request.location.longitude},13z'>Location `,
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
		}
	} catch (e) {
		return res.status(404).json({
			message: "User not found",
			error: e,
		});
	}
};

module.exports.logoutUser = async (req, res, next) => {
	await req.logout(function (err) {
		if (err) return next(err);
		return res.status(200).json({
			message: "Successfully Logged out",
		});
	});
};
