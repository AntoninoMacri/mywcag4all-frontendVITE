import { React, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { useSelector, useDispatch } from "react-redux";
import { updateToolFilterWord, updateToolFilterType, filterTestData, resetToolFilter } from "../../store/slice.tools";

function SearchBarTools(props) {
  const tools = useSelector((state) => state.tools);
  const toolsClasses = useSelector((state) => state.tools.classes); // Potrebbe essere il tuo elenco di tipi

  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    dispatch(resetToolFilter());
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "type":
        dispatch(updateToolFilterType({ value: value }));
        break;
      case "word":
        dispatch(updateToolFilterWord({ value: value }));
        break;
      default:
        break;
    }

    dispatch(filterTestData());
  };

  const getClasses = useMemo(() => {
    if (!Array.isArray(toolsClasses)) {
      return null; // o un fallback appropriato
    }

    return toolsClasses.map((_class, index) => (
      <option id={`tool_class_${index}`} key={`tool-class-${index}`} value={_class.name}>
        {_class.name}
      </option>
    ));
  }, [toolsClasses]);

  return (
    <Card className="main-card mb-5 shadow1">
      <Form className="d-flex" onSubmit={handleSearch} role="search" aria-controls="tools-list">
        <Container>
          <Row>
            <Col md={12} lg={3} className="px-1 my-1">
              <Form.Label className="visually-hidden" htmlFor="type">
                Tipologia
              </Form.Label>
              <Form.Select name="type" id="type" onChange={handleChange} defaultValue={tools.filter_class}>
                <option value="">Tipologia</option>
                {getClasses}
              </Form.Select>
            </Col>

            <Col md={12} lg={6} className="px-1 my-1">
              <Form.Label className="visually-hidden" htmlFor="word">
                Cerca per nome
              </Form.Label>
              <Form.Control
                placeholder="Cerca per nome..."
                name="word"
                id="word"
                onChange={handleChange}
                defaultValue={tools.filter_word}
              />
            </Col>

            <Col md={12} lg={3} className="px-1 my-1">
              <Button variant="outline-secondary" value="Cerca" type="reset" className="w-100" onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Card>
  );
}

export default SearchBarTools;
