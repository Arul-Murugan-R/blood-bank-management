import * as React from "react";
import ManIcon from "@mui/icons-material/Man";

function Pin() {
	return (
		<ManIcon
			sx={{
				cursor: "pointer",
				color: "red",
			}}
		/>
	);
}

export default React.memo(Pin);
