import React, { Component } from "react";
import Sortable from 'sortablejs';

class BookComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
      index: 0,
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
        this.saveObject(this.props.data.entry[target.dataset.index])
        console.log(this.props.object);
        this.deleteElement(target);
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

  saveObject = (value) => {
    var object = this.props.object;
    object['content'] = value;
    this.props.saveSelf(object);
  }

  render() {
    return(
      <>
        <ul className="image-container" id={"book-" + this.props.id}>
        {this.props.object.content ? (
          <li>{this.props.object.content.title}</li>
        ) : (
          <></>
        )}
        </ul>
        <div><span>Title</span><input type="checkbox" /></div>
        <div><span>Author</span><input type="checkbox" /></div>
        <div><span>Date</span><input type="checkbox" /></div>
      </>
    );
  }
}

export default BookComponent;

