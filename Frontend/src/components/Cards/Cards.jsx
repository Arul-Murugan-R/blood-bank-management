import { useState, useRef, useEffect } from "react";
import classes from "./Cards.module.css";
import Card from "./Card";
import { useSelector } from "react-redux";
import Modal from "../UI/Modals/Modal";
import { useInView } from "react-intersection-observer";
const Cards = (props) => {
	const { ref, inView, entry } = useInView({});
	const store = useSelector((state) => state.requestData.filter((item)=>item.numberOfUnits!=0)).slice(0, 30);
	const [modalDet, setModalDet] = useState({});
	const [modal, setModal] = useState(false);
	const [count, setCount] = useState({ donor: 0, req: 0 });
	const modalHandler = (desc) => {
		setModal(true);
		if (desc) setModalDet(desc);
	};
	const closeHandler = () => {
		setModal(false);
		setModalDet({});
	};

	const counter = (minimum, maximum, set, title) => {
		for (let i = minimum; i <= maximum; i++) {
			setTimeout(() => {
				set((prev) => {
					if (title == "donor")
						return {
							...prev,
							donor: i,
						};
					else {
						return {
							...prev,
							req: i,
						};
					}
				});
			}, 1000);
		}
	};
	useEffect(() => {
		if (inView) {
			counter(0, 2000, setCount, "donor");
			counter(0, 12000, setCount, "req");
		} else {
			setCount({ donor: 0, req: 0 });
		}
	}, [inView]);
	var details = {};
	if (props.avail == "1") {
		details = {
			title: "Donors Available",
			req: null,
			type: "availability",
		};
		return (
			<center>
			<div
				className={`${classes.userList} ${classes.noAnimation}`}
				ref={ref}
			>
				<Card details={details} pur="Recipients">{count.req}+</Card>
				<Card details={details} pur="Donors">{count.donor}+</Card>
			</div></center>
		);
	}
	var calWid = store.length * 22 + "vw";
	var trans = store.length * 22 - 100 + "vw";
	console.log(store)

	return (
		<>
			<div className={classes.container}>
				<div
					className={`${classes.userList} ${
						props.rev ? classes.reverse : ""
					} ${store.length < 5 ? classes.lessReq : ""}`}
					width={calWid}
					style={{
						"--transWid": trans,
						"--transDur": store.length * 4 + "s",
						animationPlayState: modal ? "paused" : "",
					}}
				>
					{store.map((item) => {
						//const { title, user, req , img , type } = props.details
						details = {
							req: item.bloodGroup,
							title: `Required ${item.bloodGroup}ve`,
							type: "request",
							units: item.numberOfUnits,
							hospital: item.hospitalName,
							location: item.location,
							hosAddr: item.hospitalAddress,
							date: item.requestDeadline,
							id: item._id,
						};
						return (
							<Card
								details={details}
								key={item._id}
								openHandler={modalHandler}
							></Card>
						);
					})}
					{modal && (
						<Modal closeModal={closeHandler} data={modalDet} />
					)}
				</div>
			</div>
		</>
	);
};

export default Cards;
