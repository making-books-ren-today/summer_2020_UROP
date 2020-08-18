import React, { Component } from "react";

class TextComponent extends Component {
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
        <textarea 
          id={"text" + this.props.id} 
          onChange={(event) => this.saveObject(event.target.value)} 
          readOnly={!this.state.editable}
          defaultValue={this.props.object.content || ''}
        />
      </>
    );
  }
}

export default TextComponent;

