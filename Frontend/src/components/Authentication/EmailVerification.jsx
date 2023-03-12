import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authActions, verifyToken } from "../../store/AuthStore";

const EmailVerification = () => {
	const { token, expiresAt, userId, reqId } = useParams();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			authActions.loginHandler({ user: { token, expiresAt, userId } })
		);
		dispatch(verifyToken());
		setTimeout(() => {
			navigate("/view-request/" + reqId);
		}, 1000);
	}, [token, expiresAt, userId]);

	return (
		<Box>
			<Typography color={"white"}>Loading...</Typography>
		</Box>
	);
};

export default EmailVerification;
