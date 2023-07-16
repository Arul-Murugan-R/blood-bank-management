const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	const authHeader = await req.get("Authorization");
	if (!authHeader) {
		const err = new Error("Not Authorized");
		err.statusCode = 401;
		throw err;
	}
	const token = await authHeader.split(" ")[1];
	let jwtVerification;
	try {
		jwtVerification = await jwt.verify(token, process.env.SECRET);
	} catch (err) {
		err.statusCode = 500;
		throw err;
	}
	if (!jwtVerification) {
		const err = new Error("Not Authorized");
		err.statusCode = 401;
		throw err;
	}
	req.userId = await jwtVerification.id;
	next();
};
