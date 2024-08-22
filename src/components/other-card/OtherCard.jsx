import * as React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const OtherCard = (props) => {
  return (
    <Card>
      <Card.Header>
        <h3>{props.name}</h3>
      </Card.Header>
      <Card.Body>
        <div className="row">
          <div className="col-sm-3">
            <p>{props.description}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">
            <h4>Tipologia:</h4>
          </div>
          <div className="col-sm-3">
            <p>{props.type}</p>
          </div>
        </div>

        <Button href="#">Visualizza il documento</Button>
      </Card.Body>
    </Card>
  );
};

export default OtherCard;
