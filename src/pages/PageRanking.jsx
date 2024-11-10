import { React, useMemo } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import RankingList from "../components/ranking-list/RankingList";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import MyPagination from "../components/pagination/MyPagination";
import ContainerB from "react-bootstrap/Container";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";

/*da importare in ogni pagina - inizio */
import { useDispatch } from "react-redux";
import { resetToolFilter, setToolsData, setToolsDataLicenses, setToolsDataClsses } from "../store/slice.tools";
import { setWebsites as setWebsitesData } from "../store/websiteSlice";
import { setFilters, setFilteredTestData } from "../store/websiteSlice";
import { getWebsites } from "../service/api/api.websites";
import { selectAuth, addUser } from "../store/authSlice"; // Importa selectAuth e addUser dal nuovo authSlice
import { getTools, getToolsClasses } from "../service/api/api.tools";
import { getRanking } from "../service/api/api.ranking";
import { setRanking } from "../store/rankingSlice";
import { getLicenses } from "../service/api/api.licenses";
import { setSections } from "../store/sectionsSlice";
import { getSections } from "../service/api/api.sections";
import { useEffect, useState } from "react";
/*da importare in ogni pagina - fine */

export default function PageRanking(props) {
  const ranking = useSelector((state) => state.ranking.ranking);
  const page = useSelector((state) => state.ranking.page_ranking);

  /*da importare in ogni pagina - inizio */
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuth); // Usa selectAuth per ottenere l'utente dallo stato Redux
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
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
      dispatch(setToolsData({ data: res }));
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
  /*da importare in ogni pagina - fine */

  useTitle("Classifica | MyWcag4All");

  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 6;
    for (i = 0, j = ranking.length; i < j; i += chunk) {
      temporary = ranking.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [ranking]);

  const cardsByPage = useMemo(() => {
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: "Classifica",
      url: "/accessibility-dev/ranking",
      isCurrent: true,
      state: "ranking",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="CLASSIFICA" className="title-tools" />

      <Card className="main-card shadow1">
        <Card.Body>
          <>
            {ranking.length > 0 && (
              <ContainerB className="mb-2">
                <Row>
                  <Col md={1} className="p-0 bold7"></Col>

                  <Col md={6} className="p-0 bold7">
                    <span>SVILUPPATORE </span>
                  </Col>

                  <Col md={3} className="p-0 bold7 text-center">
                    <span>PUNTEGGIO</span>
                  </Col>

                  <Col md={2} className="p-0 bold7 text-center ">
                    <span>NUMERO DI SITI</span>
                  </Col>
                </Row>
              </ContainerB>
            )}

            <RankingList rankingList={cardsByPage} />

            {listGrouped.length > 1 && (
              <>
                <MyPagination totalPage={listGrouped.length} actualPage={page} type="ranking" />
              </>
            )}
          </>
        </Card.Body>
      </Card>
    </Container>
  );
}
