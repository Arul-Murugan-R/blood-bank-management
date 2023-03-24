import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SnackActions } from "../../store/SnackStore";
import RequestMap from "../Donors/Map/RequestMap";
import axios from "axios";
import { RequestDataActions } from "../../store/RequestStore";
import { Card, CardContent, Typography } from "@mui/material";
import moment from "moment";
import { whoCanDonate } from "../../Utilities/WhoCanDonate";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewRequest = () => {
	const { id } = useParams();
	const request =
		useSelector((state) => state.requestData).find(
			(item) => item._id === id
		) || null;
	const userId = useSelector((state) => state.auth.userId);
	const role = useSelector((state) => state.auth.role);
	const bloodGrp = useSelector((state) => state.donorData.bloodGroup);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(request);
	const fetchUser = async () => {
		try {
			const response = await axios.get(
				`${backendUrl}/user/get-request/${id}`
			);
			if (response.status === 200) {
				dispatch(
					RequestDataActions.updateRequestData({
						requestData: response.data.request,
					})
				);
			}
		} catch (error) {
			dispatch(
				SnackActions.setSnack({
					message: "Something went wrong",
					severity: "error",
				})
			);
		}
	};

	const ViewContent = (
		<Card
			style={{
				position: "relative",
				background: "#2a3338",
				color: "#ccc",
			}}
		>
			<CardContent>
				<Typography variant="h5" component="div">
					Request For ({request.numberOfUnits} units of{" "}
					{request.bloodGroup})
				</Typography>
				<Typography variant="body2">
					From {request.hospitalName}
				</Typography>
				<Typography variant="body2">
					{request.hospitalAddress}
				</Typography>
				<Typography variant="body2">
					Located Latitude : {request.location.latitude} &nbsp;
					Longitude :{request.location.longitude}
				</Typography>
				<Typography variant="body2">
					{moment(request.requestDeadline).format("DD MMMM YYYY")}
				</Typography>
			</CardContent>
		</Card>
	);

	const updateRequestHandler = async () => {
		try {
			console.log(id);
			const response = await axios.get(
				`${backendUrl}/request/update-status/` + id,
				{
					headers: {
						"Content-Type": "application/json",
						"Authorization":localStorage.getItem("token"),
					},
				}
			);
			if (response.status === 200) {
				const updateDonor = await axios.get(
					`${backendUrl}/donor/update-last-donation/${userId}`
				);
				if (updateDonor.status === 200) {
					dispatch(
						SnackActions.setSnack({
							message: "Request accepted",
							severity: "success",
						})
					);
					dispatch(
						RequestDataActions.updateRequestData({
							requestData: response.data.request,
						})
					);
					navigate("/");
				}
			}
		} catch (error) {
			console.log(error);
			dispatch(
				SnackActions.setSnack({
					message: "Request update failed "+error.response.data.message,
					severity: "error",
				})
			);
		}
	};

	useEffect(() => {
		if (request == null) {
			console.log(id);
			dispatch(
				SnackActions.setSnack({
					message: "Request not found",
					severity: "error",
				})
			);
			navigate("/");
		}
	}, [request]);

	return (
		<Container sx={{ my: 5 }}>
			{request && ViewContent}
			{request && (
				<Box sx={{ maxWidth: "300px", aspectRatio: "1", m: 2 }}>
					<RequestMap
						latitude={request.location.latitude}
						longitude={request.location.longitude}
					/>
				</Box>
			)}
			{role === "donor" && (
				whoCanDonate[bloodGrp].find(
					(item) => item === request.bloodGroup
				) &&
				<Button
					variant="contained"
					color="error"
					onClick={updateRequestHandler}
					sx={{ my: 2 }}
				>
					Accept
				</Button>
			)}
		</Container>
	);
};

export default ViewRequest;
