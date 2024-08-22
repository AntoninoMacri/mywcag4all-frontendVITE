import { React } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function Footer(props) {
  return (
    <footer id="footer" className="w-100">
      <Container className="w-100">
        <Row>
          <Col className="text-center">
            <a className="visually-hidden" href="#container">
              Torna al contenuto principale
            </a>
            <p>
              <small>
                © 2022 Università di Padova, Dipartimento di Matematica “Tullio
                Levi-Civita” - Tutti i diritti riservati -{" "}
                <a
                  hrefLang={"it"}
                  className="default-anchor"
                  href="https://docs.google.com/forms/d/1mE6JWsEbAtyL-86aH8JZ6FZNaewntZIRh3x4yY5xti8/edit"
                  rel="external noreferrer"
                  target="_blank"
                >
                  Segnala un bug
                </a>{" "}
                -{" "}
                <a
                  className="default-anchor"
                  href="https://www.unipd.it/privacy"
                  rel="external noreferrer"
                  target="_blank"
                  hrefLang={"it"}
                >
                  Privacy Policy{" "}
                </a>
              </small>
            </p>
            <a href="#container" className="visually-hidden">
              Torna al contenuto principale
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
