const router = require("express").Router();
const donors = require("../Controllers/Donor");
const CatchAsync = require("../Utilities/CatchAsync");

router.route("/insert").post(CatchAsync(donors.insertDonorData));

router.route("/:userId").post(CatchAsync(donors.getDonorDetails));

module.exports = router;
