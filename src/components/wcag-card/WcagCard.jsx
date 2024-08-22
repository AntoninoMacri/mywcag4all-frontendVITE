import * as React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "../container/Container";

export default function WcagCard(props) {
  return (
    <Container>
      <Card>
        <Card.Header>
          <h3>
            {props.name} / {props.number}{" "}
          </h3>
        </Card.Header>
        <Card.Body>
          <Form.Check type="checkbox" label="Cliccami" />

          <div className="row">
            <div className="col-sm-3">
              <p>{props.level}</p>
            </div>
          </div>

          <Button>Visualizza spiegazione della lineaguida</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
