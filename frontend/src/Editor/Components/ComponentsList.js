import React, { Component } from "react";
import Sortable from "sortablejs";

class ComponentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    var el = document.getElementById('optionslist');
    Sortable.create(el, {
      group: {
        name: "components",
        pull: "clone",
        put: false
      },
      sort: false,
    });
  }


  render() {
    var components = [
      {type: "text", label: "Text Block"},
      {type: "number", label: "Number Block"},
      {type: "block", label: "Block Block"},
      {type: "image", label: "Image Block"},
      {type: "book", label: "Book Block"},
    ]
    return(
      <>
        <div className="component-container">COMPONENTS</div>
        
        <ul id="optionslist" className="list-container">
        {components.map((component) =>
          <li className="ComponentsList-item" data-label={component["type"]}>{component["label"]}</li>
        )}
        </ul>
      </>
    );
  }
}

export default ComponentsList;

