import React from "react";

function Note(props) {
  return (
    <li>
      <a className="default-anchor" href={"#" + props.href} onClick={props.onClick} data-index={props.index}>
        <div className={`postit d-inline-block p-2 pt-3 postit-color-${props.color}`}>{props.title}</div>
      </a>
    </li>
  );
}

export default Note;
