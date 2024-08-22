import * as React from "react";
import { Link } from "react-router-dom";

function Breadcrumb(props) {
  return (
    <nav className="breadcrumb shadow-sm main-card" aria-label="Breadcrumb">
      <ol>
        {props.pages &&
          props.pages.map((page_element, index) => (
            <li key={`brd-it-${index}`}>
              {!page_element.isCurrent ? (
                <Link
                  to={`${page_element.url}`}
                  state={{ location: page_element.state }}
                  className="default-anchor"
                >
                  {page_element.page}
                </Link>
              ) : (
                <span aria-current="page">{page_element.page}</span>
              )}
            </li>
          ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
