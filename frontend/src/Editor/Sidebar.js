import React, { Component } from "react";

import { Formik, Field, Form } from 'formik';

import BooksList from "./Components/BooksList.js";
import ComponentsList from "./Components/ComponentsList.js";
import ImageList from "./Components/ImageList.js";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "components"
    };
  }

  render() {
    return(
      <div className="Sidebar-container">
        <div className="Sidebar-menu">
          <button className="Sidebar-button" onClick={() => this.setState({mode: "components"})}>Components</button>
          <button className="Sidebar-button" onClick={() => this.setState({mode: "books"})}>Books</button>
        </div>
        {this.state.mode == "components" ? (
          <ComponentsList />
        ) : this.state.mode == "images" ? (         
          <ImageList />
        ) : this.state.mode == "books" ? (
          <>
          <div className="component-container">BOOKS</div>
            {this.props.books && this.props.books.columns != null ? (
            <div>
            <Formik
              initialValues={{

              }}
              onSubmit={async values => {
                this.setState({form: values});
                this.props.searchBooks(values);
              }}
            >
              <Form>
                {this.props.books.columns.map((column) =>
                  <div>
                  <label>{column.COLUMN_NAME}</label>
                  <Field name={column.COLUMN_NAME} />
                  </div>
                )}
                <button type="submit">Search</button>
              </Form>
            </Formik>
            </div>
            ) : (
              <></>
            )}
          <BooksList books={this.props.books ? this.props.books.entry : null} />
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Sidebar;

