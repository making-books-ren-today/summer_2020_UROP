import React, { Component } from "react";

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import Editor from "./Editor.js";
import Render from "./Components/Render.js";
import "./Editor.css";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objects: [],
      editable: true,
      keyCounter: 0,
      view: "edit",
    };

  }

  deleteObject = (index) => {
    var objects = this.state.objects;
    objects.splice(index, 1);
    this.setState({objects: objects});
    console.log(this.state.objects);
  }

  saveObject = (index, object) => {
    var objects = this.state.objects;
    objects[index] = object;
    this.setState({objects: objects});
    console.log(this.state.objects);
  }

  saveObjects = (objects) => {
    this.setState({objects: objects});
    console.log(this.state.objects);
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
        objects={this.state.objects}
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
          objects={this.state.objects}
        />
        </>
      )}
      </>
    );
  }
}

export default CreatePage;
