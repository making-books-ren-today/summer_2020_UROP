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
    const objects = this.props.objects;
    console.log("Objects");
    console.log(objects);

    return(
      <>
        {objects ? (
          objects.map((object, index) => {
            let Component = Components[object.type]
            return <div style={{outline: "1px solid black"}}><Component object={object} /></div>
          })
        ) : (
          <div>No page selected.</div>
        )}
      </>
    );
  }
}

export default Render;



