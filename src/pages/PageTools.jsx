import { React, useMemo } from "react";
import Container from "../components/container/Container";
import MyPagination from "../components/pagination/MyPagination";
import ItemList from "../components/item-list/ItemList";
import Title from "../components/title/Title";
import SearchBarTools from "../components/searchbar-tools/SearchBarTools";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

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

// Memoization del selettore tools_data_filtered
const selectFilteredTools = createSelector(
  (state) => state.tools.tools_data_filtered,
  (tools_data_filtered) => tools_data_filtered || [] // Assicurati che ritorni sempre un array
);

export default function PageTools(props) {
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

  useTitle("Lista strumenti | Accessibilità | MyWcag4All");

  const tools = useSelector(selectFilteredTools); // Utilizza il selettore memoizzato
  const page = useSelector((state) => state.tools.filter_page);

  const listGrouped = useMemo(() => {
    if (!tools || tools.length === 0) return []; // Ritorna un array vuoto se tools è undefined o vuoto
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 9;
    for (i = 0, j = tools.length; i < j; i += chunk) {
      temporary = tools.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [tools]);

  const cardsByPage = useMemo(() => {
    if (listGrouped.length === 0 || !listGrouped[Number(page - 1)]) return []; // Ritorna un array vuoto se non c'è nulla
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "Lista strumenti e risorse",
      url: "/accessibility-dev/a11y/tools",
      isCurrent: true,
      state: "tools",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="STRUMENTI PER L'ACCESSIBILITÀ" className="title-tools" />

      <SearchBarTools uid="tools-list" hint={true} />
      <br />

      <>
        {listGrouped.length > 0 && (
          <Row className="responsive-font-size md-display-none">
            <Col md={12} lg={5} className="px-3 bold8">
              <span> NOME </span>
            </Col>

            <Col md={12} lg={5} className="p-0 text-center bold8">
              <span>TIPOLOGIA</span>
            </Col>

            <Col md={12} lg={2} className="p-0 text-center"></Col>
          </Row>
        )}

        <ItemList cardList={cardsByPage} index={page} type="tool" uid="tools-list" element="strumento" />
        {listGrouped.length > 1 && (
          <>
            <Card className="main-card my-3 shadow1">
              <MyPagination totalPage={listGrouped.length} actualPage={page} type={"tools"} />
            </Card>
          </>
        )}
      </>
    </Container>
  );
}
