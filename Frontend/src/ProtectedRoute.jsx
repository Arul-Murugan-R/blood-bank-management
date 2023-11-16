import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SnackActions } from "./store/SnackStore";

const ProtectedRoute = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!props.condition) {
			if (props.redirect === "/login")
				dispatch(
					SnackActions.setSnack({
						message: "Login to view Request",
						severity: "error",
					})
				);
			return navigate(props.redirect);
		}
	}, []);
	return props.children;
};

export default ProtectedRoute;
