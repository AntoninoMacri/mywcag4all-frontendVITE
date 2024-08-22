import { React, useState, useMemo, useEffect } from "react";
import Container from "../components/container/Container";
import WebsiteForm from "../components/website-form/WebsiteForm";
import ItemList from "../components/item-list/ItemList";
import MyPagination from "../components/pagination/MyPagination";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContainerB from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/esm/Spinner";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { getWebsites } from "../service/api/api.websites";
import { getRanking } from "../service/api/api.ranking";
import { setRanking } from "../store/rankingSlice";
import { resetToolFilter, setToolsData, setToolsDataLicenses, setToolsDataClsses } from "../store/slice.tools";
import { setWebsites as setWebsitesData } from "../store/websiteSlice";
import { setFilters, setFilteredTestData } from "../store/websiteSlice";
import { selectAuth, addUser } from "../store/authSlice"; // Importa selectAuth e addUser dal nuovo authSlice
import { getTools, getToolsClasses } from "../service/api/api.tools";
import { getLicenses } from "../service/api/api.licenses";
import { setSections } from "../store/sectionsSlice";
import { getSections } from "../service/api/api.sections";

export default function PageWebsites(props) {
  const [showList, setShowList] = useState(true);
  const [websiteToUpdate, setWebsiteToUpdate] = useState();
  const page = useSelector((state) => state.website.page);
  const { user } = useSelector(selectAuth); // Usa selectAuth per ottenere l'utente dallo stato Redux
  console.log("user: ", user);

  useTitle("I miei siti | Accessibilità | MyWcag4All");
  const dispatch = useDispatch();
  const websites = useSelector((state) => state.website.websites);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    /*solo per testing fatti da Lorenzo
    dispatch(
      addUser({
        _id: "654a6fd5d44f1013932f0944",
        name: "Lorenzo",
        surname: "Perinello",
        username: "peri",
        student_id: "10203040",
        email: "perinellolor@gmail.com",
        password: "$2b$10$kgA6ZxZkBPsYUAd0u57AWe/2.lT12eKrZlXql2hJACwJDPDayw6O.",
        is_admin: true,
        createdAt: "2023-11-07T17:11:49.326Z",
        updatedAt: "2023-11-07T17:11:49.326Z",
      })
    );*/

    dispatch(setFilters());
    dispatch(setFilteredTestData());
    dispatch(resetToolFilter());

    getWebsites(user._id).then((res) => {
      dispatch(setWebsitesData(res));
      dispatch(setFilters());
      dispatch(setFilteredTestData());
      setIsLoaded(true);
    });

    getTools().then((res) => {
      dispatch(setToolsData(res));
    });

    getRanking().then((res) => {
      dispatch(setRanking(res));
    });

    getToolsClasses().then((res) => {
      dispatch(setToolsDataClsses({ data: res }));
    });

    getLicenses().then(function (res) {
      dispatch(setToolsDataLicenses({ data: res }));
    });

    getSections().then((res) => {
      dispatch(setSections({ data: res }));
    });
  }, []);

  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 8;
    for (i = 0, j = websites?.length; i < j; i += chunk) {
      temporary = websites.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [websites]);

  const websiteByPage = useMemo(() => {
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const updateHandling = (id) => {
    setWebsiteToUpdate(id);
    setShowList(false);
  };

  const onClickHandler = () => {
    setShowList(false);
  };

  const display = useMemo(() => {
    if (showList) {
      return (
        <>
          <Card className="main-card shadow1">
            <Link to="create" className="w-100 btn btn-primary" onClick={onClickHandler}>
              Inserisci un sito
            </Link>
          </Card>

          <br />

          <>
            {listGrouped.length !== 0 && (
              <ContainerB className="mt-5 md-display-none">
                <Row>
                  <Col xs={5} className="px-2 bold8 responsive-font-size">
                    <span>NOME DEL SITO</span>
                  </Col>

                  <Col xs={1} className="p-0 text-center bold8 text-center responsive-font-size">
                    <span>PUNTI</span>
                  </Col>

                  <Col xs={2} className="p-0 text-center bold8 text-center responsive-font-size">
                    <span>WCAG</span>
                  </Col>

                  <Col xs={4} className="p-0 text-center"></Col>
                </Row>
              </ContainerB>
            )}
            <ItemList
              cardList={websiteByPage}
              index={page}
              type="website"
              updateHandling={updateHandling}
              element={"sito"}
            />
          </>

          {listGrouped.length > 1 && (
            <>
              <Card className="main-card my-3 shadow1">
                <MyPagination totalPage={listGrouped.length} actualPage={page} type="website" />
              </Card>
            </>
          )}
        </>
      );
    } else {
      return <WebsiteForm id={websiteToUpdate} type="create" />;
    }
  }, [listGrouped, page, showList, websiteByPage, websiteToUpdate]);

  const breadcrumb_pages = [
    {
      page: "Home - I miei siti",
      url: "/accessibility-dev/websites",
      isCurrent: true,
      state: "websites",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title={props.title} className="title-a11y" />

      {!isLoaded && (
        <Card className="main-card shadow1 text-center">
          <div className="w-100 text-center">
            <Spinner animation="border" role="status" className="m-5">
              <span className="visually-hidden">Caricamento dei risultati</span>
            </Spinner>
          </div>
        </Card>
      )}
      {isLoaded && display}
    </Container>
  );
}
