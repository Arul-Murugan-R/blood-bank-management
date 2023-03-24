const router = require("express").Router();
const request = require("../Controllers/Request");
const CatchAsync = require("../Utilities/CatchAsync");
const tokAuth = require("../middleware/tokAuth");

router.route("/add").post(CatchAsync(request.insertRequestData));

router.route("/all").get(CatchAsync(request.getAllRequests));

router.route("/get/:id").get(CatchAsync(request.getRequestDetails));

router.route("/update").post(CatchAsync(request.updateRequest));

router.route("/acceptedBy/:id").get(CatchAsync(request.getAcceptedBy));

router
	.route("/update-status/:requestId")
	.get(tokAuth,CatchAsync(request.updateDonationInfo));

router.route("/delete").post(CatchAsync(request.deleteRequest));

module.exports = router;
