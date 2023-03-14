import { useEffect } from "react";
import classes from "./Home.module.css";

const DonationInfo = () => {
	useEffect(() => {
		const humans_parent = document.getElementById(classes["humans"]);
		const BLOOD_TYPES = {
			"O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
			"O+": ["O+", "A+", "B+", "AB+"],
			"A-": ["A-", "A+", "AB-", "AB+"],
			"A+": ["A+", "AB+"],
			"B-": ["B-", "B+", "AB-", "AB+"],
			"B+": ["B+", "AB+"],
			"AB-": ["AB-", "AB+"],
			"AB+": ["AB+"],
		};
		const reset_button = document.getElementById(classes["reset"]);
		const selector = document.getElementById(classes["blood_selector"]);
		const blood_vias = document.querySelectorAll(
			`${classes["humans"]} ${classes.human} ${classes["blood_via"]}`
		);
		const blood_bag = document.querySelector(
			`${classes["blood_content"]} > div.${classes["main_bag"]} > div`
		);
		const center_via = document.querySelector(
			`${classes["center_via"]} > ${classes["blood_via"]}`
		);
		const blood_types = document.querySelectorAll(classes["blood_type"]);

		function callIfChildren(e) {
			if (lastCalled) change();
			if (e.target !== this) setRecipents(e);
		}

		function addListeners() {
			selector.addEventListener("click", callIfChildren);
			reset.addEventListener("click", reset);
		}

		function reset() {
			change();
			blood_bag.style.height = "100px";
			center_via.style.height = "0px";
		}

		function change() {
			lastCalled.target.classList.remove(classes.highlight);

			for (let i = 0; i < blood_vias.length; i++) {
				blood_vias[i].style.width = "0px";
				blood_types[i].classList.remove(classes.highlightText);
			}
		}

		function timeout(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}

		async function setRecipents(e) {
			e.target.classList.add(classes.highlight);
			lastCalled = e;

			const donor = e.target.innerText;
			for (let item of BLOOD_TYPES[donor]) {
				const recipent_index = Object.keys(BLOOD_TYPES).indexOf(item);
				const height = 50 + 50 * Math.floor(recipent_index / 2);
				const blood_height = 125 - 25 * Math.floor(recipent_index / 2);
				blood_bag.style.height = `${blood_height}px`;
				center_via.style.height = `${height}px`;

				await timeout(100);
				blood_vias[recipent_index].style.width = "100%";
				blood_types[recipent_index].classList.add(
					classes.highlightText
				);
			}
		}
	}, []);

	return (
		<div className={classes.donationInfo}>
			<div id={classes["content"]}>
				<h3>Select the donor blood type:</h3>
				<div id={classes["blood_selector"]}>
					<div>O-</div>
					<div>O+</div>
					<div>A-</div>
					<div>A+</div>
					<div>B-</div>
					<div>B+</div>
					<div>AB-</div>
					<div>AB+</div>
				</div>
				<div id={classes["blood_content"]}>
					<div className={classes.bar}></div>
					<div className={classes["main_bag"]}>
						<div className={classes.blood}></div>
					</div>
				</div>
				<div id={classes["center_via_c"]}>
					<div className={classes["center_via"]}>
						<div className={classes["blood_via"]}></div>
					</div>
				</div>
				<div id={classes["humans"]}>
					<div className={classes.human + " " + classes.left}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>O-</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.right}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>O+</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.left}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>A-</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.right}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>A+</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.left}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>B-</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.right}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>B+</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.left}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>AB-</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
					<div className={classes.human + " " + classes.right}>
						<div className={classes.scribble}>
							<span className={classes["blood_type"]}>AB+</span>
							<div className={classes.head}></div>
							<div className={classes.body}></div>
						</div>
						<div className={classes.via}></div>
						<div className={classes["blood_via"]}></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DonationInfo;
