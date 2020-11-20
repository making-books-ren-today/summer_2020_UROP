import React, { Component } from "react";

import { get, post } from "./utilities.js";

import { Formik, Field, Form } from 'formik';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
        registration: {}
    };
  }

  componentDidMount = () => {

  }

  createUser = () => {
    post("/api/create-user/", this.state.registration).then((res) => {
      console.log(res);
    });
  }

  render() {
    return(
      <>
        <div>
          <h1>Register</h1>
          <Formik
            initialValues={{

            }}
            onSubmit={async values => {
              this.setState({registration: values});
              this.createUser();
            }}
          >
            <Form>
              <div>
              <label>User</label>
              <Field id="username" name="username" />
              </div>

              <div>
              <label>Email</label>
              <Field id="email" name="email" />
              </div>

              <div>
              <label>Password</label>
              <Field id="password" name="password" />
              </div>

              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      </>
    );
  }
}

export default Registration;

