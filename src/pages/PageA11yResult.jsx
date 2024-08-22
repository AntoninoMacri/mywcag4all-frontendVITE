import { React, useEffect, useState } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Row from "react-bootstrap/Row";
import ChartsLevel from "../components/charts-level/ChartsLevel";
import ChartsType from "../components/charts-type/ChartsType";
import Card from "react-bootstrap/Card";
import ContainerB from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Col from "react-bootstrap/Col";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";
import { getWebsiteResults } from "../service/api/api.websites";
import { useDispatch } from "react-redux";
import { updateWebsiteResults } from "../store/websiteSlice";
import Spinner from "react-bootstrap/Spinner";

export default function PageA11yResult(props) {
  const results = useSelector((state) => state.website.website.results);

  const websiteId = useSelector((state) => state.website.website._id);
  const dispatch = useDispatch();

  useTitle("Risultati | Controllo sezioni WCAG | Dashboard | Accessibilità | MyWcag4All");

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {

    getWebsiteResults(websiteId).then((res) => {

      dispatch(updateWebsiteResults(res));

      setIsFetching(false);

    })

  }, []);

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
      page: "Verifica WCAG",
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Risultati",
      url: "/accessibility-dev/a11y/result",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="RISULTATI" className="title-a11y" />

      {
        isFetching && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <Spinner animation="border" variant="primary" />
          </div>
        )
      }

      {
        isFetching === false &&
        (
          <>
            <ContainerB className="mt-5 p-0">
              <Card className="card-specific shadow1">
                <Card.Header as="h2" className="text-center border-bottom">
                  RISULTATI TEST
                </Card.Header>

                <Card.Body>
                  <Row as="dl">
                    <Col as="dt" sm={3}>
                      <p>Conformità sito: </p>
                    </Col>
                    <Col as="dd" sm={9}>
                      <p>
                        {results?.isA && results?.isAA && (
                          <Badge bg="success" as="span">
                            conforme
                          </Badge>
                        )}
                        {
                          !results?.isA &&
                          !results?.isAA &&
                          (
                            <Badge bg="danger" as="span">
                              non conforme
                            </Badge>
                          )
                        }
                      </p>
                    </Col>

                    <Col as="dt" sm={3}>
                      <p>Test effettuati: </p>
                    </Col>
                    <Col as="dd" sm={9}>
                      <p>
                        <Badge bg="success">
                          {results?.totalMet} {results?.totalMet == 1 ? "test è stato svolto con successo" : "test sono stati svolti con successo"}
                        </Badge>{" "}
                        su un totale di{" "}
                        <Badge bg="secondary">
                          {results?.totalApplicable} test applicabili{" "}
                        </Badge>
                      </p>
                    </Col>

                    <Col as="dt" sm={3}>
                      <p>Punti totali: </p>
                    </Col>
                    <Col as="dd" sm={9}>
                      <Badge bg="warning" as="span" text="black">
                        {results?.score} punti
                      </Badge>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </ContainerB>
            <ContainerB className="mt-5 p-0">
              <Card className="card-specific shadow1">
                <Card.Header as="h2" className="text-center border-bottom">
                  SPECIFICA DEI LIVELLI
                </Card.Header>

                <Card.Body>
                  <ChartsLevel
                    level="A"
                    total={results?.totalA}
                    passedTest={results?.metA}
                    notPassedTest={results?.notMetA}
                    applicableTest={
                      results?.totalA - results?.notApplicableA
                    }
                    notApplicableTest={results?.notApplicableA}
                    isArchived={results?.isA}
                    amountCriteria={results?.totalA}
                    passedCriteria={results?.metA}
                    notPassedCriteria={results?.notMetA}
                    notApplicableCriteria={results?.notApplicableA}
                    completed={
                      parseInt(results?.notApplicableA) +
                      parseInt(results?.metA)
                    }
                    toComplete={parseInt(results?.notMetA)}
                  />
                  <ChartsLevel
                    level="AA"
                    total={results?.totalAA}
                    passedTest={results?.metAA}
                    notPassedTest={results?.notMetAA}
                    applicableTest={
                      results?.totalAA - results?.notApplicableAA
                    }
                    notApplicableTest={results?.notApplicableAA}
                    isArchived={results?.isAA}
                    amountCriteria={results?.totalAA}
                    passedCriteria={results?.metAA}
                    notPassedCriteria={results?.notMetAA}
                    notApplicableCriteria={results?.nonApplicableA}
                    completed={
                      parseInt(results?.notApplicableAA) +
                      parseInt(results?.metAA)
                    }
                    toComplete={results?.notMetAA}
                  />
                  <ChartsLevel
                    level="AAA"
                    total={results?.totalAAA}
                    passedTest={results?.metAAA}
                    notPassedTest={results?.notMetAAA}
                    applicableTest={
                      results?.totalAAA - results?.notApplicableAAA
                    }
                    notApplicableTest={results?.notApplicableAAA}
                    isArchived={results?.isAAA}
                    amountCriteria={results?.totalAAA}
                    passedCriteria={results?.metAAA}
                    notPassedCriteria={results?.notMetAAA}
                    notApplicableCriteria={results?.nonApplicableA}
                    completed={
                      parseInt(results?.notApplicableAAA) +
                      parseInt(results?.metAAA)
                    }
                    toComplete={results?.notMetAAA}
                  />
                </Card.Body>
              </Card>
            </ContainerB>

            <ContainerB className="my-5 p-0">
              <Card className="card-specific shadow1">
                <Card.Header as="h2" className="text-center border-bottom">
                  PUNTEGGIO
                </Card.Header>

                <Card.Body>
                  <ChartsType
                    score={results?.score}
                    total={results?.tot_test}
                    automaticTest={parseInt(results?.metAutomated)}
                    semiautomaticTest={parseInt(results?.metSemiAutomated)}
                    manualTest={parseInt(results?.metManual)}
                    notPassedTest={results?.totalNotMet}
                    notApplicableTest={results?.totalNotApplicable}
                  />
                </Card.Body>
              </Card>
            </ContainerB>

            <ContainerB className="my-5 p-0">
              <Card className="main-card shadow1">
                <Link
                  to="/accessibility-dev/websites"
                  className="btn btn-secondary w-100"
                  state={{ location: "a11y" }}
                >
                  Torna ai miei siti
                </Link>

                <Link
                  to="/accessibility-dev/a11y/tests"
                  className="btn btn-warning w-100 my-2"
                  state={{ filters: { isMet: false }, location: "a11y" }}
                >
                  Visualizza test da ripetere
                </Link>
              </Card>
            </ContainerB>
          </>
        )
      }

    </Container>
  );
}