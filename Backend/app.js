const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ExpressError = require("./utilities/ExpressError");
const userRoutes = require("./Routes/User");
const donorRoutes = require("./Routes/Donor");
const requestRoutes = require("./Routes/Request");
require("dotenv").config();
app.use(express.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

const url = process.env.DB_URL || "mongodb://localhost:27017/blood-bank";

mongoose
	.connect(url)
	.then(() => {
		console.log("MONGO CONNECTION OPEN!!!");
	})
	.catch((err) => {
		console.log("OH NO MONGO ERROR!!!!");
		console.log(err);
	});

app.use("/user", userRoutes);
app.use("/donor", donorRoutes);
app.use("/request", requestRoutes);

app.all("*", (req, res, next) => {
	next(new ExpressError("Page not found", 404));
});

app.use((err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.message) err.message = "Oh No,Something Went Wrong!";
	return res.status(status).json({ message: err.message });
});

app.listen(5000, () => {
	console.log("Server running at 5000");
});
