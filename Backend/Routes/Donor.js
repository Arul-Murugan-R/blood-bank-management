const router = require("express").Router({ mergeParams: true });
const donors = require("../Controllers/Donor");
const CatchAsync = require("../Utilities/CatchAsync");

router.route("/insert").post(CatchAsync(donors.insertDonorData));

router.route("/get-info/:userId").get(CatchAsync(donors.getDonorDetails));

module.exports = router;