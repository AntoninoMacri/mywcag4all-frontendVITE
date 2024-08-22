import { React } from "react";
import Container from "../components/container/Container";
import WebsiteForm from "../components/website-form/WebsiteForm";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import { useTitle } from "../hooks/HookTitle";

export default function PageWebsiteCreate(props) {


  const breadcrumb_pages = [
    {
      page: "Home - I miei siti",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
        page: `Creazione di un nuovo sito`,
        url: "/accessibility-dev/websites/create",
        isCurrent: true,
        state: "websites",
      }
  ];
  useTitle("Inserisci un sito | I miei siti | Accessibilità | MyWcag4All");

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title={props.title} className="title-a11y" />

      <WebsiteForm type="create" action="Inserisci un nuovo sito"/>

   
    </Container>
  );
}
