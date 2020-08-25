import React, { Component } from "react";

import { get, post } from "./utilities.js";

import { Formik, Field, Form } from 'formik';

class DebugPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
  }

  insertPost = () => {
    post("/api/insert-post/", this.state.form).then((res) => {
      console.log(res);
      this.setState({ data: res });
    });
  }

  render() {
    return(
      <>
        <div>
          <h1>Sign Up</h1>
          <Formik
            initialValues={{

            }}
            onSubmit={async values => {
              this.setState({form: values});
              this.insertPost();
            }}
          >
            <Form>
              <div>
              <label>ID</label>
              <Field type="number" id="ID" name="ID" />
              </div>

              <div>
              <label>User</label>
              <Field id="User" name="User" />
              </div>

              <div>
              <label>Content</label>
              <Field id="Content" name="Content" />
              </div>

              <div>
              <label>Date</label>
              <Field type="date" id="Date" name="Date" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default DebugPage;

