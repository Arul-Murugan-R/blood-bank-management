import { Typography } from "@mui/material";
import React from "react";

const Error = (props) => {
	return (
		<Typography
			variant="body2"
			color="error"
			textAlign="center"
			sx={{ mb: 1 }}
		>
			{props.message}
		</Typography>
	);
};

export default Error;
