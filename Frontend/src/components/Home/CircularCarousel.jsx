import classes from "./Home.module.css";

const CircularCarousel = () => {
	return (
		<section class={classes.container}>
			<div class={classes["large-circle"]}>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle1"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle2"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle3"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle4"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle5"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle6"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle7"]
					}
				></div>
				<div
					class={
						classes["small-circle"] + " " + classes["small-circle8"]
					}
				></div>
			</div>
		</section>
	);
};

export default CircularCarousel;
