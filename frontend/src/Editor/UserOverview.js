import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { get, post } from '../utilities.js';

class UserOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: []
    };
  }

  componentDidMount() {
    const userId = this.props.userId;

    get(`/api/get-sites/${userId}`).then((res) => {
      console.log(res);
      this.setState({ sites: res.sites });
    });
  }

  render() {
    const userId = this.props.userId;
    if (userId == undefined) { return(<div>Loading</div>); }
    if (userId != this.props.computedMatch.params.userId) { return(<Redirect to="/" />); }

    return(
      <>
        <h1>User Id: {userId}</h1>
        {this.state.sites.map((site, index) =>
          <div>{site.Title} <Link to={`${site.ID}`}><button>Edit</button></Link></div>
        )}
      </>
    );
  }
}

export default UserOverview;

