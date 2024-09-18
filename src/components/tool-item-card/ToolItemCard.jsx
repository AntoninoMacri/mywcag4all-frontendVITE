import * as React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";

export default function ToolItemCard(props) {
  const types = props.types || [];

  return (
    <li key={props.id} className="item-card w-100 shadow-sm my-1">
      <Row>
        {/* Nome dello strumento */}
        <Col md={12} lg={5} className="align-self-center">
          <span className="visually-hidden show-md">Nome dello strumento: </span>
          <span className="px-1 m-0 bold6">{props.name}</span>
        </Col>

        {/* Tipologia dello strumento */}
        <Col md={12} lg={5} className="align-self-center text-center">
          <span className="visually-hidden">Tipologia dello strumento: </span>

          {types.map((type, index) => {
            return (
              <Badge key={index} as="span" bg="secondary" className="mx-1">
                {type}
              </Badge>
            );
          })}
        </Col>

        {/* Link ai dettagli */}
        <Col md={12} lg={2}>
          <Link
            className="btn btn-outline-primary my-1 w-100 align-self-center"
            to={`${props.id}`}
            state={{ name: props.name, location: "tools" }}
          >
            Dettagli
          </Link>
        </Col>
      </Row>
    </li>
  );
}
