import { React, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaSearch } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  updateTestFilterWord,
  updateTestFilterIsApplicable,
  updateTestFilterIsPassed,
  updateTestFilterLevel,
  updateTestFilterType,
  updateTestParentFilterTag,
  updateTestFilterTag,
  setFilters,
  updateTestFilterPage,
  setFilteredTestData,
} from "../../store/websiteSlice";

function SearchBar({ uid, updateFilters }) {

  const filters = useSelector((state) => state.website.website.filters);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleParentButtonClick = (event) => {
    const tag = event.target.dataset.tag;
    dispatch(updateTestFilterPage({ index: 1 }));
    dispatch(updateTestParentFilterTag({ tag: tag }));
    dispatch(updateTestFilterTag({ tag: null }));
    updateFilters();
  };

  const handleChildButtonClick = (event) => {
    const tag = event.target.dataset.tag;
    dispatch(updateTestFilterPage({ index: 1 }));
    dispatch(updateTestFilterTag({ tag: tag }));
    updateFilters();
  };

  const onChangeHandler = (event) => {
    const word = event.target.value;
    dispatch(updateTestFilterWord({ word: word }));
    updateFilters();
  };

  const handleReset = () => {
    dispatch(setFilters())
    dispatch(setFilteredTestData());
  };

  const onChangeHandlerCheckbox = (event) => {
    const name = event.target.name;
    const value = event.target.checked;

    switch (name) {
      case "passed":
        dispatch(updateTestFilterIsPassed({ value: value }));

        break;
      case "applicable":
        dispatch(updateTestFilterIsApplicable({ value: value }));
        break;
      default:
        break;
    }
    updateFilters();
  };

  const onChangeHandlerSelect = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "type":
        dispatch(updateTestFilterType({ value: value }));
        break;
      case "level":
        dispatch(updateTestFilterLevel({ value: value }));
        break;
      default:
        break;
    }
    updateFilters();
  };

  const buttonToDisplay = useMemo(() => {
    switch (filters.filter_parent_tag) {
      case "structure":
        return (
          <>
            <Col className="p-0 mr-1">
              <Button
                variant="primary"
                data-tag="html"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                HTML
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="forms"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Form
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="tables"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Tabelle
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="navigation"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Aiuti alla navigazione
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                data-tag="orientation"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Orientamento strutturale
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="primary"
                classdata-tag="separation"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Separazione
              </Button>
            </Col>

            <Col className="p-0 ml-1">
              <Button
                variant="primary"
                data-tag="link"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Link
              </Button>
            </Col>
          </>
        );

      case "presentation":
        return (
          <>
            <Col className="p-0 mr-1">
              <Button
                variant="success"
                data-tag="css"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                CSS
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="no-css"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                No CSS
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="images"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Immagini
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="colors"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Colori
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="success"
                data-tag="layout"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Layout
              </Button>
            </Col>

            <Col className="p-0 mr-1">
              <Button
                variant="success"
                data-tag="animations"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Animazioni
              </Button>
            </Col>
          </>
        );

      case "behavior":
        return (
          <>
            <Col className="p-0 mr-1">
              <Button
                variant="warning"
                data-tag="dynamic-elements"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Elementi dinamici
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="keyboard"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Tastiera
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="input"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Modalità di input
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="errors"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Errori
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="warning"
                data-tag="usage-time"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Tempo di utilizzo
              </Button>
            </Col>

            <Col className="p-0 ml-1">
              <Button
                variant="warning"
                data-tag="authentication"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Autenticazione
              </Button>
            </Col>
          </>
        );

      case "contents":
        return (
          <>
            <Col className="p-0">
              <Button
                variant="danger"
                data-tag="text"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Testo
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="images"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Immagini
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="charts"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Grafici
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="data"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Dati
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="media"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Media
              </Button>
            </Col>

            <Col className="p-0 mx-1">
              <Button
                variant="danger"
                data-tag="cognitive-overload"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Sovraccarico cognitivo
              </Button>
            </Col>

            <Col className="p-0">
              <Button
                variant="danger"
                data-tag="disorientation"
                onClick={handleChildButtonClick}
                className="w-100 h-100 shadow-sm"
              >
                Disorientamento
              </Button>
            </Col>
          </>
        );

      case "waria":
        return (
          <>
            <Col className="p-0">
              <Button
                variant="info"
                className="w-100 h-100 shadow-sm"
                data-tag="waria-states"
                onClick={handleChildButtonClick}
              >
                Stati
              </Button>
            </Col>

            <Col className="mx-1">
              <Button
                variant="info"
                className="w-100 h-100 shadow-sm"
                data-tag="waria-roles"
                onClick={handleChildButtonClick}
              >
                Ruoli
              </Button>
            </Col>

            <Col className="p-0">
              <Button
                variant="info"
                className="w-100 h-100 shadow-sm"
                data-tag="waria-properties"
                onClick={handleChildButtonClick}
              >
                Proprietà
              </Button>
            </Col>
          </>
        );

      default:
        return <> </>;
    }
  }, [filters]);

  const displayControls = useMemo(() => {
    return (
      <>
        <Row className="px-0 w-100">
          <Col lg={3}>
            <Form.Label className="visually-hidden" htmlFor="inputquery">
              Cerca uno o più test
            </Form.Label>
            <Form.Control
              placeholder="Cerca..."
              name="inputquery"
              id="inputquery"
              onKeyUp={onChangeHandler}
              defaultValue={filters.filter_word}
            />
          </Col>

          <Col lg={2} className="my-1">
            <Form.Check
              inline
              defaultChecked={true}
              label="Applicabile"
              type="checkbox"
              name="applicable"
              id="applicable"
              onClick={onChangeHandlerCheckbox}
              value={filters.filer_isApplicable}
            />
            <Form.Check
              inline
              type="checkbox"
              label="Superato"
              id="passed"
              name="passed"
              onClick={onChangeHandlerCheckbox}
              value={filters.filter_isPassed}
            />
          </Col>

          <Col lg={3} className="my-1">
            <Form.Label className="visually-hidden" htmlFor="test_level">
              Livello WCAG del test
            </Form.Label>
            <Form.Select
              name="level"
              id="test_level"
              onChange={onChangeHandlerSelect}
            >
              <option value="">Livello</option>
              <option value="A" selected={filters.filter_level === "A"}>
                A
              </option>
              <option value="AA" selected={filters.filter_level === "AA"}>
                AA
              </option>
              <option value="AAA" selected={filters.filter_level === "AAA"}>
                AAA
              </option>
              <option value="N.A." selected={filters.filter_level === "N.A."}>
                Non specificato
              </option>
            </Form.Select>
          </Col>

          <Col lg={3} className="my-1">
            <Form.Label className="visually-hidden" htmlFor="test_type">
              Tipologia di test
            </Form.Label>
            <Form.Select
              name="type"
              id="test_type"
              onChange={onChangeHandlerSelect}
            >
              <option value="">Tipologia di test</option>
              <option value="A" selected={filters.filter_type === "A"}>
                Automatico
              </option>
              <option value="S" selected={filters.filter_type === "S"}>
                Semiautomatico
              </option>
              <option value="M" selected={filters.filter_type === "M"}>
                Manuale
              </option>
            </Form.Select>
          </Col>

          <Col lg={1}>
            <Button
              type="reset"
              variant="outline-secondary w-100 px-0 my-1"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Col>
        </Row>
      </>
    );
  }, [filters]);

  return (
    <>
      <a href={uid} className="visually-hidden">
        Salta la searchbox e vai alla lista di test
      </a>

      <Card className="main-card mb-5 shadow-sm pt-0">
        <Card.Header as="h2" className="bg-neutral text-center py-2">
          <span className="visually-hidden">Barra di ricerca</span>
          <FaSearch alt="" />
        </Card.Header>

        <Form
          className="m-0 mt-3 px-0"
          onSubmit={handleSubmit}
          role="search"
          aria-controls="tests-list"
        >
          {displayControls}

          <Container className="mb-2 mt-4 border-top pt-4" role="toolbar">
            <Row
              className="p-0 d-flex justify-content-between"
              arial-control="test-btns-list"
            >
              <Col className="mr-3 p-0">
                <Button
                  variant="primary"
                  className="w-100 shadow-sm"
                  data-tag="structure"
                  onClick={handleParentButtonClick}
                >
                  Struttura
                </Button>
              </Col>
              <Col className="mx-3 p-0">
                <Button
                  variant="success"
                  className="w-100 shadow-sm"
                  data-tag="presentation"
                  onClick={handleParentButtonClick}
                >
                  Presentazione
                </Button>
              </Col>

              <Col className="mx-3 p-0">
                <Button
                  variant="warning"
                  className="w-100 shadow-sm"
                  data-tag="behavior"
                  onClick={handleParentButtonClick}
                >
                  Comportamento
                </Button>
              </Col>

              <Col className="mx-3 p-0">
                <Button
                  variant="danger"
                  className="w-100 shadow-sm"
                  data-tag="contents"
                  onClick={handleParentButtonClick}
                >
                  Contenuti
                </Button>
              </Col>
              <Col className="ml-3 p-0">
                <Button
                  variant="info"
                  className="w-100 shadow-sm"
                  data-tag="waria"
                  onClick={handleParentButtonClick}
                >
                  W-ARIA
                </Button>
              </Col>
            </Row>
            <Row className="pt-3" id="test-btns-list">
              {buttonToDisplay}
            </Row>
          </Container>
        </Form>
      </Card>
    </>
  );
}

export default SearchBar;
