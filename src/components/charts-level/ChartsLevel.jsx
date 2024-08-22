import { React } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "react-circular-progressbar/dist/styles.css";
import Badge from "react-bootstrap/esm/Badge";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

function ChartsLevel({
  applicableTest,
  notApplicableTest,
  passedTest,
  notPassedTest,
  isArchived,
  completed,
  toComplete,
  level,
  total,
}) {
  const data1 = [
    { name: "effettuati", value: completed },
    { name: "non effettuati", value: toComplete },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <>
      <Row className="mb-5">
        <h3>
          <Badge bg="primary">
            Livello {level}: {isArchived ? "raggiunto" : "non raggiunto"}{" "}
          </Badge>
        </h3>
        <Col sm={6}>
          <h4 className="bold7 mt-4 p-0">Specifica dei test</h4>
          {isArchived ? (
            <>
              <p>Sono stati effettuati con successo tutti i {total} test.</p>
            </>
          ) : (
            <>
              <Row as="dl">
                <Col as="dt" sm={9}>
                  Test effettuati con successo:{" "}
                </Col>
                <Col as="dd" sm={3}>
                  {passedTest}.
                </Col>

                <Col as="dt" sm={9}>
                  Test non effettuati:
                </Col>
                <Col as="dd" sm={3}>
                  {notPassedTest}.
                </Col>

                <Col as="dt" sm={9}>
                  Test non applicabili:
                </Col>
                <Col as="dd" sm={3}>
                  {notApplicableTest}.
                </Col>

                <Col as="dt" sm={9}>
                  Test applicabili:
                </Col>
                <Col as="dd" sm={3}>
                  {applicableTest}.
                </Col>

                <Col as="dt" sm={9}>
                  Test totali:
                </Col>

                <Col as="dd" sm={3}>
                  {total}.
                </Col>
              </Row>
            </>
          )}
        </Col>

        <Col sm={6} className="text-center">
          <CircularProgressbar
            styles={buildStyles({
              pathColor: "#0D6EFD",
              textColor: "black",
              textSize: "6px",
              fontWeight: "bold"
            })}
            className="w-50"
            value={passedTest}
            maxValue={applicableTest}
            text={`${parseInt((passedTest * 100) / applicableTest)}% test superati`}

          />
        </Col>
      </Row>
      <hr aria-hidden="true" alt=""/>
    </>
  );
}

export default ChartsLevel;
