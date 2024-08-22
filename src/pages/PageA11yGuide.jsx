import { React } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";

export default function PageA11yGuide(props) {
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
      page: "Istruzioni",
      url: "/accessibility-dev/a11y/tips",
      isCurrent: true,
      state: "a11y",
    },
  ];

  useTitle("Istruzioni | Dashboard | Accessibilità | MyWcag4All");

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="Qualche consiglio utile" className="title-a11y" />

      <Card className="card-specific shadow1">
        <Card.Header as="h2" className="border-bottom">
          I Test
        </Card.Header>
        <Card.Body className="text-justify">
          <p>
            In questa sezione potrai consultare la lista dei test esaustivi.
            Ogni test presente nella lista lista potrà essere impostato come
            applicabile o meno, in base alla natura del sito che stai testando.
            Qualora il test sia applicabile, potrai anche tenere traccia del suo
            effettivo superamento impostando il relativo controllo.
          </p>
          <p>
            Dei test in lista potrai consulare la tipologia (manuale,
            semiautomatico, automatico) ed il livello minimo WCAG associato.
            Potrai inoltre navigare verso una pagina di dettagli del test
            cliccando l'apposito bottone.
          </p>
          <p>
            Ad ogni test corrisponde un punteggio associato: un test automatico
            vale 1 punto, un test semiautomatico 2 punti, un test manuale 3
            punti.
          </p>
        </Card.Body>

        <Card.Header as="h2" className="mt-3 border-bottom">
          La checklist dei criteri WCAG
        </Card.Header>
        <Card.Body className="text-justify">
          <p>
            All'interno di ogni sezione troverai la lista di criteri ufficiali
            ad essa associati. Anche in questo caso è possibile impostare per
            ogni criterio la sua applicabilità ed il suo superamento.
          </p>
          <p>
            In base ai test effettuati la checklist dei criteri ufficiali WCAG
            sarà <strong>precompilata in automatico</strong>.
          </p>
          <p>
            Dei criteri in lista potrai consulare il livello WCAG associato; è
            inoltre segnalato se un criterio appartiene al{" "}
            <a
              className="default-anchor"
              href="https://trasparenza.agid.gov.it/moduli/downloadFile.php?file=oggetto_allegati/19356908110O__OAllegato+2+-+Modello+di+autovalutazione.pdf"
              rel="external noreferrer"
              target="_blank"
              hrefLang={"it"}
            >
              {" "}
              modello di autovalutazione{" "}
              <abbr tilte="Agenzia per l'Italia digitale">AGID</abbr>
            </a>
            .
          </p>
          <p>
            Prima di procedere con la visualizzazione dei risultati finali è
            bene ricontrollare tutte le sezioni WCAG: potrai visualizzare la pagina dei risultati solo spuntando tutti i checkbox, ogni uno dei quali è associato ad una delle quattro sezioni.
          </p>
          <p>
            Nella pagina dei risultati finali verranno riportati i principali
            obiettivi raggiunti: conformità del sito, punteggio totale e test
            effettuati. Potrai inoltre trovare informazioni dettagliate su ogni
            livello WCAG e sulla composizione del punteggio ottenuto.
          </p>

          <Link
            to="/accessibility-dev/a11y/choice"
            className="btn btn-secondary w-100  mt-5 mb-2"
            state={{ location: "a11y" }}
          >
            Torna alla Dashboard
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
