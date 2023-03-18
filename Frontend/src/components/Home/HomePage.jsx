import Navbar from "../Navbar/Navbar";
import Bank from "./Bank";
import HomeTable from "../Table/HomeTable";
import DonorsMap from "../Donors/Map/DonorsMap";
import CircularCarousel from "./CircularCarousel";
import Cards from "../Cards/Cards";
import CircularDesc from "../CircularDesc/CircularDesc";
import DonationInfo from "./DonationInfo";

const HomePage = () => {
	return (
		<>
			<div className="intro">
				<img
					src="/assets/dweet.gif"
					autoPlay
					loop
					muted
					style={{
						objectFit: "cover",
						width: "100%",
						zIndex: "-10",
						position: "absolute",
						top: "0",
						height: "100vh",
					}}
				/>
				<div className="intro-text">
					<h1>
						<br /> Donate Blood<br></br>
					</h1>
					<label className="quote">
						Donating blood is like giving a part of yourself to save
						someone else's life. Be a hero, donate blood!
					</label>
				</div>
			</div>
			<br />
			<DonationInfo />
			<Cards avail="1" />
			<CircularDesc />
			<Cards rev="1" />
			<Cards />
		</>
	);
};

export default HomePage;
