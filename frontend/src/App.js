// import logo from "./logo.svg";
import React from "react";
import "./App.css";

import CreatePage from './Editor/CreatePage.js';
import Home from './Home.js';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

function App() {
	return (
		<>
		<Router>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/create">
					<CreatePage />
				</Route>
			</Switch>
		</Router>	
		</>
	);
}

export default App;
