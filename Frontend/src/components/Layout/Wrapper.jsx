import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import CustomSnackbar from "../UI/CustomSnackbar";

const Wrapper = (props) => {
	const snackOpen = useSelector((state) => state.snack.open);
	console.log(props);
	return (
		<>
			<Navbar />
			{props.children}
			<Footer />
			{snackOpen && <CustomSnackbar />}
		</>
	);
};

export default Wrapper;
