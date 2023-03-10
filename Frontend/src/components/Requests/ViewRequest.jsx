import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SnackActions } from "../../store/SnackStore";
import RequestMap from "../Map/RequestMap";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewRequest = () => {
	const { id } = useParams();
	const request =
		useSelector((state) => state.requestData).find(
			(item) => item._id === id
		) || null;
	const userId = useSelector((state) => state.auth.userId);
	const role = useSelector((state) => state.auth.role);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const updateRequestHandler = async () => {
		try {
			const response = await axios.get(
				`${backendUrl}/request/update-status/` + id
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
					navigate("/");
				}
			}
		} catch (error) {
			console.log(error);
			dispatch(
				SnackActions.setSnack({
					message: "Request update failed",
					severity: "error",
				})
			);
		}
	};

	useEffect(() => {
		if (request == null) {
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
			{request && (
				<Box sx={{ maxWidth: "300px", aspectRatio: "1" }}>
					<RequestMap
						latitude={request.location.latitude}
						longitude={request.location.longitude}
					/>
				</Box>
			)}
			{role === "donor" && (
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
