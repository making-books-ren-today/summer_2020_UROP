// import logo from "./logo.svg";
import React, { Component } from "react";
import "./App.css";

import DebugPage from './DebugPage.js';
import DebugPage2 from './DebugPage2.js';
import CreatePage from './Editor/CreatePage.js';
import SiteOverview from './Editor/SiteOverview.js';
import UserOverview from './Editor/UserOverview.js';
import Registration from './Registration.js';
import Home from './Home.js';
import {BrowserRouter as Router, Switch, Route, Link, useParams} from "react-router-dom";

import { post, get } from "./utilities.js"

class App extends Component {
	constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
	}

	componentDidMount = () => {
		const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      this.handleLogin(loggedInUser);
    } else {
			this.setState({userId: -1});
		}
	}

	handleLogin = (user) => {
		this.setState({ userId: user }, () => {
			console.log("Currently logged in as " + this.state.userId);
		});
		localStorage.setItem('user', user);
	}

	handleLogout = () => {
		this.setState({ userId: undefined }, () => {
			console.log("Logged out!");
		});
		localStorage.setItem('user', "");
	}


	render() {
		return (
			<>
			<Router>
				<Switch>
					
					<Home
						exact path="/"s
						userId = {this.state.userId}
					/>

					<UserOverview
						exact path="/create/:userId"
						userId = {this.state.userId}
					/>
					
					<SiteOverview
						exact path="/create/:userId/:siteId"
						userId = {this.state.userId}
					/>
					<CreatePage
						exact path="/create/:userId/:siteId/:pageId"
						userId = {this.state.userId}
					/>
					
					<DebugPage 
						path="/debug"
						handleLogin = {this.handleLogin}
						handleLogout = {this.handleLogout}
						userId = {this.state.userId}
					/>
					
					<DebugPage2 
						path="/debug2"
						userId = {this.state.userId}
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
