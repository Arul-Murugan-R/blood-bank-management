const User = require("../Models/User");
const ExpressError = require("../utilities/ExpressError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;
const options = {
	expiresIn: process.env.EXPIRESIN,
};

module.exports.registerUser = async (req, res, next) => {
	try {
		const { email, username, password, role } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({
			email,
			username,
			password: hashedPassword,
			role,
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

module.exports.logoutUser = async (req, res, next) => {
	await req.logout(function (err) {
		if (err) return next(err);
		return res.status(200).json({
			message: "Successfully Logged out",
		});
	});
};
