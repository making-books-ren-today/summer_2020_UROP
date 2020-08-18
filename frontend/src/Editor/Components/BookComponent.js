import React, { Component } from "react";
import Sortable from 'sortablejs';

class BookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
    };
  }

  componentDidMount() {
    var el = null
    el = document.getElementById("book-" + this.props.id);
    Sortable.create(el, {
      group: {
        name: "book",
        /* put: function(to, from) {
          return from.options.group.name == 'image' && to.el.children.length < 1;
        } */
      },

      onAdd: ((evt) => {
        var target = evt.item;
        console.log(evt.to.children);
        Array.from(evt.to.children).forEach((el) => {
          if (el !== target) {
            this.deleteElement(el);
          }
        })
      }),
    });
  }

  deleteElement = (el) => {
    console.log(el);
    el.parentNode.removeChild(el);
  }

  enabled = () => {
    this.setState({editable: true})
  };

  disabled = () => {
    this.setState({editable: false})
  }

  render() {
    return(
      <>
        <ul className="image-container" id={"book-" + this.props.id}>
        </ul>
      </>
    );
  }
}

export default BookComponent;

