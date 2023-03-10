import { Card, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useSelector } from "react-redux";
import MyRequestCard from "./MyRequestCard";

const MyRequests = () => {
	const userId = useSelector((state) => state.auth.userId);
	const allRequests = useSelector((state) => state.requestData).filter(
		(request) => request.userId === userId
	);
	return (
		<Container sx={{ my: 5 }}>
			{allRequests.map((request, index) => {
				return <MyRequestCard request={request} key={index} />;
			})}
		</Container>
	);
};

export default MyRequests;
