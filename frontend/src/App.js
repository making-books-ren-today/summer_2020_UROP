// import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";

import DebugPage from './DebugPage.js';
import CreatePage from './Editor/CreatePage.js';
import Registration from './Registration.js';
import Home from './Home.js';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  user: null
		};
	  }
	render() {
		return (
			<>
			<Router>
				<Switch>
					<Home 
						exact path="/"
					/>
					
					<CreatePage 
						path="/create"
					/>
					
					<DebugPage 
						path="/debug"
					/>
					
					<Registration 
						path="/register"
					/>
				</Switch>
			</Router>	
			</>
		);
	}
}

export default App;
