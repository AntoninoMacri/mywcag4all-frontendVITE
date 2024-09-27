import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { patchUpdateWebsite, postDeleteWebsite, postCreateWebsite } from "../../service/api/api.websites";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { removeWebsite, setWebsite as setWebsiteDisp, setFilters, setFilteredTestData } from "../../store/websiteSlice";
import { useNavigate } from "react-router-dom";
import WebsiteFormLanding from "../website-form-landing/WebsiteFormLanding";
import { Link } from "react-router-dom";

export default function WebsiteForm(props) {
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState(false);
  const [landing, setLanding] = useState(false);
  const [operation, setOperation] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _website = useSelector((state) => state.website.website);
  const [website, setWebsite] = useState(_website);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: props.type === "update" ? website : {},
  });

  useEffect(() => {
    if (props.type === "update" && params.websiteid) {
      fetchWebsiteData(params.websiteid); // Carica i dati del sito dal server
      dispatch(setFilters());
      dispatch(setFilteredTestData());
    } else {
      dispatch(setWebsiteDisp({}));
      dispatch(setFilters());
      dispatch(setFilteredTestData());
    }
  }, [params.websiteid, props.type, dispatch]);

  const fetchWebsiteData = async (id) => {
    try {
      const response = await patchUpdateWebsite(id); // Carica i dati del sito
      setWebsite(response);
      dispatch(setWebsiteDisp(response)); // Aggiorna lo stato Redux con i nuovi dati del sito
    } catch (error) {
      console.error("Errore nel caricamento dei dati del sito:", error);
    }
  };

  const onSubmit = (data) => {
    if (props.type === "create") {
      // Crea un nuovo sito web
      const website = {
        ...data,
        wcagLevel: "N.A.",
        score: 0,
        user: user?._id,
      };
      postCreateWebsite(website)
        .then(() => {
          setOperation("Inserimento sito avvenuto con successo!");
          setLanding(true);
        })
        .catch((err) => {
          setOperation("Errore");
          setError(err);
          setLanding(true);
        });
    } else if (props.type === "update") {
      patchUpdateWebsite(params.websiteid, data)
        .then(() => {
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

  const onSubmitOnlyDelete = () => {
    if (props.type === "delete") {
      dispatch(removeWebsite({}));
      postDeleteWebsite(params.websiteid)
        .then(() => {
          setOperation("Eliminazione sito avvenuta con successo!");
          setLanding(true);
        })
        .catch((err) => {
          setOperation("Errore");
          setError(err);
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
                  defaultValue={website?.name || "Nome"}
                  rules={{ required: "Il nome del sito è obbligatorio" }}
                  render={({ field }) => <Form.Control type="text" {...field} isInvalid={!!errors.name} />}
                />
                <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  <abbr title="Uniform Resource Locator">URL</abbr>
                </Form.Label>
                <Controller
                  name="url"
                  control={control}
                  defaultValue={website?.url || "Sito"}
                  rules={{ required: "L'URL del sito è obbligatorio" }}
                  render={({ field }) => <Form.Control type="text" {...field} isInvalid={!!errors.url} />}
                />
                <Form.Control.Feedback type="invalid">{errors.url?.message}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="w-100">
                  È un sito tenuto all’applicazione delle normative sull’accessibilità (
                  <a
                    className="default-anchor"
                    href="https://www.gazzettaufficiale.it/eli/id/2004/01/17/004G0015/sg"
                    rel="noreferrer external"
                    target="_blank"
                    hrefLang="it"
                  >
                    Legge Stanca
                  </a>
                  e
                  <a
                    className="default-anchor"
                    rel="noreferrer external prev"
                    target="_blank"
                    href="https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX%3A32016L2102"
                    hrefLang="en"
                  >
                    Direttiva <abbr title="Unione Europea">UE</abbr> 2102 del 2016
                  </a>
                  ) ?
                </Form.Label>
                <Controller
                  name="isPublic"
                  control={control}
                  defaultValue={website?.isPublic || false}
                  rules={{ validate: (value) => value === true || value === false }}
                  render={({ field }) => (
                    <>
                      <Form.Check
                        {...field}
                        type="radio"
                        label="Sì"
                        value={true}
                        checked={field.value === true}
                        onChange={() => field.onChange(true)}
                      />
                      <Form.Check
                        {...field}
                        type="radio"
                        label="No"
                        value={false}
                        checked={field.value === false}
                        onChange={() => field.onChange(false)}
                      />
                    </>
                  )}
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

      {!landing && props.type === "delete" && (
        <Card className="card-specific shadow1">
          <Card.Header as="h2" className="border-bottom">
            Confermi l'eliminazione del sito?
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmitOnlyDelete)}>
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
