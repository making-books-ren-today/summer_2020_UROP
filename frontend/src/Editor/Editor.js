import React, { Component } from "react";

import Sortable from 'sortablejs';
import arrayMove from 'array-move';

import ComponentContainer from './Components/ComponentContainer.js'

import "./Editor.css";
import { get, post } from "../utilities.js";

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

    el = document.getElementById('imagelist');
    Sortable.create(el, {
      group: {
        name: "image",
        pull: "clone",
        put: false,
      }
    });

    el = document.getElementById('bookslist');
    Sortable.create(el, {
      group: {
        name: "book",
        pull: "clone",
        put: false,
      }
    });
  }

  componentDidMount() {
    this.createSortables();

    get("/api/get-books").then((res) => {
      console.log(res);
      this.setState({ data: res });
    });
  }

  deleteObject = (index) => {this.props.deleteObject(index)};
  saveObject = (index, object) => {this.props.saveObject(index, object)};

  deleteElement = (el) => {
    console.log(el);
    el.parentNode.removeChild(el);
  }

  searchBooks = () => { 
    get("/api/get-books", this.state.form).then((res) => {
      console.log(res);
      this.setState({ data: res });
    });
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
      <div style={{padding: "5px"}}>
        <div style={{display: "inline-block", verticalAlign: "top", width: "250px", padding: "5px"}}>
        <div className="component-container">LIST</div>
        <ul id="sortablelist" className="list-container">
          {this.props.objects.map((object, index) => {
            return(
              <li key={object.key}>
                <ComponentContainer 
                  index={index} 
                  deleteObject={this.props.deleteObject}
                  saveObject={this.props.saveObject} 
                  object={object} 
                  data={this.state.data}
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
          <li data-label="book">Book</li>
        </ul>
        </div>
        <div style={{display: "none", verticalAlign: "top", width: "250px", padding: "5px"}}>
        <div className="component-container">IMAGES</div>
        <ul id="imagelist" className="list-container">
          <li><img className='book-image' src="https://www.goodfreephotos.com/albums/vector-images/red-book-icon-vector-clipart.png" /></li>
          <li><img className='book-image' src="https://p0.pikist.com/photos/601/962/book-books-pile-cover-blue-book-cover-paper-blank-design.jpg" /></li>
          <li><img className='book-image' src="https://cdn.pixabay.com/photo/2014/04/03/10/27/book-310519_960_720.png" /></li>
        </ul>
        </div>
        <div style={{display: "inline-block", verticalAlign: "top", width: "250px", padding: "5px"}}>
        <div className="component-container">BOOKS</div>
        {this.state.data && this.state.data.columns != null ? (
          <form>
          {this.state.data.columns.map((column) => {
            return (
              <div><label>{column.COLUMN_NAME}<input name={column.COLUMN_NAME} onChange={this.handleInputChange} type="text" /></label></div>
            )
          })}
          </form>
        ) : (
          <></>
        )}
        <div><button onClick={() => this.searchBooks()}>Search</button></div>
        <ul id="bookslist" className="list-container">
          {this.state.data && this.state.data.entry !== null ? (
          this.state.data.entry.map((object, index) => {
            return(
              <li data-index={index} style={{outline: "1px solid black"}} key={index}>
                {object.title}
              </li>
            );
          })
          ) : (
            <></>
          )}
        </ul>
        </div>
        </div>
        <div>
          {this.state.data && this.state.data.columns && this.state.data.entry ? (
            <table>
            <thead>
            <tr>
              {this.state.data.columns.map((column) => {
                return <th>{column.COLUMN_NAME}</th>
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.data.entry.map((row) => {
              return (
              <tr>
              {Object.keys(row).map((key) => {
                return <td>{row[key]}</td>
              })}
              </tr>
            )})}
            </tbody>
            </table>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default Editor;
