import React, { Component } from "react";
import { get, post } from '../utilities.js';

import {useParams, Redirect} from "react-router-dom";

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
    const siteId = this.props.computedMatch.params.siteId;
    const pageId = this.props.computedMatch.params.pageId;
    this.setState({ siteId: siteId, pageId: pageId});

    get(`/api/get-page/${siteId}/${pageId}`).then((res) => {
      console.log(res);
      this.setState({ pageData: res });
    });

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
    const userId = this.props.userId;
    if (userId == undefined) { return(<div>Loading</div>); }
    if (userId != this.props.computedMatch.params.userId) { return(<Redirect to="/" />); }

    return (
      <>
      <h1>Site Id: {this.state.siteId}</h1>
      <h1>Page Id: {this.state.pageId}</h1>
      <div>
        <button onClick={() => this.setState({view: "edit"})}>Edit</button>
        <button onClick={() => this.setState({view: "preview"})}>Preview</button>
      </div>
      {this.state.view === "edit" ? (
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
