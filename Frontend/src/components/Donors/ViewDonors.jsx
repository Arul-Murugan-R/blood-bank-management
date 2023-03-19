import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DonorsMap from "./Map/DonorsMap";

const ViewDonors = () => {
	const { reqId } = useParams();
	const donors = useSelector((state) => state.donorInfo);
	return (
		<Box sx={{ mb: 4 }}>
			<DonorsMap reqId={reqId} />
		</Box>
	);
};

export default ViewDonors;
