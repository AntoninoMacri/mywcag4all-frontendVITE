import { React } from "react";
import Container from "../components/container/Container";
import WebsiteForm from "../components/website-form/WebsiteForm";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import { useLocation } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";

export default function PageWebsiteUpdate(props) {

    const location = useLocation();
    const currWebsiteName = location.state?.name;
    useTitle("Modifica un sito | I miei siti | Accessibilità | MyWcag4All");

  const breadcrumb_pages = [
    {
      page: "Home - I miei siti",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
        page: `Modifica dei dati del sito ${currWebsiteName}`,
        url: "/accessibility-dev/websites/delete",
        isCurrent: true,
        state: "websites",
      }
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="Aggiornamento dati" className="title-a11y" />

      <WebsiteForm type="update" action={`Modifica i dati del sito`} name={currWebsiteName}/>

   
    </Container>
  );
}
