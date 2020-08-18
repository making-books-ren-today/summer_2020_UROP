import React, { Component } from "react";

class TextRender extends Component {
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

export default TextRender;

