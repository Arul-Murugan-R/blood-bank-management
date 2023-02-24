import Navbar from "../Navbar/Navbar";
import Bank from "./Bank";
import HomeTable from "../Table/HomeTable";

const HomePage = () => {
	return (
		<div>
			<Navbar />
			<div className="intro">
				<video
					src="homepagegif.mp4"
					autoPlay
					loop
					muted
					style={{ position: "absolute", bottom: "0", right: "0" }}
				/>
				<div className="intro-text">
					<h1>
						<br /> Donate Blood<br></br>
					</h1>
				</div>
			</div>
			<Bank />
			<HomeTable />
		</div>
	);
};

export default HomePage;
