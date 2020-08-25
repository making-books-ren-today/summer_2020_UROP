import React, { Component } from "react";

class BookRender extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <>
        {this.props.object.content && this.props.object.content.title ? (
        <div>{this.props.object.content.title}</div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default BookRender;

