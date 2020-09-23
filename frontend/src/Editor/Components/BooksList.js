import React, { Component } from "react";
import Sortable from 'sortablejs'

class BooksList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    var el = document.getElementById('bookslist');
    Sortable.create(el, {
      group: {
        name: "book",
        pull: "clone",
        put: false,
      }
    });
  }

  render() {
    return(
      <>
        <ul id="bookslist" className="list-container">
          {this.props.books !== null ? (
          this.props.books.map((object, index) => {
            return(
              <li data-index={index} style={{outline: "1px solid black"}} key={index}>
                {object.title}
              </li>
            );
          })
          ) : (
            <></>
          )}
        </ul>
      </>
    );
  }
}

export default BooksList;