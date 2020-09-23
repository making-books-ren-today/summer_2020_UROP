import React, { Component } from "react";
import { get, post } from '../utilities.js';

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import Editor from "./Editor.js";
import Render from "./Components/Render.js";
import "./Editor.css";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      objects: [],
      currentIndex: 0,
      editable: true,
      keyCounter: 0,
      view: "edit",
    };
  }

  componentDidMount() {
    get("/api/get-books").then((res) => {
      this.setState({ books: res });
    });
  }

  searchBooks = (params) => { 
    get("/api/get-books", params).then((res) => {
      this.setState({ books: res });
    });
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

  selectPage = (index) => {
    var pages = this.state.pages;
    pages[this.state.currentIndex] = this.state.objects;
    this.setState({pages: pages});
    this.setState({objects: this.state.pages[index], currentIndex: index});
  }

  render() {
    return (
      <>
      <div>
        <button onClick={() => this.setState({view: "select"})}>Select</button>
        <button onClick={() => this.setState({view: "edit"})}>Edit</button>
        <button onClick={() => this.setState({view: "preview"})}>Preview</button>
      </div>
      {this.state.view === "select" ? (
        <>
        <div>Select Page</div>
        <button onClick={() => this.setState({pages: this.state.pages.concat([[]])})}>Add Page</button>
        <div>
        {this.state.pages.map((page, index) =>
          <div style={{display: "inline-block", padding: "5px", margin: "5px"}}>
          <div className="preview">
            <Render 
              objects={page}
            />
          </div>
          <span>{index}</span><button onClick={() => this.selectPage(index)}>Select</button>
          </div>
        )}
        </div>
        </>
      ) : this.state.view === "edit" ? (
        <Editor 
          objects={this.state.objects}
          books={this.state.books}
          searchBooks={this.searchBooks}
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
