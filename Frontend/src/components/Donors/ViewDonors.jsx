import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DonorsMap from "./Map/DonorsMap";

const ViewDonors = () => {
	const { reqId } = useParams();
	const donors = useSelector((state) => state.donorInfo);
	return (
		<>
			<DonorsMap reqId={reqId} />
		</>
	);
};

export default ViewDonors;
