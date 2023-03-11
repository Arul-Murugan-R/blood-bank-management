import { Link } from "react-router-dom";
import classes from "./Footer.module.css";

const Footer = () => {
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
						<h3>Top Products</h3>
						<a href="#">Managed Website</a>
						<a href="#">Manage Reputation</a>
						<a href="#">Power Tools</a>
						<a href="#">Marketing Service</a>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Quick Links</h3>
						<a href="#">Jobs</a>
						<a href="#">Brand Assets</a>
						<a href="#">Investor Relations</a>
						<a href="#">Terms of Service</a>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Features</h3>
						<a href="#">Jobs</a>
						<a href="#">Brand Assets</a>
						<a href="#">Investor Relations</a>
						<a href="#">Terms of Service</a>
					</section>
					<section
						className={
							classes["flex-content"] +
							" " +
							classes["padding_1x"]
						}
					>
						<h3>Resources</h3>
						<a href="#">Guides</a>
						<a href="#">Research</a>
						<a href="#">Experts</a>
						<a href="#">Agencies</a>
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
