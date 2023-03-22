import classes from "./Authentication.module.css";
import {
	Card,
	CardMedia,
	CardContent,
	Button,
	CardActions,
	InputLabel,
	Select,
	MenuItem,
	FormControl,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
	validateAge,
	validateEmail,
	validatePassword,
	validatePhoneNumber,
	validateText,
} from "../../Utilities/FormValidationFunctions";
import useInput from "../../Hooks/use-input";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import axios from "axios";
import Error from "../UI/Typography/Error";
import { Link, redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthStore";
import { SnackActions } from "../../store/SnackStore";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const SignUpForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		if (isLoggedIn) {
			dispatch(
				SnackActions.setSnack({
					message: "You need to logout first!",
					severity: "error",
				})
			);
			return navigate("/");
		}
	}, [isLoggedIn]);

	const userField = useInput(
		{ type: "text", label: "Username", name: "username" },
		validateText
	);
	const passwordField = useInput(
		{
			type: "password",
			label: "Password",
			name: "password",
		},
		validatePassword
	);
	const emailField = useInput(
		{
			type: "email",
			label: "Email Id",
			name: "emailId",
		},
		validateEmail
	);

	const dobField = useInput(
		{
			type: "date",
			label: "Date of Birth",
			name: "dob",
		},
		validateAge
	);

	const phone = useInput(
		{
			type: "tel",
			label: "Phone Number",
			name: "phone",
		},
		validatePhoneNumber
	);

	const [showPassword, setShowPassword] = useState(false);
	const [registrationError, setRegistrationerror] = useState(null);
	const [role, setRole] = useState(null);
	const formIsValid =
		userField.validities.isValid &&
		emailField.validities.isValid &&
		passwordField.validities.isValid &&
		role &&
		role == "donor"
			? dobField.validities.isValid
			: true && phone.validities.isValid;

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleMouseDownPassword = (event) => event.preventDefault();

	const registerUser = async () => {
		if (!dobField.validities.isValid && role == "donor") {
			dobField.validities.reset();
			return setRegistrationerror(
				"Only people between 18 and 60 years of age can donate blood"
			);
		}

		if (!formIsValid)
			return setRegistrationerror("Please fill all the fields");

		try {
			const response = await axios.post(backendUrl + "/user/register", {
				username: userField.properties.value,
				email: emailField.properties.value,
				password: passwordField.properties.value,
				role,
				dob: role == "donor" ? dobField.properties.value : null,
				mobileNumber: phone.properties.value,
			});

			const user = response.data.user;
			dispatch(authActions.loginHandler({ user: user }));
			userField.validities.reset();
			emailField.validities.reset();
			passwordField.validities.reset();
			dispatch(
				SnackActions.setSnack({
					message: "Registration Successful",
					severity: "success",
				})
			);
			return role === "donor" ? navigate("/donor-info") : navigate("/");
		} catch (error) {
			setRegistrationerror(
				error.response.data.message || "Something went wrong. Try again"
			);
		}
	};

	return (
		<div className={classes.form}>
			<Card className={classes.card} sx={{ backgroundColor: "#850E35" }}>
				<Link
					to="/"
					style={{
						color: "white",
						textDecoration: "none",
						fontFamily: "monospace",
						fontWeight: "700",
					}}
				>
					{"< Home"}
				</Link>
				<CardMedia
					className={classes.cardMedia}
					component="img"
					image="/assets/signUp.gif"
					alt="green iguana"
				/>
				<CardContent className={classes.CardContent}>
					<form
						id="signUp-Form"
						style={{
							backgroundColor: "white",
							borderRadius: "5px",
							padding: "10px 5px",
						}}
					>
						{registrationError && (
							<Error message={registrationError} />
						)}
						<CustomFormControl
							field={userField}
							IconBtnProps={{ disabled: true }}
							icon="AccountCircle"
						/>
						<CustomFormControl
							field={emailField}
							IconBtnProps={{ disabled: true }}
							icon="Email"
						/>
						<CustomFormControl
							field={phone}
							IconBtnProps={{ disabled: true }}
							icon="LocalPhone"
						/>
						<CustomFormControl
							field={passwordField}
							IconBtnProps={{
								onClick: handleClickShowPassword,
								onMouseDown: handleMouseDownPassword,
								disabled:
									passwordField.properties.value.length === 0,
							}}
							icon={showPassword ? "VisibilityOff" : "Visibility"}
							type={showPassword ? "text" : "password"}
						/>
						<FormControl
							fullWidth
							sx={{
								backgroundColor: "white",
								borderRadius: "5px",
								mb: 2,
							}}
						>
							<InputLabel id="role-select-label">
								Registering as
							</InputLabel>
							<Select
								labelId="role-select-label"
								id="demo-simple-select"
								value={role || ""}
								label="Registering as"
								onChange={(event) =>
									setRole((prev) => event.target.value)
								}
							>
								<MenuItem value={"donor"}>Donor</MenuItem>
								<MenuItem value={"recipient"}>
									Recipient
								</MenuItem>
							</Select>
						</FormControl>
						{role === "donor" && (
							<CustomFormControl field={dobField} />
						)}
					</form>
				</CardContent>
				<CardActions
					sx={{
						justifyContent: "space-evenly",
						flexWrap: "wrap",
					}}
				>
					<Button
						variant="contained"
						fullWidth
						onClick={registerUser}
					>
						Sign Up
					</Button>
					<Link to="/login" className={classes.authLink}>
						Already a member? Login
					</Link>
				</CardActions>
			</Card>
		</div>
	);
};

export default SignUpForm;
