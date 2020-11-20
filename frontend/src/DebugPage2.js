import React, { Component } from "react";

import { get, post } from "./utilities.js";

import { Formik, Field, Form } from 'formik';

class DebugPage2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      dataLoaded: false,
      htmlData: ""
    };
  }

  componentDidMount = () => {
    this.setState({dataLoaded: false})
    get("/api/login").then((res) => {
      this.setState({htmlData: res, dataLoaded: true});
      console.log(this.state.htmlData);
    });
  }



  render() {
    return(
      <>
        {this.state.dataLoaded ? (
          <div dangerouslySetInnerHTML={this.state.htmlData} />
        ) : (
          <div>Loading</div>
        )}
      </>
    );
  }
}

export default DebugPage2;

