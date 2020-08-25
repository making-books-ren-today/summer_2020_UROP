import React, { Component } from "react";

import { get, post } from "./utilities.js";

class DebugPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  insertPost = () => {
    post("/api/insert-post/", this.state.form).then((res) => {
      console.log(res);
      this.setState({ data: res });
    });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    var form = this.state.form;
    form[name] = value;
    this.setState({
      form: form
    })
    console.log(this.state.form);
  }

  render() {
    return(
      <>
        <form>
          <div><label>ID<input name="ID" onChange={this.handleInputChange} type="number" /></label></div>
          <div><label>User<input name="User" onChange={this.handleInputChange} type="text" /></label></div>
          <div><label>Content<input name="Content" onChange={this.handleInputChange} type="text" /></label></div>
          <div><label>Date/Time<input name="Date" onChange={this.handleInputChange} type="date" /></label></div>
        </form>
        <button onClick={this.insertPost}>Submit Post</button>
      </>
    );
  }
}

export default DebugPage;

