import classes from "./Authentication.module.css";
import {
	Card,
	CardMedia,
	CardContent,
	Button,
	CardActions,
} from "@mui/material";
import { useState } from "react";
import {
	validatePassword,
	validateText,
} from "../../Utilities/FormValidationFunctions";
import useInput from "../../Hooks/use-input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../UI/Typography/Error";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/AuthStore";
import CustomFormControl from "../UI/FormControl/CustomFormControl";

const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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

	const formIsValid =
		userField.validities.isValid && passwordField.validities.isValid;

	const [showPassword, setShowPassword] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const handleClickShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	const handleMouseDownPassword = (event) => event.preventDefault();

	const loginUser = async (event) => {
		try {
			event.preventDefault();
			const response = await axios.post(
				"http://localhost:5000/user/login",
				{
					username: userField.properties.value,
					password: passwordField.properties.value,
				}
			);
			const user = response.data.user;
			dispatch(authActions.loginHandler({ user: user }));
			userField.validities.reset();
			passwordField.validities.reset();
			return navigate(-1);
		} catch (error) {
			setLoginError(error.response.data.message);
		}
	};

	return (
		<Card className={classes.card}>
			<CardMedia
				className={classes.cardMedia}
				component="img"
				image="/assets/signUp.gif"
				alt="green iguana"
			/>
			<CardContent>
				{loginError && <Error message={loginError} />}
				<form id="login-form">
					<CustomFormControl
						field={userField}
						IconBtnProps={{ disabled: true }}
						icon="AccountCircle"
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
					onClick={loginUser}
					disabled={!formIsValid}
					type="submit"
					form="login-form"
				>
					Login
				</Button>
				<Link to="/register" className={classes.authLink}>
					New user? Sign up
				</Link>
			</CardActions>
		</Card>
	);
};

export default LoginForm;
