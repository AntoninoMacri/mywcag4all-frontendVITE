import Card from "react-bootstrap/Card";
import Title from "../title/Title";
import { React, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

export default function ToolForm(props) {
  const [sended, setSended] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        Form.current,
        process.env.EMAILJS_PUB_KEY_ID
      )
      .then(
        (result) => {},
        (error) => {
          //console.log(error);
        }
      );

    setSended(true);
  };

  const onClickHandler = () => {
    setSended(false);
  };

  return (
    <>
      <a href={props.uid} className="visually-hidden">
        Salta la searchbox e vai alla lista di tools
      </a>
      <Card className="card-specific shadow1">
        <Card.Header>
          <Title title="Suggerisci uno strumento" className="title-tools" />
        </Card.Header>

        <Card.Body>
          {!sended && (
            <Form ref={Form} onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nome dello strumento</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  required
                  aria-required="true"
                  placeholder="Inserisci il nome dello strumento"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Url</Form.Label>
                <Form.Control
                  type="url"
                  name="url"
                  required
                  aria-required="true"
                  placeholder="Inserisci l'url del sito o della repo ufficiale"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Tipologia</Form.Label>
                <Form.Check
                  type="radio"
                  label="A pagamento"
                  name="pricing"
                  value="2"
                />
                <Form.Check
                  type="radio"
                  label="Versione di prova disponibile"
                  name="pricing"
                  value="1"
                />
                <Form.Check
                  type="radio"
                  label="Gratis"
                  name="pricing"
                  value="0"
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 my-2">
                Invia il suggerimento
              </Button>
            </Form>
          )}

          {sended && (
            <>
              <p>Suggerimento inviato con successo.</p>

              <Button
                to="/accessibility-dev/tools"
                className="btn btn-secondary w-100 mb-5"
                onClick={onClickHandler}
              >
                Invia un nuovo suggerimento
              </Button>
            </>
          )}
          <Link
            to="/accessibility-dev/tools"
            className="btn btn-secondary w-100 mb-2"
            state={{ location: "tools" }}
          >
            Torna alla lista degli strumenti
          </Link>
        </Card.Body>
      </Card>
    </>
  );
}
