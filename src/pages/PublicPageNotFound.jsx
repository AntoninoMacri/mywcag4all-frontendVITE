import * as React from "react";
import Container from "../components/container/Container";
import ContainerB from "react-bootstrap/Container";
import notfoundpic from "../img/404.png";
import { Link } from "react-router-dom";
import Title from "../components/title/Title";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux"; // Importa useSelector per ottenere lo stato di autenticazione
import { selectAuth } from "../store/authSlice"; // Importa il selettore per l'autenticazione

export default function PublicPageNotFound(props) {
  // Ottieni lo stato di autenticazione dal Redux store
  const { isAuthenticated } = useSelector(selectAuth);

  useTitle("Pagina non trovata | MyWcag4All");

  return (
    // Rendi condizionale il rendering del contenuto solo se l'utente non è autenticato
    !isAuthenticated && (
      <Container>
        <Title title="Pagina non trovata" className="title-a11y" />

        <ContainerB className="text-center">
          <h2>
            <Link className="default-anchor" to="/accessibility-dev/">
              Torna alla home.
            </Link>
          </h2>
          <img id="notfoundpic" src={notfoundpic} alt="Pagina non trovata" />
          <p>
            <small>
              <a href="https://storyset.com/web" lang="en">
                Web illustrations by Storyset
              </a>
            </small>
          </p>
        </ContainerB>
      </Container>
    )
  );
}
