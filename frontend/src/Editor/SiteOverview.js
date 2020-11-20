import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { get, post } from '../utilities.js';

class SiteOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }

  componentDidMount() {
    const siteId = this.props.computedMatch.params.siteId;
    this.setState({ siteId: siteId });

    get(`/api/get-pages/${siteId}`).then((res) => {
      console.log(res);
      this.setState({ pages: res.pages });
    });
  }

  render() {
    const siteId = this.state.siteId;
    const userId = this.props.userId;
    if (userId == undefined) { return(<div>Loading</div>); }
    if (userId != this.props.computedMatch.params.userId) { return(<Redirect to="/" />); }

    return(
      <>
        <h1>Site Id: {siteId}</h1>
        {this.state.pages.map((page, index) =>
          <div>{page.Title} <Link to={`${siteId}/${page.ID}`}><button>Edit</button></Link></div>
        )}
      </>
    );
  }
}

export default SiteOverview;

