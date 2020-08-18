import React, { Component } from "react";

import BlockRender from './BlockRender.js';
import TextRender from './TextRender.js';
import NumberRender from './NumberRender.js';
import ImageRender from './ImageRender.js';
import BookRender from './BookRender.js';

class Render extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const Components = {
      'text': TextRender,
      'number': NumberRender,
      'block': BlockRender,
      'image': ImageRender,
      'book': BookRender,
    }

    return(
      <>
        <ul>
          {this.props.objects.map((object, index) => {
            let Component = Components[object.type]
            return <div><Component object={object} /></div>
          })}
        </ul>
      </>
    );
  }
}

export default Render;



