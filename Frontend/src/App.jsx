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
import { Provider } from "react-redux";
import store from "./store/redux";

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
			<Route path="/" element={<HomePage />} />
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
		</Routes>
	);
}

export default App;
