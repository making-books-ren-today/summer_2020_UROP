import React, { Component } from "react";

class BlockComponent extends Component {
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

  render() {
    return(
      <>
        <div style={{width: "100px", height: "100px"}}></div>
      </>
    );
  }
}

export default BlockComponent;

