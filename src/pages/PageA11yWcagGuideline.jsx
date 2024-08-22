import { React, useMemo } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import WcagGuideline from "../components/wcag-guideline/WcagGuideline";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";
import { postUpdateWebsiteSections } from "../service/api/api.websites";
import { updateWebsiteResults } from "../store/websiteSlice";
import { useDispatch } from "react-redux";

export default function PageA11yWcagGuideline(props) {
  const params = useParams();
  const user = useSelector((state) => state.auth.user);
  const website = useSelector((state) => state.website.website);
  const guidelines = useSelector((state) => state.website.website.sections[params.guideline - 1].guidelines);
  const dispatch = useDispatch();

  useTitle("Sezione WCAG ", params.guideline, " | Controllo criteri WCAG | Dashboard | Accessibilità | MyWcag4All");

  const displaySection = useMemo(() => {
    return (

      guidelines?.map((guideline) => (
        <>
          <WcagGuideline
            index={guideline.index}
            title={guideline.title}
            description={guideline.description}
            criteria={guideline.criteria}
          />
          <br />
        </>
      ))
    );
  }, [guidelines]);

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
      page: "Dashboard",
      url: "/accessibility-dev/a11y/choice",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Verifica WCAG",
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: false,
      state: "a11y",
    },
    {
      page: "Verifica sezione WCAG " + params.guideline,
      url: "/accessibility-dev/a11y/wcag",
      isCurrent: true,
      state: "a11y",
    },
  ];

  const updateData = () => {
    postUpdateWebsiteSections(website._id, website.sections).then((res) => {
      console.log("data updated");
      console.log("results: ", res)
      dispatch(updateWebsiteResults({ results: res }))
    }).catch((err) => {
      console.log("error");
    });
  }


  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title
        title={`SEZIONE WCAG ${params.guideline}`}
        className="title-a11y"
      />

      <>
        {displaySection}
        <br />
        <Card className="main-card my-3 shadow1">
          <Link
            to="/accessibility-dev/a11y/wcag"
            className="btn btn-success btn-block shadow w-100"
            state={{ location: "a11y" }}
            rel="prev"
            onClick={updateData}
          >
            Salva e torna alle sezioni WCAG
          </Link>
        </Card>

      </>
    </Container>
  );
}
