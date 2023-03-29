import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInput from "../../Hooks/use-input";
import { validateRequestDate } from "../../Utilities/FormValidationFunctions";
import HospitalData from "../../Utilities/HospitalsData";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import Error from "../UI/Typography/Error";
import axios from "axios";
import { RequestDataActions } from "../../store/RequestStore";
import { SnackActions } from "../../store/SnackStore";

const allBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const numberOfUnitsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RequestBloodForm = () => {
	const navigate = useNavigate();
	const [location, setLocation] = useState({
		latitude: null,
		longitude: null,
	});

	const userId = useSelector((state) => state.auth.userId);
	const [bloodGroup, setBloodGroup] = useState(null);
	const [error, setError] = useState(null);
	const [requestedFrom, setRequestedFrom] = useState(null);
	const [selectedHospIndex, setSelectedHospitalIndex] = useState(null);
	const [numberOfUnits, setNumberOfUnits] = useState(1);

	const dispatch = useDispatch();

	const requiredBefore = useInput(
		{
			type: "date",
			label: "Required Before",
			name: "requiredBefore",
		},
		validateRequestDate
	);

	const formIsValid =
		requiredBefore.validities.isValid &&
		requestedFrom &&
		bloodGroup &&
		numberOfUnits;

	const submitRequestHandler = async () => {
		if (!formIsValid) {
			return setError("Please fill all the fields");
		}
		const requestData = {
			userId,
			bloodGroup,
			location: {
				latitude: +requestedFrom.latitude,
				longitude: +requestedFrom.longitude,
			},
			hospitalName: requestedFrom.name,
			hospitalAddress: requestedFrom.address,
			numberOfUnits,
			requestDeadline: requiredBefore.properties.value,
		};

		try {
			const response = await axios.post(`${backendUrl}/request/add`, {
				data: requestData,
			});
			if (response.status === 200) {
				dispatch(
					RequestDataActions.addRequestData({
						requestData: response.data.requestData,
					})
				);
				dispatch(
					SnackActions.setSnack({
						message: "Request added successfully",
						severity: "success",
					})
				);
				return navigate("/");
			}
		} catch (error) {
			setError(error.response.data.message || error);
		}
	};

	return (
		<Container
			sx={{ backgroundColor: "white", my: 5, borderRadius: "10px" }}
			maxWidth="lg"
		>
			<div>
				<Typography variant="h4" textAlign={"center"} sx={{ py: 2 }}>
					Request Blood
				</Typography>
				<form>
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
							htmlFor="simple-select-blood"
							id="blood-select-label"
						>
							Blood group
						</InputLabel>
						<Select
							labelId="blood-select-label"
							id="simple-select-blood"
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
							id="request-select-label"
						>
							Requested from
						</InputLabel>
						<Select
							labelId="request-select-label"
							id="simple-select"
							defaultValue="Choose an option"
							value={selectedHospIndex>=0?selectedHospIndex:""}
							label="Requested from"
							onChange={(event) => {
								setRequestedFrom(
									(prev) => HospitalData[+event.target.value]
								);
								setSelectedHospitalIndex(
									(prev) => +event.target.value
								);
							}}
						>
							{HospitalData.map((hosp, index) => (
								<MenuItem value={index} key={index}>
									{hosp.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl
						fullWidth
						sx={{
							backgroundColor: "white",
							borderRadius: "5px",
							mb: 2,
						}}
					>
						<InputLabel
							htmlFor="simple-select-units"
							id="units-select-label"
						>
							Number of units
						</InputLabel>
						<Select
							labelId="units-select-label"
							id="simple-select-units"
							value={numberOfUnits}
							label="Number of units"
							onChange={(event) =>
								setNumberOfUnits((prev) => event.target.value)
							}
						>
							{numberOfUnitsArr.map((unit) => (
								<MenuItem value={unit} key={unit}>
									{unit}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<CustomFormControl field={requiredBefore} />
				</form>
				<Button
					sx={{
						my: 2,
						left: "50%",
						transform: "translateX(-50%)",
					}}
					variant="contained"
					color="error"
					onClick={submitRequestHandler}
				>
					Request
				</Button>
			</div>
		</Container>
	);
};

export default RequestBloodForm;
