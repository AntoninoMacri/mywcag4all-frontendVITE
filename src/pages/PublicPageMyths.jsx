import React, { useState, useEffect, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Note from "../components/note/Note";
import Title from "../components/title/Title";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { getMyths } from "../service/api/api.myths";

export default function PageMyths(props) {
  const [myths, setMyths] = useState([]);
  const [index, setIndex] = useState(0);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "Falsi miti e stereotipi",
      url: "/accessibility-dev/myths",
      isCurrent: true,
      state: "myths",
    },
  ];

  useTitle("Miti e stereotipi | MyWcag4All");

  useEffect(() => {
    getMyths()
      .then((res) => {
        //console.log("Fetched myths:", res); // Log dell'intera risposta
        if (Array.isArray(res) && res.length > 0) {
          // Stampa ogni mito per verificare la struttura
          //res.forEach((myth, index) => console.log(`Myth ${index}:`, myth));

          const validMyths = res.filter((myth) => myth._id && myth.title && myth.description);
          if (validMyths.length !== res.length) {
            console.warn("Some myths are missing required properties:", res);
          }
          const sorted_myths = validMyths.sort(() => Math.random() - 0.5);
          setMyths(sorted_myths);
        } else {
          console.warn("No myths data received or data is not in expected format:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching myths:", error);
      });
  }, []);

  const onClickHandler = (event) => {
    //console.log("Clicked item ID:", event.target.dataset.index); // Log ID dell'elemento cliccato
    setIndex(event.target.dataset.index);
  };

  const tabpanels = useMemo(
    () =>
      myths.map((element) => (
        <li key={element._id} className="my-3">
          <Card id={element._id} className="card-specific shadow1 my-5">
            <Card.Header as="h2" className="border-bottom">
              {element.title}
            </Card.Header>
            <Card.Body>{element.description}</Card.Body>
            <a className="visually-hidden" href="#container">
              Torna al contenuto principale
            </a>
          </Card>
        </li>
      )),
    [myths]
  );

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Card className="main-card shadow1">
        <Title title="Falsi miti e stereotipi" />
        <ul className="list-unstyled d-flex justify-content-around -flex-row flex-wrap">
          {myths.map((element) => {
            //console.log("Rendering note ID:", element._id); // Log ID per ogni nota
            return (
              <Note
                key={element._id} // Chiave unica per ogni componente Note
                href={element._id}
                title={element.title}
                description={element.description}
                onClick={onClickHandler}
                index={element._id}
                uid={element._id}
                color={element.index % 6}
              />
            );
          })}
        </ul>
      </Card>
      <ul className="list-unstyled">{tabpanels}</ul>
      <Card className="main-card shadow1 my-5">
        <Link className="btn btn-secondary w-100" to="/accessibility-dev/">
          Torna alla home.
        </Link>
      </Card>
    </Container>
  );
}
