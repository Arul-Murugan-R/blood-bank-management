import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import DonorsMap from "./Map/DonorsMap";

const ViewDonors = () => {
	const { reqId } = useParams();
	return (
		<Box sx={{ mb: 4 }}>
			<DonorsMap reqId={reqId} />
		</Box>
	);
};

export default ViewDonors;
