const router = require("express").Router();
const request = require("../Controllers/Request");
const CatchAsync = require("../Utilities/CatchAsync");

router.route("/add").post(CatchAsync(request.insertRequestData));

router.route("/all").get(CatchAsync(request.getAllRequests));

router.route("/get/:id").get(CatchAsync(request.getRequestDetails));

router.route("/update/:id").post(CatchAsync(request.updateRequest));

router.route("/delete/:id").delete(CatchAsync(request.deleteRequest));

module.exports = router;
