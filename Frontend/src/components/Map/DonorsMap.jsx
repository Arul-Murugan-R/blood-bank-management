import { useState, useRef } from "react";
import Map, { Marker, NavigationControl, ScaleControl } from "react-map-gl";
import Pin from "./Pin";
import classes from "./Map.module.css";
import DonorsCards from "./DonorsCards";
import { Container } from "@mui/system";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const cities = [
	{
		name: "Rachitha Sharma",
		city: "Delhi",
		latitude: 28.70406,
		longitude: 77.102493,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Chipiwa Mukono",
		city: "Zimbabwe",
		latitude: -19.015438,
		longitude: 29.154858,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Sameer Somal",
		city: "New York",
		latitude: 40.712776,
		longitude: -74.005974,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "male",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Noorain Saleem",
		city: "Mumbai",
		latitude: 28.70406,
		longitude: 77.102493,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Reuelle Samaco",
		city: "Phillipines",
		latitude: 12.879721,
		longitude: 121.774017,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Anjali Sukumaran",
		city: "Chennai",
		latitude: 13.08268,
		longitude: 80.270718,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Latika Srinivasan",
		city: "Chennai",
		latitude: 13.08268,
		longitude: 80.270718,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Jobelle Ponta-oy",
		city: "Phillipines",
		latitude: 12.879721,
		longitude: 121.774017,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Anjalee Welandagama",
		city: "Colombo",
		latitude: 6.927079,
		longitude: 79.861243,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Angus Robertson",
		city: "Ottawa",
		latitude: 45.42153,
		longitude: -75.697193,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "male",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Ruth Sharon",
		city: "Kolkata",
		latitude: 22.572646,
		longitude: 88.363895,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
	{
		name: "Anindita Nandkumar",
		city: "Bengaluru",
		latitude: 12.971599,
		longitude: 77.594563,
		description:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati distinctio ex, culpa enim unde eaque.",
		role: "Assigned Role",
		img: "female",
		linkedIn: "https://www.linkedin.com/in/rachitasharma22/",
		mail: "rachita.sharma@girlpowertalk.com",
	},
];

const DonorsMap = () => {
	const [popupInfo, setPopupInfo] = useState(null);
	const mapRef = useRef(null);

	const pins = cities.map((data, index) => {
		return (
			<Marker
				key={`marker-${index}`}
				longitude={data.longitude}
				latitude={data.latitude}
				anchor="center"
				onClick={(e) => {
					e.originalEvent.stopPropagation();
					setPopupInfo(data);
					mapRef.current.flyTo({
						center: [data.longitude, data.latitude],
					});
				}}
			>
				<Pin type={data.img} />
			</Marker>
		);
	});

	return (
		<Container sx={{ height: "600px" }}>
			<Map
				initialViewState={{
					latitude: 20.593683,
					longitude: 78.962883,
					zoom: 3,
					bearing: 0,
					pitch: 0,
				}}
				id="donorMap"
				mapStyle="mapbox://styles/mapbox/dark-v9"
				mapboxAccessToken={TOKEN}
				renderWorldCopies={false}
				ref={mapRef}
				classname={classes.donorMap}
			>
				{/* <GeolocateControl position="top-left" /> */}
				{/* <FullscreenControl position="top-left" /> */}
				<NavigationControl position="top-left" />
				<ScaleControl />

				{pins}

				{popupInfo && (
					<DonorsCards
						popupInfo={popupInfo}
						setPopupInfo={setPopupInfo}
					/>
				)}
			</Map>
		</Container>
	);
};

export default DonorsMap;
