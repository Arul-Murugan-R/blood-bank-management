import { useState, useRef } from "react";
import Map, {
	Marker,
	NavigationControl,
	Popup,
	ScaleControl,
} from "react-map-gl";
import Pin from "./Pin";
import classes from "./Map.module.css";
import DonorsCards from "./DonorsCards";
import { Container } from "@mui/system";
import donors from "./JunkDonorInfo";
import ManIcon from "@mui/icons-material/Man";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import NearDonorTable from "./NearDonorTable";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

function sortByDistance(dataArray, location) {
	// calculate the distance between two sets of coordinates using the Haversine formula
	function distance(lat1, lon1, lat2, lon2) {
		var radlat1 = (Math.PI * lat1) / 180;
		var radlat2 = (Math.PI * lat2) / 180;
		var theta = lon1 - lon2;
		var radtheta = (Math.PI * theta) / 180;
		var dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		return dist;
	}

	// sort the data array based on the distance from the location
	dataArray.sort((a, b) => {
		const distA = distance(
			a.location.latitude,
			a.location.longitude,
			location.latitude,
			location.longitude
		);
		const distB = distance(
			b.location.latitude,
			b.location.longitude,
			location.latitude,
			location.longitude
		);
		return distA - distB;
	});

	return dataArray;
}

const sortedList = sortByDistance(donors, {
	latitude: 13.03701126158853,
	longitude: 80.13573450000001,
});

const DonorsMap = (props) => {
	const [popupInfo, setPopupInfo] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const request = useSelector((state) =>
		state.requestData.find((data) => data._id === props.reqId)
	);
	const mapRef = useRef(null);
	let TableData = sortedList.filter((data) => data.bloodGroup === request.bloodGroup);
	
	const pins = sortedList.map((data, index) => {
		if (data.bloodGroup === request.bloodGroup)
		{
		return (
				<Marker
					key={`marker-${index}`}
					longitude={data.location.longitude}
					latitude={data.location.latitude}
					anchor="center"
					onClick={(e) => {
						e.originalEvent.stopPropagation();
						setPopupInfo(data);
						mapRef.current.flyTo({
							center: [
								data.location.longitude,
								data.location.latitude,
							],
						});
					}}
				>
					<Pin />
				</Marker>
			);}
	});

	return (
		<Container sx={{ height: "600px" }}>
			<NearDonorTable data={TableData}/>
			<Map
				initialViewState={{
					latitude: 13.03701126158853,
					longitude: 80.13573450000001,
					zoom: 9,
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
				<Marker
					latitude={13.03701126158853}
					longitude={80.13573450000001}
					anchor="center"
					onClick={(e) => {
						e.originalEvent.stopPropagation();
						setCurrentUser("You are here");
						mapRef.current.flyTo({
							center: [80.13573450000001, 13.03701126158853],
						});
					}}
				>
					<ManIcon
						sx={{
							cursor: "pointer",
							color: "blue",
						}}
					/>
				</Marker>

				{currentUser && (
					<Popup
						focusAfterOpen={false}
						anchor="bottom"
						latitude={13.03701126158853}
						longitude={80.13573450000001}
						onClose={() => setCurrentUser(null)}
					>
						<Box>
							<Typography variant="body1" fontWeight={"bold"}>
								{currentUser}
							</Typography>
						</Box>
					</Popup>
				)}

				{popupInfo && (
					<DonorsCards
						popupInfo={popupInfo}
						setPopupInfo={setPopupInfo}
						reqId={props.reqId}
					/>
				)}
			</Map>
		</Container>
	);
};

export default DonorsMap;
