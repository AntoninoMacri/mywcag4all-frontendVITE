import { React } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { FaVuejs, FaAngular, FaReact } from "react-icons/fa";
import { useTitle } from "../hooks/HookTitle";

export default function PageA11yTips(props) {
  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Accessibilità",
      url: "/accessibility-dev/a11y",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Consigli",
      url: "/accessibility-dev/a11y/tips",
      isCurrent: true,
      state: "a11y",
    },
  ];

  useTitle("Consigli | Dashboard | Accessibilità | MyWcag4All");

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="Qualche consiglio utile" className="title-a11y" />

      <Card className="card-specific shadow1">
        <Card.Header as="h3" className="border-bottom">
          Cos'è l'accessibilità ?
        </Card.Header>
        <Card.Body>
          <blockquote className="blockquote" cite="https://www.w3c.it/wai/">
            Per <dfn>accessibilità</dfn> web si indica la capacità di un sito
            web di essere acceduto efficacemente (alla sua interfaccia e al suo
            contenuto) da utenti diversi in differenti contesti. Rendere un sito
            web accessibile significa permettere l'accesso all'informazione
            contenuta nel sito anche a persone con disabilità di diverso tipo e
            a chi dispone di strumenti hardware e software limitati.
          </blockquote>
          <p>
            Scopri di più sull'
            <a className="default-anchor" hrefLang={"it"} href="https://web.math.unipd.it/accessibility/index.html#accessibilita">
              accessibilità 
            </a>
            {" "}e sulle{" "}
            <a className="default-anchor" hrefLang={"it"} href="https://web.math.unipd.it/accessibility/index.html#norme">
              normative
            </a>{" "}
            che la riguardano.
          </p>
        </Card.Body>

        <Card.Header as="h3" className="mt-3 border-bottom">
          Cosa puoi fare per occuparti di accessibilità?
        </Card.Header>
        <Card.Body>
          <ul>
            <li>
              <h4>Informati</h4>
              <p>
                Consulta le strategie e gli standard da adottare nel{" "}
                <a className="default-anchor" hrefLang={"en"} href="https://www.w3.org/WAI/">
                  sito ufficiale{" "}
                  <abbr title="Web Accessibility Initiative">WAI</abbr>
                </a>
                .
              </p>
            </li>
            <li>
              <h4>Utilizza gli strumenti adatti</h4>
              <p>
                Fin dalla prima riga di codice puoi lavorare su un ambiente che
                facilita la creazione di un prodotto accesibile.
                Scopri gli strumenti che puoi utilizzare, dall'inizio alla fine
                del processo di sviluppo sviluppo, visitando la{" "}
                <Link
                  to={"/accessibility-dev/tools"}
                  state={{ location: "tools" }}
                  className="default-anchor"
                >
                  sezione del sito dedicata
                </Link>
                .
              </p>
            </li>
            <li>
              <h4>Non pensarci all'ultimo</h4>
              <p>
                L'accessibilità va fin da subito integrata nella progettazione e
                nello sviluppo di un prodotto. Trattare questo importante
                aspetto nella fase finale di un progetto è controproducente:
                l'adeguamento ai più recenti standard potrebbe infatti
                compromettere anche in maniera significativa il lavoro svolto.
              </p>
            </li>
            <li>
              <h4>Se utilizzi framework o librerie</h4>
              <p>
                Se utilizzi un framework o una libreria per lo sviluppo del tuo
                prodotto rivolgiti quanto prima alla documentazione ufficiale
                per comprendere come e se l'accessibilità viene affrontata ed
                implementata. Di seguito trovi qualche riferimento utile.
              </p>
              <ul className="framework-list">
                <li>
                  <h5>
                    <FaReact alt="" />
                    <a className="default-anchor" hrefLang={"en"} href="https://reactjs.org/docs/accessibility.html#gatsby-focus-wrapper">
                      React
                    </a>
                  </h5>
                </li>
                <li>
                  <h5>
                    <FaAngular alt="" />
                    <a className="default-anchor" hrefLang={"en"} href="https://angular.io/guide/accessibility">Angular</a>
                  </h5>
                </li>
                <li>
                  <h5>
                    <FaVuejs alt="" />
                    <a className="default-anchor" hrefLang={"en"} href="https://vuejs.org/guide/best-practices/accessibility.html#accessibility">
                      Vue
                    </a>
                  </h5>
                </li>
              </ul>
            </li>
          </ul>

          <Link
            to="/accessibility-dev/a11y/choice"
            className="btn btn-secondary w-100 mt-4 mb-2"
            state={{ location: "a11y" }}
          >
            Torna alla Dashboard
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
