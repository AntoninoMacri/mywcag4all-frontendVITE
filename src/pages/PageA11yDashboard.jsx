import { React, useEffect } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";

export default function PageA11yDashboard(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const website = useSelector((state) => state.website.website);

  useTitle("Dashboard | Accessibilità | MyWcag4All");


  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Accessibilità",
      url: "/accessibility-dev/a11y",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Dashboard",
      url: "/accessibility-dev/a11y/choice",
      isCurrent: true,
      state: "a11y",
    },
  ];


  const clickHandler = () => {  //TODO:


      
  };


  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="ACCESSIBILITÀ" className="title-a11y" />

      <Card className="main-card shadow1">
        <h2 className="bold6">Prima di iniziare...</h2>
        <Row>
          <Col xs={12}>
            <Link
              to="/accessibility-dev/a11y/tips"
              className="btn btn-primary w-100 mb-2 mt-5 shadow-sm"
              state={{ location: "a11y" }}
            >
              Qualche consiglio utile
            </Link>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Link
              to="/accessibility-dev/a11y/guide"
              className="btn btn-primary w-100 mb-2 mt-2 shadow-sm"
              state={{ location: "a11y" }}
            >
              Istruzioni
            </Link>
          </Col>
        </Row>
      </Card>

      <Card className="main-card shadow1 mt-5">
        <h2 className="bold6">Valuta il sito "{website?.name}"</h2>

        <Row>
          <Col xs={12}>
            <Link
              to="/accessibility-dev/a11y/tests"
              className="btn btn-primary w-100 mb-2 mt-5 bold7 shadow-sm"
              state={{ location: "a11y" }}
            >
              Consulta i test di accessibilità
            </Link>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Link
              to="/accessibility-dev/a11y/wcag"
              className="btn btn-primary w-100 mb-2 mt-2 bold7 shadow-sm"
              state={{ location: "a11y" }}
              onClick={clickHandler}
            >
              Vai alle linee guida WCAG 2.2
            </Link>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
