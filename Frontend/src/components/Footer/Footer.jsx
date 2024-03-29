import { Link, redirect } from "react-router-dom";
import classes from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SnackActions } from "../../store/SnackStore";

const Footer = () => {
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	return (
		<>
			<footer className={classes["padding_4x"]}>
				<div className={classes.flex}>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Looking For Blood</h3>
						<a href="/search">Donor Availability</a>
						<a href="#">Blood Banks</a>
						<a href="/register">Recipent Login</a>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Want to Donate</h3>
						<Link
							to={isLoggedIn && "/requests"}
							onClick={() =>
								isLoggedIn
									? navigate("/requests")
									: dispatch(
											SnackActions.setSnack({
												message:
													"Login to view requests!",
												severity: "error",
											})
									  )
							}
						>
							Requests
						</Link>
						<Link
							to={isLoggedIn && "/my-requests"}
							onClick={() =>
								isLoggedIn
									? navigate("/my-requests")
									: dispatch(
											SnackActions.setSnack({
												message:
													"Login to view requests!",
												severity: "error",
											})
									  )
							}
						>
							My Requests
						</Link>
						<Link to="/login">Donor Login</Link>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Features</h3>
						<a href="#who">Who can donate</a>
						<a href="#">Blood Stats</a>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Newsletter</h3>
						<p>You can trust us. we only send promo offers,</p>
						<br />
						<fieldset className={classes["fixed_flex"]}>
							<input
								type="email"
								name="newsletter"
								placeholder="Your Email Address"
							/>
							<button
								className={
									classes["btn"] + " " + classes["btn_2"]
								}
							>
								Subscribe
							</button>
						</fieldset>
					</section>
				</div>
				<div className={classes.flex}>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<p>Copyright ©2023 All rights reserved || Blood Bank</p>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-facebook"]
								}
							></i>
						</a>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-twitter"]
								}
							></i>
						</a>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-dribbble"]
								}
							></i>
						</a>
						<a href="#">
							<i
								className={
									classes.fa + " " + classes["fa-linkedin"]
								}
							></i>
						</a>
					</section>
				</div>
			</footer>
		</>
	);
};

export default Footer;
