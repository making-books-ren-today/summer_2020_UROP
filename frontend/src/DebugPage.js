import React, { Component } from "react";

import { get, post } from "./utilities.js";

import { Formik, Field, Form } from 'formik';

class DebugPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
      dataLoaded: false,
    };
  }

  componentDidMount = () => {
    this.setState({dataLoaded: false})
    get("/api/get-people").then((res) => {
      this.setState({data: res, dataLoaded: true});
      console.log(this.state.data);
    });
  }

  insertPost = () => {
    post("/api/insert-post/", this.state.form).then((res) => {
      console.log(res);
    });
  }

  insertJSON = () => {
    var object = {x: 1, y: 2, z: 3};
    var data = {ID: 1, Data: object};
    post("/api/insert-json/", data).then((res) => {
      console.log(res);
    }) 
  }

  searchPeople = (params) => { 
    this.setState({dataLoaded: false})
    get("/api/get-people", params).then((res) => {
      this.setState({data: res, dataLoaded: true});
      console.log(this.state.data);
    });
  }

  render() {
    return(
      <>
        <div>
          <button onClick={() => this.insertJSON()}>INSERT JSON</button>
          <h1>Post</h1>
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

        <div>
          <Formik
            initialValues={{

            }}
            onSubmit={async values => {
              this.setState({form: values});
              this.searchPeople(values);
            }}
          >
            <Form>
              <div><label>Forename: </label><Field name="ForenamesIndex" /></div>
              <div><label>Surname: </label><Field name="SurnameIndex" /></div>
              <button type="submit">Search</button>
            </Form>
          </Formik>
        </div>

        <div>
          {this.state.dataLoaded ? (
            <table>
            <thead>
            <tr>
              {Object.keys(this.state.data.people[0]).map((label) => {
                return <th>{label}</th>
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.data.people.map((row) => {
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
            <>
              <div>Loading Data</div>
            </>
          )}
        </div>
      </>
    );
  }
}

export default DebugPage;

