const router = require("express").Router();
const users = require("../Controllers/Users");
const CatchAsync = require("../Utilities/CatchAsync");
require("dotenv").config();

router.route("/register").post(CatchAsync(users.registerUser));

router.route("/login").post(CatchAsync(users.loginUser));

router.route("/verify").post(CatchAsync(users.verifyUser));

router.route("/notify-donor").post(CatchAsync(users.notifyDonor));

router.get("/logout", users.logoutUser);

module.exports = router;
