import Card from "react-bootstrap/Card";
import Title from "../components/title/Title";
import Container from "../components/container/Container";
import { React } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Price from "../components/price/Price";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";

export default function PageTool(props) {
  const params = useParams();
  const location = useLocation();
  const name = location.state.name;

  useTitle("Strumento ", name, " | Lista strumenti | Accessibilità | MyWcag4All");

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "Lista strumenti e risorse",
      url: "/accessibility-dev/tools",
      isCurrent: false,
      state: "tools",
    },
    {
      page: name,
      url: "/accessibility-dev/tools/" + name,
      isCurrent: true,
      state: "tools",
    },
  ];

  const tool = useSelector((state) => state.tools.tools_data.find((tool) => tool._id === params.toolid));

  console.log("this tool: ", tool);

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="SPECIFICHE STRUMENTO" className="title-a11y" />

      <Card className="card-specific shadow1">
        <Card.Header className="border-bottom">
          <h2 className="bold7">{tool?.name}</h2>
        </Card.Header>

        <Card.Body>
          <h3 className="my-3">Informazioni sullo strumento</h3>

          <Row as="dl">
            <Col as="dt" sm={3}>
              Sito ufficiale:
            </Col>
            <Col as="dd" sm={9}>
              {tool?.url ? (
                <a
                  className="default-anchor"
                  href={tool?.url}
                  hrefLang={"en"}
                  target="_blank"
                  rel="noopener noreferrer external"
                >
                  vai al sito ufficiale di {tool?.name}
                </a>
              ) : (
                <span>Sito ufficiale non disponibile</span>
              )}
            </Col>

            <Col as="dt" sm={3}>
              Licenza:
            </Col>
            <Col as="dd" sm={9}>
              {tool?.license && tool?.license.url ? (
                <a
                  className="default-anchor"
                  href={tool?.license.url}
                  hrefLang={"en"}
                  target="_blank"
                  rel="noopener noreferrer external"
                >
                  {tool?.license.name}
                </a>
              ) : (
                <span>Nessuna licenza trovata</span>
              )}
            </Col>

            <Col as="dt" sm={3}>
              Codice sorgente:
            </Col>
            <Col as="dd" sm={9}>
              {tool?.source_code ? (
                <a
                  className="default-anchor"
                  href={tool?.source_code}
                  hrefLang={"en"}
                  target="_blank"
                  rel="noopener noreferrer external"
                >
                  consulta il codice sorgente
                </a>
              ) : (
                <span>Codice sorgente non disponibile</span>
              )}
            </Col>

            <Col as="dt" sm={3}>
              Prezzo:
            </Col>
            <Col as="dd" sm={9}>
              <Price price={tool?.price} />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="card-specific shadow1 my-2">
        <Card.Body>
          <Link
            to="/accessibility-dev/tools"
            className="btn btn-secondary shadow-sm w-100"
            state={{ location: "a11y" }}
          >
            Torna alla lista degli strumenti
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
