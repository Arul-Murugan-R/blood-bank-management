import { Card, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useSelector } from "react-redux";

const MyRequests = () => {
	const userId = useSelector((state) => state.auth.userId);
	const allRequests = useSelector((state) => state.requestData).filter(
		(request) => request.userId === userId
	);
	return (
		<Container sx={{ my: 5 }}>
			{allRequests.map((request, index) => {
				return (
					<Box sx={{ my: 2 }} key={index}>
						<Card>
							<CardContent>
								<Typography variant="h5" component="div">
									{request.numberOfUnits} units of{" "}
									{request.bloodGroup}
								</Typography>
								<Typography variant="body2">
									{request.hospitalName}
								</Typography>
								<Typography variant="body2">
									{request.hospitalAddress}
								</Typography>
								<Typography variant="body2">
									{request.requestDeadline}
								</Typography>
							</CardContent>
						</Card>
					</Box>
				);
			})}
		</Container>
	);
};

export default MyRequests;
