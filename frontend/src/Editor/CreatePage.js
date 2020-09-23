import React, { Component } from "react";
import { get, post } from '../utilities.js';

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import Editor from "./Editor.js";
import Render from "./Render/Render.js";
import "./Editor.css";

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [],
      currentPage: {title: "", objects: []},
      objects: [],
      currentIndex: -1,
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

  addPage = () => {
    var newPage = {title: "New Page", objects: []};
    this.setState({pages: this.state.pages.concat([newPage])});
    this.setState({objects: newPage.objects})
  }

  selectPage = (index) => {
    var pages = this.state.pages;
    var currentPage = this.state.currentPage;
    currentPage.objects = this.state.objects
    if (this.state.currentIndex >= 0) pages[this.state.currentIndex] = currentPage;
    this.setState({pages: pages});
    this.setState({currentPage: this.state.pages[index], objects: this.state.pages[index].objects, currentIndex: index});
    this.setState({view: "edit"});
  }

  changePageTitle = (index, title) => {
    var pages = this.state.pages;
    var page = pages[index];
    page.title = title;
    pages[index] = page;
    this.setState({pages: pages});
  }

  /*
          <div style={{display: "inline-block", padding: "5px", margin: "5px"}}>
          <div className="preview">
            <Render 
              objects={page.objects}
            />
          </div>
          <span>{page.title}</span><button onClick={() => this.selectPage(index)}>Select</button>
          </div>
          */

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
        <button onClick={() => this.addPage()}>Add Page</button>
        <div>
        {this.state.pages.map((page, index) =>
          <div className="component-container">
            <button onClick={() => this.selectPage(index)}>Select</button>
            <span> {page.title} </span>
            <span style={{float: "right"}}>
              <input id={"pagetitle" + index} type="text" />
              <button style={{float: "right"}} onClick={() => this.changePageTitle(index, document.getElementById("pagetitle" + index).value)}>Change Name</button>
            </span>
          </div>
        )}
        </div>
        </>
      ) : this.state.view === "edit" ? (
        <Editor 
          pageName={this.state.currentPage.title}
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
