import React, { Component } from "react";
import Sortable from 'sortablejs';

import { Formik, Field, Form } from 'formik';

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

  editObject = (key, value) => {
    var object = this.props.object;
    object[key] = value;
    this.props.saveSelf(object);
  }

  handleChange = (evt) => {
    var target = evt.target;
    var details = this.props.object.details || {}
    details[target.name] = target.checked;
    this.editObject('details', details);
    console.log(this.props.object);
  }

  render() {
    const book = this.props.object.content;
    const details = this.props.object.details;
    return(
      <>
        <ul className="image-container" id={"book-" + this.props.id}>
        {book ? (
          <li>{book.title}</li>
        ) : (
          <></>
        )}
        </ul>
        {book ? (
        <form>
            {Object.keys(book).map((key) =>
              <div>
              <label>{key}</label>
              <input type="checkbox" name={key} onChange={(evt) => this.handleChange(evt)} defaultChecked={details && details[key]} />
              </div>
            )}
        </form>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default BookComponent;

