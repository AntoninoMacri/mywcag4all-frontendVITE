import React from "react";
import reactStringReplace from 'react-string-replace';

function Note(props) {
  const element = reactStringReplace(props.title, /\{([^()]*)\}/g, (match, index) => (
    <a
      key={index} // Aggiungi una chiave unica qui
      className="default-anchor"
      href={"#" + props.href}
      onClick={props.onClick}
      data-index={props.index}
    >
      {match}
    </a>
  ));

  return (
    <li>
      <div className={`postit d-inline-block p-2 pt-3 postit-color-${props.color}`}>
        {element}
      </div>
    </li>
  );
}

export default Note;
