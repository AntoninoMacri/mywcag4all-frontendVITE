import { React } from "react";
import Container from "../components/container/Container";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ToolForm from "../components/tool-form/ToolForm";
import { useTitle } from "../hooks/HookTitle";

export default function PageToolsHint(props) {
  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Lista strumenti e risorse",
      url: "/accessibility-dev/tools",
      isCurrent: true,
      state: "tools",
    },
  ];

  useTitle("Consiglia uno strumento | Lista strumenti | Accessibilità | MyWcag4All");


  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <ToolForm />
    </Container>
  );
}
