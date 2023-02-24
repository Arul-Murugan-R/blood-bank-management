import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (!props.condition) {
			return navigate(props.redirect);
		}
	}, [props.condition, navigate, props.redirect]);
	return props.children;
};

export default ProtectedRoute;
