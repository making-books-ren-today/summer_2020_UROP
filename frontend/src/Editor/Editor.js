import React, { Component } from "react";

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import ComponentContainer from './ComponentContainer.js'

import "./Editor.css";

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [],
      editable: true,
      view: "edit",
    };

  }

  printlist1 = () => {
    console.log(this.state.list1);
  }

  createSortables = () => {
    var el = null
    el = document.getElementById('optionslist');
    Sortable.create(el, {
      group: {
        name: "components",
        pull: "clone",
        put: false
      },
      sort: false,
    });

    el = document.getElementById('sortablelist');
    Sortable.create(el, {
      group: "components",
      animation: 0,
      filter: '.filtered',
      handle: '.container-label',
      sort: ((evt) => {
        return true;
      }),

      onAdd: ((evt) => {
        var el = evt.item;
        var index = evt.newIndex;
        var objects = this.props.list1;
        var dataLabel = el.dataset.label;
        var object = {'type': dataLabel, 'text': '', 'key': this.props.keyCounter};
        this.props.updateKeyCounter(this.props.keyCounter+1);
        objects.splice(index, 0, object);
        this.deleteElement(el);
        this.props.saveObjects(objects);
      }),

      onUpdate: ((evt) => {
        var objects = this.props.list1;
        var newObjects = arrayMove(objects, evt.oldIndex, evt.newIndex);
        this.props.saveObjects(newObjects);
      }),
    });

    el = document.getElementById('imagelist');
    Sortable.create(el, {
      group: {
        name: "image",
        pull: "clone",
        put: false,
      }
    });
  }

  componentDidMount() {
    this.createSortables();
  }

  deleteObject = (index) => {this.props.deleteObject(index)};
  saveObject = (index, object) => {this.props.saveObject(index, object)};

  deleteElement = (el) => {
    console.log(el);
    el.parentNode.removeChild(el);
  }

  render() {
    return (
      <>
      <h1>Edit</h1>
      <div style={{padding: "5px"}}>
        <div style={{display: "inline-block", verticalAlign: "top", width: "250px", padding: "5px"}}>
        <div className="component-container">LIST</div>
        <ul id="sortablelist" className="list-container">
          {this.props.list1.map((object, index) => {
            return(
              <li key={object.key}>
                <ComponentContainer 
                  index={index} 
                  deleteObject={this.props.deleteObject}
                  saveObject={this.props.saveObject} 
                  object={object} 
                />
              </li>
            );
          })}
        </ul>
        </div>
        <div style={{display: "inline-block", verticalAlign: "top", width: "250px", padding: "5px"}}>
        <div className="component-container">COMPONENTS</div>
        <ul id="optionslist" className="list-container">
          <li data-label="text">Text</li>
          <li data-label="number">Number</li>
          <li data-label="block">Block</li>
          <li data-label="image">Image</li>
        </ul>
        </div>
        <div style={{display: "inline-block", verticalAlign: "top", width: "250px", padding: "5px"}}>
        <div className="component-container">IMAGES</div>
        <ul id="imagelist" className="list-container">
          <li><img className='book-image' src="https://www.goodfreephotos.com/albums/vector-images/red-book-icon-vector-clipart.png" /></li>
          <li><img className='book-image' src="https://p0.pikist.com/photos/601/962/book-books-pile-cover-blue-book-cover-paper-blank-design.jpg" /></li>
          <li><img className='book-image' src="https://cdn.pixabay.com/photo/2014/04/03/10/27/book-310519_960_720.png" /></li>
        </ul>
        </div>
        </div>
      </>
    );
  }
}

export default Editor;
