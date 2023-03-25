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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../Hooks/use-input";
import Error from "../UI/Typography/Error";
import classes from "../Profile/Profile.module.css";
import HospitalData from "../../Utilities/HospitalsData";
import { RequestDataActions } from "../../store/RequestStore";
import { SnackActions } from "../../store/SnackStore";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { validateRequestDate } from "../../Utilities/FormValidationFunctions";
import CustomFormControl from "../UI/FormControl/CustomFormControl";
import moment from "moment";
import axios from "axios";

const allBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const numberOfUnitsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyRequestCard = (props) => {
	const { type } = props;
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
	const [acceptedBy, setAcceptedBy] = useState(null);

	const userId = useSelector((state) => state.auth.userId);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useState(async () => {
		let date = new Date(request.requestDeadline)
		const add = date.getDate()+3
		date.setDate(add)
		// console.log(moment(date).
		// format("YYYY-MM-DD"),moment(new Date())
		// .format("YYYY-MM-DD"),moment(date).
		// format("YYYY-MM-DD")<moment(new Date())
		// .format("YYYY-MM-DD"))
		if(moment(date).
		format("YYYY-MM-DD")<moment(new Date())
		.format("YYYY-MM-DD")){
			// For now it won't work da bcs i didn't set the right url
			// bcs it might cause us creating more requests 
			const response = await axios.post(`${backendUrl}/request/deleteExpire`, {
				requestId: request._id,
				userId,
				secret:import.meta.env.VITE_DELETE_SECRET
			});
			if (response.status === 200) {
				dispatch(
					RequestDataActions.deleteRequestData({
						requestId: request._id,
					})
				);
				dispatch(
					SnackActions.setSnack({
						message: "Request deleted successfully",
						severity: "success",
					})
				);
			}
		}
	},[request])	
	const requiredBefore = useInput(
		{
			type: "date",
			label: "Required Before",
			name: "requiredBefore",
			initialValue: moment(request.requestDeadlinem).format("YYYY-MM-DD"),
		},
		validateRequestDate
	);

	const getAcceptedBy = async () => {
		try {
			const response = await axios.get(
				`${backendUrl}/request/acceptedBy/${request._id}`
			);
			if (response.status === 200) {
				setAcceptedBy(response.data.acceptedBy);
			}
		} catch (error) {
			SnackActions.setSnack({
				message: "Unable to get donors",
				severity: "error",
			});
		}
	};

	useEffect(() => {
		if (request.acceptedBy.length > 0) getAcceptedBy();
	}, []);

	const formIsValid =
		requiredBefore.validities.isValid &&
		requestedFrom &&
		bloodGroup &&
		numberOfUnits;

	const deleteRequestHandler = async () => {
		try {
			const response = await axios.post(`${backendUrl}/request/delete`, {
				requestId: request._id,
				userId,
			});
			if (response.status === 200) {
				dispatch(
					RequestDataActions.deleteRequestData({
						requestId: request._id,
					})
				);
				dispatch(
					SnackActions.setSnack({
						message: "Request deleted successfully",
						severity: "success",
					})
				);
			}
		} catch (error) {
			SnackActions.setSnack({
				message: "Request deletion failed",
				severity: "error",
			});
		}
	};

	const updateRequestHandler = async () => {
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
				setEditMode(false);
			}
		} catch (error) {
			// console.log(error);
			setError(error.response.data.message || error);
		}
	};

	const viewDonors = () => {
		navigate(`/donors/${request._id}`);
	};
	const viewRequest = () => {
		navigate(`/view-request/${request._id}`);
	};
	const dateValid = moment(request.requestDeadline).
					format("YYYY-MM-DD")<moment(new Date().toISOString())
					.format("YYYY-MM-DD")
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
				<Typography variant="body2"  color={dateValid&&request.userId == userId&&'red'}>
					{dateValid&& request.userId == userId &&<span>Request Expired (will be deleted within 3days. Pls update if required )<br/> </span>}
					{moment(request.requestDeadline).format("DD MMMM YYYY")}
				</Typography>
				
				{acceptedBy && acceptedBy.length>0 && (acceptedBy.map((donor,index) => (
					donor&&
					<>
					{index==0&&<Typography variant="body2" fontWeight="bold" key={index}>
						Accepted By<br/>
						</Typography>}
					<Typography variant="body2" key={index}>
						Donor name : {donor.username}, Email Id : {donor.email}, No of Units : {donor.password}
					</Typography>
					</>
				)))}
			</CardContent>
			{type == "my" && (
				<>
					<IconButton
						onClick={() => setEditMode(true)}
						className={classes.editButton}
						sx={{
							position: "absolute",
							border: "1px solid #000",
							p: 1,
						}}
						size="small"
					>
						<Edit fontSize="inherit" />
					</IconButton>
					<IconButton
						onClick={deleteRequestHandler}
						className={classes.deleteButton}
						sx={{
							position: "absolute",
							border: "1px solid #000",
							p: 1,
						}}
						size="small"
					>
						<Delete fontSize="inherit" />
					</IconButton>
					<Button
						variant="outlined"
						color="info"
						onClick={viewDonors}
					>
						View Donors
					</Button>
				</>
			)}
			{type == "others" && (
				<Button variant="outlined" color="info" onClick={viewRequest}>
					View Request
				</Button>
			)}
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
			<center>
				<Button
					variant="contained"
					color="error"
					onClick={updateRequestHandler}
					sx={{ mr: 2 }}
				>
					Update
				</Button>
				<Button
					variant="contained"
					color="error"
					onClick={() => setEditMode(false)}
				>
					Cancel
				</Button>
			</center>
		</Paper>
	);
	return <Box sx={{ my: 2 }}>{editMode ? EditContent : ViewContent}</Box>;
};

export default MyRequestCard;
