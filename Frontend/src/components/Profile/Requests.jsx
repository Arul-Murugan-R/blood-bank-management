import { Card, CardContent, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useSelector } from "react-redux";
import MyRequestCard from "./MyRequestCard";



const Requests = (props) => {
	const type = props.type;
	const userId = useSelector((state) => state.auth.userId);
	let allRequests = useSelector((state) => state.requestData)
	if(type =='my'){
		allRequests = allRequests.filter((request) => request.userId === userId);
	}
	return (
		<Container sx={{ my: 5 }}>
			{allRequests.map((request, index) => {
				return <MyRequestCard request={request} key={index} type={type} />
			})}
		</Container>
	);
};

export default Requests;
