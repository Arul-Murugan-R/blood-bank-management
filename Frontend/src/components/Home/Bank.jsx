import { styled } from "@mui/material/styles";
import classes from "./Home.module.css";
const Bank = () => {
	return (
		<div className={classes.bank}>
			<div className={classes["outer-circle"]}>
				<img
					src="c-icon.png"
					alt=""
					className={`${classes.icons}  ${classes.icon1}`}
				/>
				<img
					src="c-icon.png"
					alt=""
					className={`${classes.icons}  ${classes.icon2}`}
				/>
				<img
					src="c-icon.png"
					alt=""
					className={`${classes.icons}  ${classes.icon3}`}
				/>
				<img
					src="c-icon.png"
					alt=""
					className={`${classes.icons}  ${classes.icon4}`}
				/>
				<img
					src="c-icon.png"
					alt=""
					className={`${classes.icons}  ${classes.icon5}`}
				/>
				<img
					src="c-icon.png"
					alt=""
					className={`${classes.icons}  ${classes.icon6}`}
				/>
				<div className={classes["inner-circle"]}></div>
			</div>
		</div>
	);
};

export default Bank;
