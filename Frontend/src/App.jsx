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
import DonorDetailsForm from "./components/Profile/DonorDetailsForm";
import Wrapper from "./components/Layout/Wrapper";
import HomeTable from "./components/Table/HomeTable";
import Cards from "./components/Cards/Cards";
import Bank from "./components/Home/Bank";
import DonorsMap from "./components/Map/DonorsMap";
import CircularCarousel from "./components/Home/CircularCarousel";
import RequestBloodForm from "./components/Profile/RequestBloodForm";
import CircularDesc from "./components/CircularDesc/CircularDesc";

let initial = true;

//TODO redirect to prev url in case of switch b/w signup and login

function App() {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

	useEffect(() => {
		if (initial) {
			dispatch(verifyToken());
			initial = false;
		}
	}, [dispatch, isLoggedIn]);

	return (
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
			<Route path="/donor-info" element={<DonorDetailsForm />} />
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
						<SignUpForm />
					</ProtectedRoute>
				}
			/>
			<Route
				path="/login"
				element={
					<ProtectedRoute condition={!isLoggedIn} redirect="/">
						<LoginForm />
					</ProtectedRoute>
				}
			/>
			<Route path="/request-blood" element={<RequestBloodForm />} />
		</Routes>
	);
}

export default App;
