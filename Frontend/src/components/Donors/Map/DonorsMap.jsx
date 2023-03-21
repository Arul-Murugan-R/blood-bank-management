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
import { Box, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import NearDonorTable from "./NearDonorTable";
import { Card, CardContent } from "@mui/material";
import moment from "moment";

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
	const ViewContent = (
		<Card
			style={{
				position: "relative",
				background: "#2a3338",
				color: "#ccc",
				marginBottom: "20px",
			}}
		>
			<CardContent>
				<Typography variant="h5" component="div">
					My Request ({request.numberOfUnits} units of{" "}
					{request.bloodGroup})
				</Typography>
				<Typography variant="body2">
					From {request.hospitalName}
				</Typography>
				<Typography variant="body2">
					{request.hospitalAddress}
				</Typography>
				<Typography variant="body2">
					Located Latitude : {request.location.latitude} &nbsp;
					Longitude :{request.location.longitude}
				</Typography>
				<Typography variant="body2">
					{moment(request.requestDeadline).format("DD MMMM YYYY")}
				</Typography>
				<Button variant="outlined" color="info" href="#donorMap">
					Map
				</Button>
				<Button variant="outlined" color="info" href="#table">
					Table View
				</Button>
			</CardContent>
		</Card>
	);
	const mapRef = useRef(null);
	let TableData = sortedList.filter(
		(data) => data.bloodGroup === request.bloodGroup
	);
	var short = 0;
	const pins = sortedList.map((data, index) => {
		if (data.bloodGroup === request.bloodGroup) {
			short++;
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
					{short==1 ? (<ManIcon style={{ color:data.name=='Arul'||data.name=='bala'?'green':'yellow' }} />):
					data.name=='Arul'||data.name=='bala'?<ManIcon style={{ color:'green' }} />:<Pin/> }
				</Marker>
			);
		}
	});

	return (
		<>
			{ViewContent}
			<NearDonorTable data={TableData} modal={setPopupInfo} reqId={props.reqId}/>
			<Container sx={{ p: 2, height: "600px" }}>
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
		</>
	);
};

export default DonorsMap;
