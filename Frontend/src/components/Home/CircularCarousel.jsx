import classes from "./Home.module.css";

const CircularCarousel = () => {
	return (
		<section className={classes.container}>
			<div className={classes["large-circle"]}>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle1"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle2"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle3"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle4"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle5"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle6"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle7"]
					}
				></div>
				<div
					className={
						classes["small-circle"] + " " + classes["small-circle8"]
					}
				></div>
			</div>
		</section>
	);
};

export default CircularCarousel;
