import { React, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Container from "../components/container/Container";
import ToolList from "../components/tool-list/ToolList";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import TestCategory from "../components/test-type/TestCategory";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";

export default function PageTest(props) {
  const [criteria, setCriteria] = useState([]);

  const params = useParams();
  const id = params.testid;

  const test = useSelector(state => {
    const selectedTest = state.website.website.tests.find(test => test.index === id);
    return selectedTest;
  })


  useTitle("Test ", id, " | Lista di test | Accessibilità | MyWcag4All");

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
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Lista test",
      url: "/accessibility-dev/a11y/tests",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Dettagio test " + id,
      url: "/accessibility-dev/a11y/" + id,
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Card className="card-specific shadow">
        <Card.Header className="border-bottom">
          <h1 className="bold7 text-center">Specifiche Test {id}</h1>
        </Card.Header>
        <Card.Body>

          <>
            <h2 className="bold7">Informazioni</h2>
            <Row as="dl">
              <Col as="dt" sm={3}>
                <p>Descrizione: </p>
              </Col>
              <Col as="dd" sm={9}>
                <p>{test.purpose}</p>
              </Col>

              <Col as="dt" sm={3}>
                <p>Tipologia di test: </p>
              </Col>
              <Col as="dd" sm={9}>
                {test.category} <TestCategory category={test.category} />
              </Col>

              <Col as="dt" sm={3}>
                <p>Procedura: </p>
              </Col>
              <Col as="dd" sm={9}>
                <p>{test.procedure}</p>
              </Col>
            </Row>

            <hr aria-hidden="true" alt="" />

            <h2 className="bold7">Accessibilità</h2>

            <Row as="dl">
              <Col as="dt" sm={3}>
                <p>
                  <strong>Livello WCAG: </strong>
                </p>
              </Col>
              <Col as="dd" sm={9}>
                <p>{test.level}</p>
              </Col>
              <Col as="dt" sm={3}>
                <p>
                  <strong>Criteri WCAG: </strong>
                </p>
              </Col>
              <Col as="dd" sm={9}>
                <ul>
                  {criteria &&
                    criteria.map((element) => {
                      return (
                        <li>
                          {element.index} - {element.name}
                        </li>
                      );
                    })}
                </ul>
              </Col>

              <Col as="dt" sm={3}>
                <p>
                  <strong>Criteri AGID: </strong>
                </p>
              </Col>
              <Col as="dd" sm={9}>
                <ul>
                  {criteria &&
                    criteria.map((element) => {
                      return (
                        <li>
                          9.{element.index} - {element.name}
                        </li>
                      );
                    })}
                </ul>
              </Col>
            </Row>

            <hr aria-hidden="true" alt="" />

            <h2 className="bold7">Strumenti</h2>

            {!test.tools && (
              <>
                <p>Nessun strumento disponibile</p>
              </>
            )}

            {test.tools && test.tools.length > 0 && (
              <>
                <ToolList tools={test.tools} />
              </>
            )}
          </>

          <Link
            to="/accessibility-dev/a11y/tests"
            className="btn btn-secondary shadow1 w-100 mt-3"
            state={{ location: "a11y" }}
            rel="prev"
          >
            Torna alla lista dei test
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};