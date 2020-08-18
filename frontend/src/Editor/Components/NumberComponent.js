import React, { Component } from "react";

class NumberComponent extends Component {
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

  saveObject = (value) => {
    var object = this.props.object;
    object['content'] = value;
    this.props.saveSelf(object);
  }

  render() {
    return(
      <>
        <input 
          type="number" 
          onChange={(event) => this.saveObject(event.target.value)} 
          readOnly={!this.state.editable}
          defaultValue={this.props.object.content || 0}
        />
      </>
    );
  }
}

export default NumberComponent;

