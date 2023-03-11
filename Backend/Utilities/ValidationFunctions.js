moment = require("moment");

module.exports.calculateAge = (dob) => {
	const birthdate = moment(dob);
	const today = moment();
	const age = today.diff(birthdate, "years");
	return age;
};

module.exports.canDonate = (date) => {
	const today = moment();
	const diff = today.diff(date, "days");
	if (diff <= 90) {
		return false;
	}
	return true;
};
