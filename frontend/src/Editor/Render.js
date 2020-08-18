import React, { Component } from "react";

import BlockRender from './BlockRender.js'
import TextRender from './TextRender.js'
import NumberRender from './NumberRender.js'
import ImageRender from './ImageRender.js'

class Render extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return(
      <>
        <ul>
          {this.props.list1.map((object, index) => {
            if (object.type === 'text') {
              return <div><TextRender object={object} /></div>
            } else if (object.type === 'number') {
              return <div><NumberRender object={object} /></div>
            } else if (object.type === 'block') {
              return <div><BlockRender object={object} /></div>
            } else if (object.type === 'image') {
              return <div><ImageRender object={object} /></div>
            } else {
              return <div>{this.props.object.text}</div>
            }
          })}
        </ul>
      </>
    );
  }
}

export default Render;



