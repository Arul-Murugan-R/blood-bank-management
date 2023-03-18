import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { Popup } from "react-map-gl";
import { useDispatch } from "react-redux";
import { SnackActions } from "../../../store/SnackStore";
import classes from "./Map.module.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const DonorsCards = (props) => {
	const { popupInfo, setPopupInfo, reqId } = props;
	const dispatch = useDispatch();

	const notifyDonor = async () => {
		try {
			const response = await axios.post(
				backendUrl + "/user/notify-donor",
				{
					donorId: popupInfo.id,
					requestId: reqId,
					fake: true,
				}
			);
			if (response.status === 200) {
				dispatch(
					SnackActions.setSnack({
						message: response.data.message,
						severity: "success",
					})
				);
			}
		} catch (error) {
			dispatch(
				SnackActions.setSnack({
					message:
						error.response.data.message ||
						"Something went wrong. Try again",
					severity: "error",
				})
			);
		}
	};
	return (
		<Popup
			focusAfterOpen={false}
			anchor="left"
			longitude={Number(popupInfo.location.longitude)}
			latitude={Number(popupInfo.location.latitude)}
			onClose={() => setPopupInfo(null)}
		>
			<Box className={classes.popupBox}>
				<Typography variant="h6" fontWeight={"bold"}>
					{popupInfo.name}
				</Typography>
				<Typography variant="body1">{popupInfo.bloodGroup}</Typography>
				<Box>
					<Button
						onClick={notifyDonor}
						variant="contained"
						color="error"
					>
						Request
					</Button>
				</Box>
			</Box>
		</Popup>
	);
};

export default DonorsCards;
