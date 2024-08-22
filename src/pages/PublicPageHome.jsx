import { React, useEffect } from "react";
import HomePageBtns from "../components/homepage-btns/HomePageBtns";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FaMagic, FaTools, FaBackward } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLicenses } from "../service/api/api.licenses";
import {
  setToolsData,
  setToolsDataClsses,
} from "../store/slice.tools";
import { getTools, getToolsClasses } from "../service/api/api.tools";

export default function PageHome(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    getTools().then((res) => {
      dispatch(setToolsData({ data: res }));
    });

    getToolsClasses().then((res) => {
      dispatch(setToolsDataClsses({ data: res }));
    });
    getLicenses().then(function (res) {
      // console.log("set licenses data res", res)
    });
  }, []);

  return (
    <Container as="main" id="main">
      <Row className="home-cta-container">
        <Col className="d-flex flex-column justify-content-center">
          <HomePageBtns className="h-100" />
        </Col>
        <Col className="bg-home-pic" />
      </Row>

      <Row className="mt-5 homepage-secondary-btns text-center mb-5">
        <Col>
          <Card className="home-card shadow1">
            <Card.Header className="gradient-btns-homepage">
              <FaMagic alt="" />
            </Card.Header>
            <Card.Body>
              <Link
                to="/accessibility-dev/myths"
                as="h2"
                className="h5 default-anchor"
                state={{ location: "public" }}
              >
                Miti e stereotipi
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="home-card shadow1">
            <Card.Header className="gradient-btns-homepage">
              <FaTools alt="" />
            </Card.Header>
            <Card.Body>
              <Link
                to="/accessibility-dev/tools"
                as="h2"
                className="h5 default-anchor"
                state={{ location: "public" }}
              >
                Strumenti per l'accessibilità
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="home-card shadow1">
            <Card.Header className="gradient-btns-homepage">
              <FaBackward role="presentation" alt="" />
            </Card.Header>
            <Card.Body>
              <h2 className="h5">
                <a
                  className="default-anchor"
                  rel="external"
                  href="https://web.math.unipd.it/accessibility/index.html"
                  hrefLang={"it"}
                >
                  Torna a Wcag4All
                </a>
              </h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
