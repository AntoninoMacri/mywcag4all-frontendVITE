import { React, useState, useMemo } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useTitle } from "../hooks/HookTitle";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postUpdateWebsiteSections } from "../service/api/api.websites";
import { updateWebsiteResults } from "../store/websiteSlice";

export default function PageA11yWcagGuidelineList(props) {
  const [wcag1, setWcag1] = useState(false);
  const [wcag2, setWcag2] = useState(false);
  const [wcag3, setWcag3] = useState(false);
  const [wcag4, setWcag4] = useState(false);
  const website = useSelector((state) => state.website.website);
  const sections = useSelector((state) => state.website.website.sections);
  useTitle("Controllo sezioni WCAG | Dashboard | Accessibilità | MyWcag4All");
  const dispatch = useDispatch();

  const onClickHandler = (event) => {
    const section = Number(event.target.dataset.section);
    const value = event.target.checked;
    switch (Number(section)) {
      case 1:
        setWcag1(value);
        break;

      case 2:
        setWcag2(value);
        break;

      case 3:
        setWcag3(value);
        break;

      case 4:
        setWcag4(value);
        break;

      default:
        break;
    }
  };

  const saveAndUpdateSections = () => {
    postUpdateWebsiteSections(website._id, website.sections).then((res) => {
    }).catch((err) => {
      console.log("error");
    });

  }

  const procede = useMemo(() => {
    if (wcag1 && wcag2 && wcag3 && wcag4) {
      return (
        <Link
          to="/accessibility-dev/a11y/result"
          className="btn btn-success w-100 mt-3 shadow"
          state={{ location: "a11y" }}
          onClick={saveAndUpdateSections}
        >
          Salva e guarda i risultati
        </Link>
      );
    } else {
      return (
        <span className="btn btn-success w-100 disabled mt-3 shadow">
          Controlla le sezioni WCAG prima di procedere
        </span>
      );
    }
  }, [wcag1, wcag2, wcag3, wcag4]);

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
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title
        title={
          'Sezioni WCAG per il sito "' +
          website.name +
          '"'
        }
        className="title-a11y"
      />

      <Row>
        {
          sections?.map((section, index) => {
            return (
              <Col sm={3} className="d-flex align-items-stretch">

                <Card className="card-specific shadow-sm">
                  <Card.Header as="h2" className="h3 border-bottom">
                    Sezione WCAG {section.index}
                  </Card.Header>
                  <Card.Body>
                    {section.description}
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      to={"/accessibility-dev/a11y/wcag-guidelines/" + section.index}
                      className="btn btn-primary"
                      state={{ location: "a11y" }}
                    >
                      Vai alla checklist dei criteri della sezione {section.index}
                    </Link>
                    <Form.Group className="mt-3">
                      <Form.Check
                        type="checkbox"
                        label={"Sezione " + section.index + " controllata"}
                        id={"section-" + section.index}
                        onClick={onClickHandler}
                        data-section={section.index}
                      />
                    </Form.Group>
                  </Card.Footer>
                </Card>
              </Col>
            )
          })
        }
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="main-card shadow1">
            {procede}
            <Link
              to="/accessibility-dev/a11y/choice"
              className="btn btn-secondary w-100 mt-3"
              state={{ location: "a11y" }}
              onClick={saveAndUpdateSections}
            >
              Salva e torna alla Dashboard
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
