import React, { Component } from "react";

class BookRender extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    var book = this.props.object.content;
    var details = this.props.object.details;
    return(
      <>
        {book && book.title ? (
        <>
        <div>{book.title}</div>
        <div>{Object.keys(book).map((key) =>
          <>
          {details && details[key] === true ? (
          <div>{key}: {book[key]}</div>
          ) : (
            <></>
          )}
          </>
        )}</div>
        </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default BookRender;

