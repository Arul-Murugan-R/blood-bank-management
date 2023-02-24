import moment from "moment";

export const validatePassword = (password) => {
	const regExp =
		/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	password = password.trim();
	if (password.length < 8)
		return {
			validity: false,
			message: "Should contain atleast 8 characters",
		};
	else if (!regExp.test(password))
		return {
			validity: false,
			message: "Should contain atleast a number and a special character",
		};
	return {
		validity: true,
		message: "Looks good!",
	};
};

export const validateUserName = (value) => {
	const regExp = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
	const validity = regExp.test(value.trim());
	if (value.trim() === "")
		return {
			validity: false,
			message: "Field is required",
		};
	else if (!validity)
		return {
			validity: false,
			message: "Should contain characters folllowed by numbers",
		};
	return {
		validity: true,
		message: "Looks good!",
	};
};

export const validateText = (value) => {
	if (!value.trim())
		return {
			validity: value.trim() !== "",
			message: "Field is required",
		};
	return {
		validity: value.trim() !== "",
		message: "Looks good!",
	};
};

export const validateEmail = (email) => {
	const regExp =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	email = email.trim();
	const validity = regExp.test(email);
	if (validity)
		return {
			validity,
			message: "Looks good!",
		};
	return {
		validity,
		message: "Valid email required!",
	};
};

export const validateDate = (date, prev = moment(Date.now())) => {
	const validity = date >= prev.format("YYYY-MM-DD");
	if (validity)
		return {
			validity,
			message: "Looks good!",
		};
	return {
		validity,
		message: "Valid date required!",
	};
};

export const validateMarks = (value) => {
	if (value && value >= 0)
		return {
			validity: true,
			message: "Looks good!",
		};
	return {
		validity: false,
		message: "Valid date required!",
	};
};
