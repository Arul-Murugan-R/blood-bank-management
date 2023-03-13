import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authActions } from "../../store/AuthStore";
import { useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { RequestDataActions } from "../../store/RequestStore";
import { DonorDataActions } from "../../store/DonorData";
import { SnackActions } from "../../store/SnackStore";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutUser = () => {
		dispatch(authActions.logoutHandler());
		dispatch(DonorDataActions.clearDonorData());
		dispatch(
			SnackActions.setSnack({
				message: "Logged out successfully!",
				severity: "success",
			})
		);
		return <Navigate to="/" replace />;
	};

	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const userRole = useSelector((state) => state.auth.role);

	const pages = [
		{
			name: "Search",
			onClick: () => navigate("/search"),
		},
		{
			name: "About",
			onClick: () => navigate("/about"),
		},
	];
	const settings = [
		{
			name: "Profile",
			onClick: () => {
				navigate("/");
			},
		},
		{
			name: "Account",
			onClick: () => {
				navigate("/account");
			},
		},
		{
			name: "Dashboard",
			onClick: () => {
				navigate("/dashboard");
			},
		},
		{
			name: "Logout",
			onClick: logoutUser,
		},
	];

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static" sx={{ background: "transparent" }}>
			<Container maxWidth="xl" sx={{ px: 0 }}>
				<Toolbar disableGutters>
					<AdbIcon
						sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
					/>
					{/* <svg fill="red" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" stroke="red"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M270.889,7.072c-7.683-9.435-22.104-9.425-29.778,0C188.88,71.214,66.464,237.176,66.464,322.464 C66.464,426.974,151.49,512,256,512s189.537-85.026,189.537-189.537C445.537,237.147,322.549,70.511,270.889,7.072z M146.169,341.651c-10.6-0.008-19.187-8.589-19.187-19.187c0-6.528,1.773-21.674,13.646-49.772 c4.127-9.768,15.391-14.34,25.159-10.213c9.768,4.128,14.34,15.391,10.213,25.159c-10.483,24.81-10.618,34.728-10.618,34.825 c-0.014,10.595-8.607,19.187-19.2,19.187C146.176,341.651,146.172,341.651,146.169,341.651z M256,451.483 c-41.992,0-81.504-20.595-105.694-55.092c-6.088-8.682-3.986-20.657,4.696-26.745s20.656-3.985,26.743,4.696 c17.01,24.258,44.768,38.74,74.254,38.74c10.604,0,19.2,8.597,19.2,19.2C275.2,442.886,266.604,451.483,256,451.483z"></path> </g> </g> </g></svg> */}
					<Typography
						variant="h6"
						noWrap
						component="a"
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						BB
					</Typography>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "flex", md: "none" },
							}}
						>
							{pages.map((page) => (
								<Button
									key={page.name}
									onClick={page.onClick}
									sx={{
										color: "black",
										display: "block",
									}}
								>
									{page.name}
								</Button>
							))}
							{isLoggedIn && (
								<Button
									key="Request Blood"
									onClick={() => navigate("/request-blood")}
									sx={{
										my: 2,
										color: "black",
										display: "block",
									}}
								>
									Request Blood
								</Button>
							)}
							{isLoggedIn && (
								<Button
									key="My Requests"
									onClick={() => navigate("/my-requests")}
									sx={{
										my: 2,
										color: "black",
										display: "block",
									}}
								>
									My Requests
								</Button>
							)}
						</Menu>
					</Box>
					<AdbIcon
						sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
					/>
					<Typography
						variant="h5"
						noWrap
						component="a"
						onClick={() => navigate("/")}
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						BB
					</Typography>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
						}}
					>
						{pages.map((page) => (
							<Button
								key={page.name}
								onClick={page.onClick}
								sx={{ my: 2, color: "white", display: "block" }}
							>
								{page.name}
							</Button>
						))}
						{isLoggedIn && (
							<Button
								key="Request Blood"
								onClick={() => navigate("/request-blood")}
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								Request Blood
							</Button>
						)}
						{isLoggedIn && (
							<Button
								key="My Requests"
								onClick={() => navigate("/my-requests")}
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								My Requests
							</Button>
						)}
					</Box>

					{!isLoggedIn && (
						<Box>
							<Button>
								<Link to="/login" className={classes.authLinks}>
									Login
								</Link>
							</Button>
							<Button>
								<Link
									to="/register"
									className={classes.authLinks}
								>
									Sign Up
								</Link>
							</Button>
						</Box>
					)}
					{isLoggedIn && (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar alt="Remy Sharp" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting, i) => (
									<MenuItem key={i} onClick={setting.onClick}>
										<Typography
											textAlign="center"
											component="span"
										>
											{setting.name}
										</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default Navbar;
