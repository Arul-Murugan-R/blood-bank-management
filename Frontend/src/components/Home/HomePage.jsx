import Navbar from "../Navbar/Navbar";
import Bank from "./Bank";
import HomeTable from "../Table/HomeTable";
import DonorsMap from "../Map/DonorsMap";
import CircularCarousel from "./CircularCarousel";
import Cards from "../Cards/Cards";

const HomePage = () => {
	return (
		<>
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
			<Cards dir="reverse"/>
			<Cards />
		</>
	);
};

export default HomePage;
