import * as React from "react";
import ContainerB from "react-bootstrap/Container";

function Container({ children }) {
  return (
    <main id="container" className="main-container">
      <ContainerB className="main-sub-container">{children}</ContainerB>
    </main>
  );
}

export default Container;
