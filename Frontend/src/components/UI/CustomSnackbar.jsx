import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Alert } from "@mui/material";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SnackActions } from "../../store/SnackStore";

const CustomSnackbar = (props) => {
	const snackOpen = useSelector((state) => state.snack.open);
	const message = useSelector((state) => state.snack.message);
	const severity = useSelector((state) => state.snack.severity);
	const [open, setOpen] = useState(snackOpen);
	const dispatch = useDispatch();

	const handleClose = () => {
		setOpen(false);
		dispatch(SnackActions.closeSnack());
	};
	const action = (
		<IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={handleClose}
		>
			<CloseIcon fontSize="small" />
		</IconButton>
	);

	return (
		<>
			{createPortal(
				<Snackbar
					open={open}
					autoHideDuration={2000}
					onClose={handleClose}
					action={action}
				>
					<Alert
						onClose={handleClose}
						severity={severity}
						sx={{ width: "100%" }}
					>
						{message}
					</Alert>
				</Snackbar>,
				document.getElementById("root")
			)}
		</>
	);
};

export default CustomSnackbar;
