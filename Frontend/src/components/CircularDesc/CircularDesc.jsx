import "./CircularDesc.css";
import { useEffect, useState } from "react";
import descData from "./descData";
import { color } from "@mui/system";

const CircularDesc = () => {
	const [desc, setDesc] = useState({
		label: "AB+",
		count: "2500",
		color: "#00bfa5",
	});
	const counter = (minimum, maximum) => {
		for (let i = minimum; i <= maximum; i++) {
			setTimeout(() => {
				setDesc((prev) => {
					return {
						...prev,
						count: i,
					};
				});
			}, 50);
		}
	};
	const layerHandler = (e) => {
		descData.filter((item) => {
			if (item.label === e.target.innerText) {
				counter(0, item.count);
				setDesc(item);
			}
		});
	};
	var deg = 0;
	return (
		<div className="wrapper-desc">
			<div className="circ-cont">
				{descData.map((item, index) => {
					return (
						<div
							className="bloods"
							key={item.label}
							style={{
								"--angle": index * 45 + "deg",
								background: `${
									item.label == desc.label ? "black" : ""
								}`,
								border: `${
									item.label == desc.label
										? "1px solid red"
										: ""
								}`,
								color: `${
									item.label == desc.label ? "#ccc" : ""
								}`,
							}}
							onClick={layerHandler}
						>
							<label>{item.label}</label>
						</div>
					);
				})}
				<div
					className="inner-circle"
					style={{ background: "rgb(181, 30, 35)" }}
				>
					<label>
						{desc.label}ve Donor
						<br />
						<b>{desc.count}+</b>
					</label>
				</div>
			</div>
			<div className="catchy">
				<label className="heading">
					<b>B</b>eautiful
					<br />
					<b>L</b>ife
					<br />
					<b>O</b>nly
					<br />
					<b>O</b>n<br />
					<b>D</b>onating.
				</label>
			</div>
		</div>
	);
};

export default CircularDesc;
