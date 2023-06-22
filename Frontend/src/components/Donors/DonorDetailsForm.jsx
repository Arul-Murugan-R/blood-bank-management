import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../Hooks/use-input";
import {
	validateLastDonationDate,
	validatePhoneNumber,
	validateYesNo,
} from "../../Utilities/FormValidationFunctions";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import CustomRadioControl from "../UI/FormControl/CustomRadioControl";
import Error from "../UI/Typography/Error";
import classes from "../Profile/Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { DonorDataActions } from "../../store/DonorData";
import { SnackActions } from "../../store/SnackStore";

/* 
phone
address
group
dob
last donation
health status
disease
tattoos
antibiotics
trecently travelled to 
weight
*/

const allBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UserDetailsForm = (props) => {
	const navigate = useNavigate();
	const [location, setLocation] = useState({
		latitude: null,
		longitude: null,
	});

	const userId = useSelector((state) => state.auth.userId);

	const [previousDonated, setPreviousDonated] = useState(false);

	const [bloodGroup, setBloodGroup] = useState(null);

	const [error, setError] = useState(null);

	const dispatch = useDispatch();

	const updatePreviousDonated = (value) => {
		setPreviousDonated(() => Boolean(+value));
	};

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const { latitude, longitude } = position.coords;
			setLocation({ latitude, longitude });
		});
	}, []);

	const antibiotics = useInput(
		{
			label: "Have you taken any antibiotics in the past few weeks?",
			name: "antibiotics",
		},
		validateYesNo
	);

	const tattoos = useInput(
		{
			type: "radio",
			label: "Did you get any tattoo within the last 6 months?",
			name: "tattoos",
		},
		validateYesNo
	);

	const previousDonation = useInput(
		{
			type: "radio",
			label: "Have you donated blood before?(in the last 6 months)",
			name: "previousDonation",
		},
		validateYesNo,
		updatePreviousDonated
	);

	const recentTravel = useInput(
		{
			type: "radio",
			label: "Have you recently travelled to any foreign country with high rates of infectious diseases in the past 6 months?",
			name: "recentTravel",
		},
		validateYesNo
	);

	const diseases = useInput(
		{
			type: "radio",
			label: "Do you have any chronic diseases?",
			name: "diseases",
		},
		validateYesNo
	);

	const lastDonation = useInput(
		{
			type: "date",
			label: "Last Donation",
			name: "lastDonation",
		},
		validateLastDonationDate
	);

	const formIsValid =
		bloodGroup &&
		antibiotics.validities.isValid &&
		tattoos.validities.isValid &&
		recentTravel.validities.isValid &&
		diseases.validities.isValid &&
		previousDonation.validities.isValid &&
		(!+previousDonation.properties.value ||
			lastDonation.validities.isValid);

	const SubmitDetails = async () => {
		try {
			if (!formIsValid) {
				return setError("Please fill all the fields!");
			}

			if (!location.latitude || !location.longitude) {
				return setError("Please allow location access!");
			}
			setError(null);
			const data = {
				userId,
				bloodGroup,
				antibiotics: Boolean(+antibiotics.properties.value),
				tattoo: Boolean(+tattoos.properties.value),
				recentTravel: Boolean(+recentTravel.properties.value),
				diseases: Boolean(+diseases.properties.value),
				previousDonation: Boolean(+previousDonation.properties.value),
				lastDonation: Boolean(+previousDonation.properties.value)
					? lastDonation.properties.value
					: null,
				location,
			};

			const response = await axios.post(backendUrl + "/donor/insert", {
				data,
			});
			if (response.status === 200) {
				dispatch(DonorDataActions.setDonorData({ donorData: data }));
				dispatch(
					SnackActions.setSnack({
						message: "Details updated successfully!",
						severity: "success",
					})
				);
				navigate("/");
			}
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	return (
		<Container
			sx={{ backgroundColor: "white", my: 4, borderRadius: 2, pt: 1 }}
			maxWidth="lg"
		>
			<div className={classes.formContainer}>
				<form className={classes.form}>
					{error && <Error message={error} />}
					<FormControl
						fullWidth
						sx={{
							backgroundColor: "white",
							borderRadius: "5px",
							mb: 2,
						}}
					>
						<InputLabel
							htmlFor="simple-select"
							id="blood-select-label"
						>
							Blood group
						</InputLabel>
						<Select
							labelId="blood-select-label"
							id="simple-select"
							value={bloodGroup || ""}
							label="Blood group"
							onChange={(event) =>
								setBloodGroup((prev) => event.target.value)
							}
						>
							{allBloodGroups.map((group) => (
								<MenuItem value={group} key={group}>
									{group}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<CustomRadioControl field={antibiotics} />
					<CustomRadioControl field={tattoos} />
					<CustomRadioControl field={recentTravel} />
					<CustomRadioControl field={diseases} />
					<CustomRadioControl field={previousDonation} />
					{previousDonated && (
						<CustomFormControl field={lastDonation} />
					)}
					<Button
						variant="contained"
						color={"error"}
						sx={{
							my: 2,
							left: "50%",
							transform: "translateX(-50%)",
						}}
						onClick={SubmitDetails}
					>
						Submit
					</Button>
				</form>
			</div>
		</Container>
	);
};

export default UserDetailsForm;
