import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Popup } from "react-map-gl";
import classes from "./Map.module.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const DonorsCards = (props) => {
	const { popupInfo, setPopupInfo } = props;
	return (
		<Popup
			focusAfterOpen={false}
			anchor="left"
			longitude={Number(popupInfo.longitude)}
			latitude={Number(popupInfo.latitude)}
			onClose={() => setPopupInfo(null)}
		>
			<Box className={classes.popupBox}>
				<img src={`/assets/${popupInfo.img}.png`} alt="male-logo" />
				<Typography variant="h6" fontWeight={"bold"}>
					{popupInfo.name}
				</Typography>
				<Typography variant="body1">{popupInfo.role}</Typography>
				<Typography variant="caption">
					{popupInfo.description}
				</Typography>
				<Box>
					<IconButton href={popupInfo.linkedIn}>
						<LinkedInIcon />
					</IconButton>
					<IconButton href={popupInfo.mail}>
						<EmailIcon />
					</IconButton>
				</Box>
			</Box>
		</Popup>
	);
};

export default DonorsCards;
