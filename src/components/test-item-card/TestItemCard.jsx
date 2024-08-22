import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WcagLevels from "../wcag-levels/WcagLevels";
import TestCategory from "../test-type/TestCategory";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import { useDispatch } from "react-redux";
import { updateTest } from "../../store/websiteSlice";

export default function TestItemCard(props) {
  const [isApplicable, setIsApplicable] = useState(props.isApplicable);
  const [isMet, setIsMet] = useState(props.isMet);
  const dispatch = useDispatch();

  const onClickHandlerSwitch = (event) => {

    const tmpIsApplicable = event.target.checked;
    const tmpIsMet = tmpIsApplicable==false ? true : false;
    dispatch(updateTest({ testIndex: props.index, isMet: tmpIsMet, isApplicable: tmpIsApplicable }));

    if (isApplicable) {
      setIsApplicable(false);
      setIsMet(true);
    } else {
      setIsApplicable(true);
    }
  };

  const onClickHandlerCheckbox = (event) => {
    
    const tmpIsMet = event.target.checked;
    dispatch(updateTest({ testIndex: props.index, isMet: tmpIsMet, isApplicable: isApplicable }));

    if (isMet) {
      setIsMet(false);
    } else {
      setIsMet(true);
    }
  };


  return (
    <li
      key={props.index}
      className="test-item d-block flex-row justify-content-betweew w-100 px-1 my-2"
    >
      <Container>
        <Row>
          <Col md={12} lg={1} className="test-item-head align-self-center">
            <Badge bg="secondary" as="h3">
              Test {props.index}
            </Badge>
          </Col>
          <Col md={12} lg={5} className="align-self-center">
            <span className="visually-hidden">Nome del test: </span>
            <p className="p-0 m-0 bold6">{props.title} </p>
          </Col>
          <Col md={12} lg={1} className="text-center align-self-center">
            <span className="visually-hidden">
              Livello WCAG minimo associato al test:{" "}
            </span>
            <WcagLevels link="" level={props.wcagLevel} />
          </Col>
          <Col md={12} lg={1} className="text-center align-self-center">
            <TestCategory link="" category={props.category} />
          </Col>

          <Col md={12} lg={2} className="align-self-center">
            <Form className="d-inline-block">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  checked={isApplicable}
                  inline
                  type="switch"
                  label="Applicabile"
                  aria-label={`test ${props.index} applicabile`}
                  name={`applicable-${props.index}`}
                  id={`applicable-${props.index}`}
                  onChange={onClickHandlerSwitch}
                />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check
                  checked={isMet}
                  disabled={isApplicable ? false : true}
                  inline
                  type="switch"
                  label="Superato"
                  aria-label={`test ${props.index} superato`}
                  id={`passed-${props.index}`}
                  name={`passed-${props.index}`}
                  onChange={onClickHandlerCheckbox}
                />
              </Form.Group>
            </Form>
          </Col>

          <Col
            md={12}
            lg={2}
            className="d-flex justify-content-center align-self-center text-right"
          >
            <Link
              className="btn btn-outline-primary px-1 my-1 w-75"
              to={`${props.index}`}
              state={{ location: "a11y" }}
              rel="next"
            >
              Dettagli
            </Link>
          </Col>
        </Row>
      </Container>
    </li>
  );
}