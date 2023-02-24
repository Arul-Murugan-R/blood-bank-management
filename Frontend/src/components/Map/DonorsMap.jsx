import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useRef, useState, useEffect } from "react";
import classes from "./Map.module.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const DonorsMap = (props) => {
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return; // initialize map only once
		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: "mapbox://styles/mapbox/streets-v12",
			center: [lng, lat],
			zoom: zoom,
		});
	});
	return (
		<div>
			DonorsMap
			<div ref={mapContainer} className={classes["map-container"]} />
		</div>
	);
};

export default DonorsMap;
