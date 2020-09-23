import React, { Component } from "react";

import ComponentContainer from "./ComponentContainer";

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <div style={{width: "100%", padding: "5px", marginRight: "20px"}}>
        <div className="component-container">LIST</div>
        <ul id="sortablelist" className="list-container">
          {this.props.objects.map((object, index) => 
              <li key={object.key}>
                <ComponentContainer 
                  index={index} 
                  deleteObject={this.props.deleteObject}
                  saveObject={this.props.saveObject} 
                  object={object} 
                  data={this.props.books}
                />
              </li>
          )}
        </ul>
      </div>
    );
  }
}

export default ListContainer;





