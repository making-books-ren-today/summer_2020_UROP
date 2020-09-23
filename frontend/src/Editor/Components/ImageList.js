import React, { Component } from "react";

import Sortable from "sortablejs";

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    var el = document.getElementById('imagelist');
    Sortable.create(el, {
      group: {
        name: "image",
        pull: "clone",
        put: false,
      }
    });
  }


  render() {
    return(
      <>
        <div className="component-container">IMAGES</div>
        <ul id="imagelist" className="list-container">
          <li><img className='book-image' src="https://www.goodfreephotos.com/albums/vector-images/red-book-icon-vector-clipart.png" /></li>
          <li><img className='book-image' src="https://p0.pikist.com/photos/601/962/book-books-pile-cover-blue-book-cover-paper-blank-design.jpg" /></li>
          <li><img className='book-image' src="https://cdn.pixabay.com/photo/2014/04/03/10/27/book-310519_960_720.png" /></li>
        </ul>
      </>
    );
  }
}

export default ImageList;

