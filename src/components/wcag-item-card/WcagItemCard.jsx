import React, { useState } from "react";
import WcagLevels from "../wcag-levels/WcagLevels";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import { useDispatch } from "react-redux";
import { updateCriterion } from "../../store/websiteSlice";
import { getIndexes } from "../../utils/indexManager";

export default function WcagItemCard(props) {
  const [isApplicable, setIsApplicable] = useState(props.isApplicable);
  const [isMet, setIsMet] = useState(props.isMet);
  const [indexes] = useState(getIndexes(props.index));
  const dispatch = useDispatch();

  const onApplicableChange = (event) => {
    const tmpIsApplicable = event.target.checked;
    setIsApplicable(tmpIsApplicable);

    // Se non applicabile, imposta isMet a true
    let tmpIsMet = isMet;
    if (!tmpIsApplicable) {
      tmpIsMet = true;
      setIsMet(tmpIsMet);
    }

    dispatch(
      updateCriterion({
        criterionIndex: props.index,
        guidelineIndex: indexes.guidelineIndex,
        sectionIndex: indexes.sectionIndex,
        isMet: tmpIsMet,
        isApplicable: tmpIsApplicable,
      })
    );
  };

  const onMetChange = (event) => {
    const tmpIsMet = event.target.checked;
    setIsMet(tmpIsMet);

    dispatch(
      updateCriterion({
        criterionIndex: props.index,
        guidelineIndex: indexes.guidelineIndex,
        sectionIndex: indexes.sectionIndex,
        isMet: tmpIsMet,
        isApplicable: isApplicable,
      })
    );
  };

  return (
    <li
      key={props.id}
      className="test-item d-block flex-row border justify-content-between w-100 align-items-center p-1 mb-5"
    >
      <Row className="d-flex align-items-center py-0 wcag-item">
        <Col md={12} lg={2} className="d-inline-block align-self">
          <Badge bg="secondary" as="h3">
            Criterio {props.index}
          </Badge>
        </Col>
        <Col md={12} lg={6} className="d-inline-block align-self">
          <h3 className="h5">
            <a
              className="default-anchor"
              hrefLang={"en"}
              href={`${props.url}`}
              target="_blank"
              rel="external noreferrer"
            >
              {props.title}
            </a>
          </h3>
        </Col>

        <Col md={12} lg={1} className="text-right align-self">
          <WcagLevels link="" level={props.wcaglevel} />
        </Col>

        <Col md={12} lg={1} className="text-right align-self">
          <span className="visually-hidden">È un criterio contenuto nella dichiarazione di accessibilità: </span>
          {props.isAgid && <Badge>AGID</Badge>}
        </Col>

        <Col md={12} lg={2} className="d-inline-block align-self">
          <Form className="d-inline-block">
            <Form.Group className="mb-3" controlId={`formApplicable-${props.id}`}>
              <Form.Check
                checked={isApplicable}
                inline
                type="switch"
                id={`applicable-${props.id}`}
                label="Applicabile"
                aria-label={`criterio ${props.index} applicabile`}
                onChange={onApplicableChange}
              />
            </Form.Group>

            <Form.Group controlId={`formPassed-${props.id}`} className="mt-0">
              <Form.Check
                inline
                checked={isMet}
                disabled={!isApplicable}
                type="switch"
                label="Superato"
                aria-label={`criterio ${props.index} superato`}
                id={`passed-${props.id}`}
                onChange={onMetChange}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </li>
  );
}
