import React, { Component } from "react";

class NumberRender extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <>
        <div>{this.props.object.content}</div>
      </>
    );
  }
}

export default NumberRender;

