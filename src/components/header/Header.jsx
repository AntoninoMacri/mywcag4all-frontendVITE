import * as React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import unipdlogo from "../../img/dip.png";
import unipdinclusivalogo from "../../img/image.png";
import { useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  //const currentLocation = location.state?.location;
  const currentPath = useLocation(); // Location corrente

  // Leggi l'URL di reindirizzamento dalla variabile di ambiente
  const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

  return (
    <header id="header">
      <Row className="d-flex align-items-center justify-content-between">
        <Col md={12} lg={4} className="text-left pr-1">
          <a className="default-anchor" href="https://www.math.unipd.it/" hrefLang={"it"}>
            <img
              id="logo_unipd"
              src={unipdlogo}
              rel="external"
              alt="Logo del Dipartimento di Matematica dell'Università di Padova"
            />
          </a>
        </Col>
        <Col md={12} lg={4} className="text-center">
          {currentPath.pathname !== "/accessibility-dev/" ? (
            <a href={redirectUrl} hrefLang={"it"} className="main-title">
              <h1>MyWcag4All</h1>
            </a>
          ) : (
            <h1 className="main-title">MyWcag4All</h1>
          )}
        </Col>
        <Col md={12} lg={4} className="text-right test d-flex flex-row-reverse">
          <a className="default-anchor" href="https://www.unipd.it/inclusione" hrefLang={"it"} rel="external">
            <img
              id="logo_unipd_inclusiva"
              src={unipdinclusivalogo}
              alt="Logo del progetto 'Università di Padova inclusiva'"
            />
          </a>
        </Col>
      </Row>
    </header>
  );
}

export default Header;
