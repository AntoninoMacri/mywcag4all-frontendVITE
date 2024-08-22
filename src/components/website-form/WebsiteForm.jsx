import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "../../service/client";
import WebsiteFormLanding from "../website-form-landing/WebsiteFormLanding";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { postUpdateWebsite, postDeleteWebsite, postCreateWebsite } from "../../service/api/api.websites";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { removeWebsite, setWebsite as setWebsiteDisp, setFilters, setFilteredTestData } from "../../store/websiteSlice";
import { useNavigate } from "react-router-dom";

export default function WebsiteForm(props) {
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(false);
  const [landing, setLanding] = useState(false);
  const [operation, setOperation] = useState("");
  const params = useParams();
  const dispatch = useDispatch();

  const _website = useSelector((state) => state.website.website);
  const [website, setWebsite] = useState(_website);

  const { register, handleSubmit, control } = useForm({
    defaultValues: props.type === "update" ? website : {},
  });

  useEffect(() => {
    if (props.type === "update") {
      const id = params.websiteid;
      dispatch(setWebsiteDisp({ id: id }));
      dispatch(setFilters());
      dispatch(setFilteredTestData());
    } else {
      dispatch(setWebsiteDisp({}));
      dispatch(setFilters());
      dispatch(setFilteredTestData());
    }
  }, []);

  const onSubmit = (data, event) => {
    if (props.type === "create") {
      //create a new website
      const website = {
        ...data,
        level: "N.A.",
        score: 0,
        user: user?._id,
      };
      console.log("website: ", website);
      postCreateWebsite(website)
        .then((res) => {
          setOperation("Inserimento sito avvenuto con successo!");
          setLanding(true);
        })
        .catch((err) => {
          setOperation("Errore");
          setError(err);
          setLanding(true);
        });
    } else if (props.type === "update") {
      postUpdateWebsite(params.websiteid, data)
        .then((res) => {
          setOperation("Aggiornamento dati del sito avvenuto con successo!");
          setLanding(true);
        })
        .catch((err) => {
          setOperation("Errore");
          setError(err);
          setLanding(true);
        });
    }
  };

  const onSubmitOnlyDelete = (data, event) => {
    if (props.type === "delete") {
      dispatch(removeWebsite({}));
      postDeleteWebsite(params.websiteid)
        .then((res) => {
          setOperation("Eliminazione sito avvenuta con successo!");
          setLanding(true);
        })
        .catch((err) => {
          setOperation("Errore");
          setError(landing);
          setLanding(true);
        });
    }
  };

  return (
    <>
      {!landing && (props.type === "update" || props.type === "create") && (
        <Card className="card-specific shadow1">
          <Card.Header as="h2" className="border-bottom">
            {props.action}
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3">
                <Form.Label className="w-100">Nome del sito</Form.Label>

                <Controller
                  name="name"
                  control={control}
                  defaultValue={website?.name}
                  placeholder="Inserisci il nome del tuo sito..."
                  rules={{ required: true }}
                  render={({ field }) => <Form.Control type="text" {...field} />}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  <abbr title="Uniform Resource Locator">URL</abbr>
                </Form.Label>

                <Controller
                  name="url"
                  control={control}
                  defaultValue={String(website?.url)}
                  placeholder="Inserisci l'URL del tuo sito..."
                  rules={{ required: true }}
                  render={({ field }) => <Form.Control type="text" {...field} />}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  È un sito tenuto all’applicazione delle normative sull’accessibilità (
                  <a
                    className="default-anchor"
                    href="https://www.gazzettaufficiale.it/eli/id/2004/01/17/004G0015/sg"
                    rel="noreferrer external"
                    target="_blank"
                    hrefLang={"it"}
                  >
                    Legge Stanca
                  </a>
                  e
                  <a
                    className="default-anchor"
                    rel="noreferrer external prev"
                    target="_blank"
                    href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32016L2102"
                    hrefLang={"en"}
                  >
                    Direttiva <abbr title="Unione Europea">UE</abbr> 2102 del 2016
                  </a>
                  ) ?
                </Form.Label>
                <Form.Check
                  name="group1"
                  id="website_is_pa_yes"
                  label="Si"
                  type="radio"
                  defaultChecked={website?.isPublic ? true : false}
                />
                <Form.Check
                  name="group1"
                  id="website_is_pa_no"
                  label="No"
                  type="radio"
                  defaultChecked={!website?.isPublic ? true : false}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100 shadow1">
                Salva
              </Button>

              <Link
                className="btn btn-secondary w-100 mt-2"
                data-btntype="delete"
                to={"/accessibility-dev/websites/"}
                state={{ location: "websites", name: props.name }}
              >
                Torna ai tuoi siti
              </Link>
            </Form>
          </Card.Body>
        </Card>
      )}

      {landing && <WebsiteFormLanding action={operation} />}

      {landing == false && props.type === "delete" && (
        <Card className="card-specific shadow1">
          <Card.Header as="h2" className="border-bottom">
            Confermi l'eliminazione del sito?
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmitOnlyDelete)} action="">
              <Button type="submit" variant="primary" className="w-100">
                Conferma eliminazione
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
