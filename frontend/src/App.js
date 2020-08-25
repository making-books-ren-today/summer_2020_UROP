// import logo from "./logo.svg";
import React from "react";
import "./App.css";

import DebugPage from './DebugPage.js';
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
				<Route path="/debug">
					<DebugPage />
				</Route>
			</Switch>
		</Router>	
		</>
	);
}

export default App;
