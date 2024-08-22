import { React } from "react";
import Container from "../components/container/Container";
import WebsiteForm from "../components/website-form/WebsiteForm";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import { useLocation } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";

export default function PageWebsiteDelete(props) {

    const location = useLocation();
    const currWebsiteName = location.state?.name;
    useTitle("Elimina un sito | I miei siti | Accessibilità | MyWcag4All");

  const breadcrumb_pages = [
    {
      page: "Home - I miei siti",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
        page: `Eliminazione sito ${currWebsiteName}`,
        url: "/accessibility-dev/websites/delete",
        isCurrent: true,
        state: "websites",
      }
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title={props.title} className="title-a11y" />

      <WebsiteForm type="delete" name={currWebsiteName}/>

   
    </Container>
  );
}
