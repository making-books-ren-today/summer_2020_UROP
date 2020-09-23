import React, { Component } from "react";

import BlockComponent from './BlockComponent.js';
import TextComponent from './TextComponent.js';
import NumberComponent from './NumberComponent.js';
import ImageComponent from './ImageComponent.js';
import BookComponent from './BookComponent.js';

class ComponentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: true,
    };
  }

  enabled = () => {
    this.setState({editable: true})
  };

  disabled = () => {
    this.setState({editable: false})
  }

  deleteSelf = () => {
    this.props.deleteObject(this.props.index);
  }

  saveSelf = (object) => {
    this.props.saveObject(this.props.index, object);
  }

  render() {
    const Components = {
      'text': TextComponent,
      'number': NumberComponent,
      'block': BlockComponent,
      'image': ImageComponent,
      'book': BookComponent,
    }

    return(
      <>
        <div className="component-container">
        <div className="container-label">
          <span style={{"textTransform": "capitalize"}}>{this.props.object.type} Block</span>
          <span style={{float: "right"}}><button onClick={this.deleteSelf}>Delete</button></span>
        </div>
        <div>
        {(() => {
          let Component = Components[this.props.object.type];
          return <div>
              <Component 
                id={this.props.object.key} 
                data={this.props.data}
                object={this.props.object} 
                saveSelf={this.saveSelf} 
              />
            </div>
        })()}
        </div>
        </div>
      </>
    );
  }
}

export default ComponentContainer;

