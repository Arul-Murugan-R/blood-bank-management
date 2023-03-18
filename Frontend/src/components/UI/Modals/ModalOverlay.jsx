import classes from "./Modal.module.css";
import { Box, IconButton, Typography, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Map, { Marker, NavigationControl, ScaleControl } from "react-map-gl";
import Pin from "../../Donors/Map/Pin";
const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
import { useRef, useState } from "react";
import { Container } from "@mui/system";
import DonorsCards from "../../Donors/Map/DonorsCards";

const ModalOverlay = (props) => {
	const mapRef = useRef(null);
	const [popupInfo, setPopupInfo] = useState(null);
	const { req, title, type, units, hospital, location, hosAddr, date } =
		props.data;
	/* 
	{
    "req": "AB-",
    "title": "Required AB-ve",
    "type": "request",
    "units": 1,
    "hospital": "Chettinad Hospital and Research Institute",
    "location": {
        "latitude": 12.7882957,
        "longitude": 80.2252485,
        "_id": "6409e0f11ce8306d7cf7cb9f"
    },
    "hosAddr": "Rajiv Gandhi Salai, Kelambakkam, Chennai - 603103",
    "date": "2023-03-13T00:00:00.000Z"
}
	*/
	const pins = (
		<Marker
			key={`marker-${location._id}`}
			longitude={location.longitude}
			latitude={location.latitude}
			anchor="center"
			onClick={(e) => {
				e.originalEvent.stopPropagation();
				setPopupInfo(location);
				mapRef.current.flyTo({
					center: [location.longitude, location.latitude],
				});
			}}
		>
			<Pin />
		</Marker>
	);

	return (
		<div className={classes.modalOverlay}>
			<IconButton className={classes.closeBtn} onClick={props.closeModal}>
				<CloseIcon />
			</IconButton>
			<div className={classes.modalContent}>
				{!props.data ? (
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Minus ipsa quidem vitae fuga voluptatibus unde id
						soluta. Doloremque dolorum optio at! Quas eaque
						molestias dignissimos voluptatem minus perferendis
						voluptate nam.
					</p>
				) : (
					<div className={classes.modalDescription}>
						<div>
							<h3 style={{ textAlign: "center" }}>
								A Request For Blood Group {req}ve
							</h3>
							<br />
							<p>{title}</p>
							<List>
								<li>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										<b>Hospital:</b> {hospital}
									</Typography>
								</li>
								<li>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										<b>Address:</b> {hosAddr}
									</Typography>
								</li>
								<li>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										<b>Deadline:</b> {date}
									</Typography>
								</li>
								<li>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										<b>Units:</b> {units}
									</Typography>
								</li>
							</List>
						</div>
						<Container sx={{ height: "300px" }}>
							<Map
								initialViewState={{
									latitude: location.latitude,
									longitude: location.longitude,
									zoom: 4,
									bearing: 0,
									pitch: 0,
								}}
								mapStyle="mapbox://styles/mapbox/dark-v9"
								mapboxAccessToken={TOKEN}
								renderWorldCopies={false}
								ref={mapRef}
								className={classes.modalMap}
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
					</div>
				)}
			</div>
		</div>
	);
};

export default ModalOverlay;
