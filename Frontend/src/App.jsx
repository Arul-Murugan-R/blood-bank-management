// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import "./App.css";
// import Navbar from "./components/Navbar/Navbar";
// import Bank from "./components/Home/Bank";
// import Table from "./components/Table/Table";
// //#d70035
// function App() {
// 	const [page, setPage] = useState(0);

// 	console.log(Table);

// 	return (
// 		<div className="App">
// 				<>
// 					<Navbar />
// 					<div className="intro">
// 						<video
// 							src="homepagegif.mp4"
// 							autoPlay
// 							loop
// 							muted
// 							style={{
// 								position: "absolute",
// 								bottom: "0",
// 								right: "0",
// 							}}
// 						/>
// 						<div className="intro-text">
// 							<h1>
// 								<br />
// 								Donate Blood<br></br>
// 							</h1>
// 						</div>
// 					</div>
// 					<Bank />
// 					<Table />
// 				</>
// 		</div>
// 	);
// }

// export default App;

import "./App.css";
import HomePage from "./components/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import SignUpForm from "./components/Authentication/SignUpForm";
import LoginForm from "./components/Authentication/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyToken } from "./store/AuthStore";
import ProtectedRoute from "./ProtectedRoute";
import DonorDetailsForm from "./components/Donors/DonorDetailsForm";
import Wrapper from "./components/Layout/Wrapper";
import HomeTable from "./components/Table/HomeTable";
import Cards from "./components/Cards/Cards";
import Bank from "./components/Home/Bank";
import DonorsMap from "./components/Donors/Map/DonorsMap";
import CircularCarousel from "./components/Home/CircularCarousel";
import RequestBloodForm from "./components/Requests/RequestBloodForm";
import CircularDesc from "./components/CircularDesc/CircularDesc";
import Requests from "./components/Requests/Requests";
import ViewRequest from "./components/Requests/ViewRequest";
import EmailVerification from "./components/Authentication/EmailVerification";
import ViewDonors from "./components/Donors/ViewDonors";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

let initial = true;

//TODO redirect to prev url in case of switch b/w signup and login

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const role = useSelector((state) => state.auth.role);

	useEffect(() => {
		if (initial) {
			dispatch(verifyToken());
			initial = false;
		}
	}, []);

	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Wrapper>
							<HomePage />
						</Wrapper>
					}
				/>
				<Route
					path="/search"
					element={
						<Wrapper>
							<HomeTable />
						</Wrapper>
					}
				/>
				<Route
					path="/donor-info"
					element={
						<Wrapper>
							<DonorDetailsForm />
						</Wrapper>
					}
				/>
				<Route path="/about" element={<Wrapper></Wrapper>} />
				<Route
					path="/rest"
					element={
						<Wrapper>
							<CircularDesc />
							<DonorsMap />
						</Wrapper>
					}
				/>
				<Route
					path="/register"
					element={
						<ProtectedRoute condition={!isLoggedIn} redirect="/">
							<Wrapper>
								<SignUpForm />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<ProtectedRoute condition={!isLoggedIn} redirect="/">
							<Wrapper>
								<LoginForm />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/request-blood"
					element={
						<ProtectedRoute condition={isLoggedIn} redirect="/">
							<Wrapper>
								<RequestBloodForm />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/requests"
					element={
						<ProtectedRoute condition={isLoggedIn} redirect="/">
							<Wrapper>
								<Requests type="others" />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/donors/:reqId"
					element={
						<ProtectedRoute condition={isLoggedIn} redirect="/">
							<Wrapper>
								<ViewDonors />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/my-requests"
					element={
						<ProtectedRoute condition={isLoggedIn} redirect="/">
							<Wrapper>
								<Requests type="my" />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/view-request/:id"
					element={
						<ProtectedRoute
							condition={isLoggedIn}
							redirect="/login"
						>
							<Wrapper>
								<ViewRequest />
							</Wrapper>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/email-login/:reqId/:token/:expiresAt/:userId"
					element={<EmailVerification />}
				/>
			</Routes>
		</>
	);
}

export default App;
