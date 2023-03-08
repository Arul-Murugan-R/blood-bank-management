import Navbar from "../Navbar/Navbar";
import Bank from "./Bank";
import HomeTable from "../Table/HomeTable";
import DonorsMap from "../Map/DonorsMap";
import CircularCarousel from "./CircularCarousel";
import Cards from "../Cards/Cards";
import CircularDesc from "../CircularDesc/CircularDesc";

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
					<label className="quote">Donating blood is like giving a part of yourself to save someone else's life. Be a hero, donate blood!</label>
				</div>
			</div>
			<Cards avail="1"/>
			<CircularDesc/>
			<Cards rev="1"/>
			<Cards />
		</>
	);
};

export default HomePage;
