import {
	Button,
	Card,
	CardContent,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../Hooks/use-input";
import Error from "../UI/Typography/Error";
import classes from "./Profile.module.css";
import HospitalData from "../../Utilities/HospitalsData";
import { RequestDataActions } from "../../store/RequestStore";
import { SnackActions } from "../../store/SnackStore";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { validateRequestDate } from "../../Utilities/FormValidationFunctions";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import moment from "moment";

const allBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const numberOfUnitsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyRequestCard = (props) => {
	const { request } = props;
	const [editMode, setEditMode] = useState(false);
	const [bloodGroup, setBloodGroup] = useState(request.bloodGroup);
	const [error, setError] = useState(null);
	const [requestedFrom, setRequestedFrom] = useState(
		HospitalData.find((hosp) => hosp.name === request.hospitalName)
	);
	const [selectedHospIndex, setSelectedHospitalIndex] = useState(
		HospitalData.findIndex((hosp) => hosp.name === request.hospitalName)
	);
	const [numberOfUnits, setNumberOfUnits] = useState(request.numberOfUnits);

	const navigate = useNavigate();

	const userId = useSelector((state) => state.auth.userId);
	const dispatch = useDispatch();

	console.log(request.requestDeadline);

	const requiredBefore = useInput(
		{
			type: "date",
			label: "Required Before",
			name: "requiredBefore",
			initialValue: moment(request.requestDeadlinem).format("YYYY-MM-DD"),
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
			id: request._id,
		};

		try {
			const response = await axios.post(`${backendUrl}/request/update`, {
				request: requestData,
			});
			if (response.status === 200) {
				dispatch(
					RequestDataActions.updateRequestData({
						requestData: response.data.request,
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

	const ViewContent = (
		<Card className={classes.viewCard}>
			<CardContent>
				<Typography variant="h5" component="div">
					{request.numberOfUnits} units of {request.bloodGroup}
				</Typography>
				<Typography variant="body2">{request.hospitalName}</Typography>
				<Typography variant="body2">
					{request.hospitalAddress}
				</Typography>
				<Typography variant="body2">
					{request.requestDeadline}
				</Typography>
			</CardContent>
			<IconButton
				onClick={() => setEditMode(true)}
				className={classes.editButton}
			>
				<Edit />
			</IconButton>
		</Card>
	);

	const EditContent = (
		<Paper sx={{ backgroundColor: "white", p: 3 }}>
			{error && <Error message={error} />}
			<FormControl
				fullWidth
				sx={{
					backgroundColor: "white",
					borderRadius: "5px",
					my: 2,
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
				<InputLabel htmlFor="simple-select" id="request-select-label">
					Requested from
				</InputLabel>
				<Select
					labelId="request-select-label"
					id="simple-select"
					defaultValue="Choose an option"
					value={selectedHospIndex || ""}
					label="Requested from"
					onChange={(event) => {
						setRequestedFrom(
							(prev) => HospitalData[+event.target.value]
						);
						setSelectedHospitalIndex((prev) => +event.target.value);
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
			<Button
				variant="contained"
				color="error"
				sx={{ mx: "50%", transform: "translateX(-50%)" }}
				onClick={() => setEditMode(false)}
			>
				Update
			</Button>
		</Paper>
	);
	return <Box sx={{ my: 2 }}>{editMode ? EditContent : ViewContent}</Box>;
};

export default MyRequestCard;
