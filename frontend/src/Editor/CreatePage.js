import React, { Component } from "react";

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import Editor from "./Editor.js";
import Render from "./Render.js";
import "./Editor.css";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list1: [],
      editable: true,
      keyCounter: 0,
      view: "edit",
    };

  }

  deleteObject = (index) => {
    var objects = this.state.list1;
    objects.splice(index, 1);
    this.setState({list1: objects});
    console.log(this.state.list1);
  }

  saveObject = (index, object) => {
    var objects = this.state.list1;
    objects[index] = object;
    this.setState({list1: objects});
    console.log(this.state.list1);
  }

  saveObjects = (objects) => {
    this.setState({list1: objects});
    console.log(this.state.list1);
  }

  updateKeyCounter = (value) => {
    this.setState({keyCounter: value});
  }

  deleteElement = (el) => {
    console.log(el);
    el.parentNode.removeChild(el);
  }

  render() {
    return (
      <>
      <div>
        <button onClick={() => this.setState({view: "edit"})}>Edit</button>
        <button onClick={() => this.setState({view: "preview"})}>Preview</button>
      </div>
      {this.state.view === "edit" ? (
      <Editor 
        list1={this.state.list1}
        keyCounter={this.state.keyCounter}
        saveObject={this.saveObject}
        saveObjects={this.saveObjects}
        deleteObject={this.deleteObject}
        updateKeyCounter={this.updateKeyCounter}
      />
      ) : (
        <>
        <h1>Preview</h1>
        <Render 
          list1={this.state.list1}
        />
        </>
      )}
      </>
    );
  }
}

export default CreatePage;
