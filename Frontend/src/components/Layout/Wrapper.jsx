import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Wrapper = (props) => {
	return (
		<>
			<Navbar />
			{props.children}
			<Footer />
		</>
	);
};

export default Wrapper;
