import * as React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
import { selectAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function HomePageBtns() {
  const { isAuthenticated } = useSelector(selectAuth);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigazione verso la pagina di login
    navigate("/accessibility-dev/log-in");
  };

  const handleSignup = () => {
    // Navigazione verso la pagina di registrazione
    navigate("/accessibility-dev/sign-up");
  };

  const handlePrivate = () => {
    // Navigazione verso la pagina di login
    navigate("/accessibility-dev/websites");
  };

  return (
    <>
      <Row>
        <h2 className="h2 bold8">Occupati di accessibilità.</h2>
      </Row>
      <Row>
        <p>
          MyWcag4All è uno strumento che ti aiuta a tenere traccia e ad implementare l'accessibilità nel tuo sito.
        </p>
      </Row>
      {!isAuthenticated && (
        <>
          <Row>
            <Col>
              <Button variant="primary" className="shadow1 my-2 w-100 bold8 btn-grad" onClick={handleLogin}>
                Accedi a MyWcag4All
              </Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="primary" className="shadow1 my-2 w-100 bold8 btn-grad" onClick={handleSignup}>
                Registrati
              </Button>
            </Col>
          </Row>
        </>
      )}
      {isAuthenticated && (
        <>
          <Row>
            <Col>
              <Button variant="primary" className="shadow1 my-2 w-100 bold8 btn-grad" onClick={handlePrivate}>
                La tua Area Privata - MyWcag4All
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default HomePageBtns;
