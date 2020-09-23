import React, { Component } from "react";

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import ComponentContainer from './Components/ComponentContainer.js'
import BooksList from './Components/BooksList.js'
import Sidebar from './Sidebar.js'
import ListContainer from './Components/ListContainer.js'

import "./Editor.css";
import { get, post } from "../utilities.js";

import { Formik, Field, Form } from 'formik';

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [],
      editable: true,
      view: "edit",
      form: {},
    };

  }

  createSortables = () => {
    var el = null

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
        var objects = this.props.objects;
        var dataLabel = el.dataset.label;
        var object = {'type': dataLabel, 'text': '', 'key': this.props.keyCounter};
        this.props.updateKeyCounter(this.props.keyCounter+1);
        objects.splice(index, 0, object);
        this.deleteElement(el);
        this.props.saveObjects(objects);
      }),

      onUpdate: ((evt) => {
        var objects = this.props.objects;
        var newObjects = arrayMove(objects, evt.oldIndex, evt.newIndex);
        this.props.saveObjects(newObjects);
      }),
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
    return (
      <>
      <h1>Edit</h1>
      <div style={{display: "flex", padding: "5px", width: "100%", outline: "1px solid black"}}>
        <ListContainer 
          objects={this.props.objects}
          books={this.props.books}
          deleteObject={this.props.deleteObject}
          saveObject={this.props.saveObject} 
        />
        <Sidebar 
          books={this.props.books}
          searchBooks={this.props.searchBooks}
        />
      </div>
      </>
    );
  }
}

export default Editor;
