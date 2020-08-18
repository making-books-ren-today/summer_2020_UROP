import React, { Component } from "react";

import BlockComponent from './BlockComponent.js'
import TextComponent from './TextComponent.js'
import NumberComponent from './NumberComponent.js'
import ImageComponent from './ImageComponent.js'

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
    return(
      <>
        <div className="component-container">
        <div className="container-label">
          <span style={{"textTransform": "capitalize"}}>{this.props.object.type} Block</span>
          <span style={{float: "right"}}><button onClick={this.deleteSelf}>Delete</button></span>
        </div>
        <div>
        {(() => {
          if (this.props.object.type === 'text') {
            return <div><TextComponent id={this.props.object.key} object={this.props.object} saveSelf={this.saveSelf} /></div>
          } else if (this.props.object.type === 'number') {
            return <div><NumberComponent id={this.props.object.key} object={this.props.object} saveSelf={this.saveSelf} /></div>
          } else if (this.props.object.type === 'block') {
            return <div><BlockComponent id={this.props.object.key} object={this.props.object} saveSelf={this.saveSelf} /></div>
          } else if (this.props.object.type === 'image') {
            return <div><ImageComponent id={this.props.object.key} object={this.props.object} saveSelf={this.saveSelf} /></div>
          } else {
            return <div>{this.props.object.text}</div>
          }
        })()}
        </div>
        </div>
      </>
    );
  }
}

export default ComponentContainer;

