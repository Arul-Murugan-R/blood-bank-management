import Navbar from "../Navbar/Navbar";

const Wrapper = (props) => {
	return (
		<>
			<Navbar />
			{props.children}
		</>
	);
};

export default Wrapper;
