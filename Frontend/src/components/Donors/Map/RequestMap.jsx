import React, { useRef } from "react";
import { Map, Marker, NavigationControl, ScaleControl } from "react-map-gl";
import Pin from "./Pin";
import classes from "./Map.module.css";
import { Container } from "@mui/system";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const RequestMap = (props) => {
	const mapRef = useRef(null);

	return (
		<Container sx={{ height: "100%" }}>
			<Map
				initialViewState={{
					latitude: props.latitude,
					longitude: props.longitude,
					zoom: 12,
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
				<NavigationControl position="top-left" />
				<ScaleControl />

				<Marker
					longitude={props.longitude}
					latitude={props.latitude}
					anchor="center"
					onClick={(e) => {
						e.originalEvent.stopPropagation();
						mapRef.current.flyTo({
							center: [props.longitude, props.latitude],
						});
					}}
				>
					<Pin />
				</Marker>
			</Map>
		</Container>
	);
};

export default RequestMap;
