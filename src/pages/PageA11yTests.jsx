import { React, useMemo } from "react";
import Container from "../components/container/Container";
import MyPagination from "../components/pagination/MyPagination";
import Card from "react-bootstrap/Card";
import SearchBar from "../components/searchbar/SearchBar";
import ItemList from "../components/item-list/ItemList";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { filterTestData } from "../store/websiteSlice";
import { postUpdateWebsiteTests } from "../service/api/api.websites";
import { updateWebsiteResults } from "../store/websiteSlice";

export default function PageA11y(props) {
  const website = useSelector((state) => state.website.website);
  const page = useSelector((state) => state.website.website.filters.filter_page);
  const testData = useSelector((state) => state.website.website.tests_filtered);

  useTitle("Tests | Dashboard | Accessibilità | MyWcag4All");
  const dispatch = useDispatch();

  const updateWebsiteTests = () => {
    
    
    postUpdateWebsiteTests(website._id, website.tests).then((res) => {
      dispatch(updateWebsiteResults({ results: res }))
      
    }).catch((err) => {
      console.log("error");
    });
  };


  const listGrouped = useMemo(() => {
    const listTemp = [];
    let i,
      j,
      temporary,
      chunk = 10;
    for (i = 0, j = testData.length; i < j; i += chunk) {
      temporary = testData.slice(i, i + chunk);
      listTemp.push(temporary);
    }
    return listTemp;
  }, [testData]);

  const updateFilters = () => {
    dispatch(filterTestData())
  };

  const displayPagination = useMemo(() => {

    return (
      <MyPagination
        totalPage={listGrouped.length}
        actualPage={page}
        type={"test"}
      />
    );
  }, [listGrouped.length, page]);

  const cardsByPage = useMemo(() => {
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const displayItems = useMemo(() => {
    return (
      <ItemList
        cardList={cardsByPage}
        index={page}
        type="test"
        uid="tests-list"
        element="test"
      />
    );
  }, [cardsByPage, page]);

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
      page: 'Lista test accessibilità per il sito "' + website.name + '"',
      url: "/accessibility-dev/a11y/tests",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Title title={"TEST DI ACCESSIBILITÀ "} className="title-a11y" />

      <SearchBar
        uid="tests-list"
        updateFilters={updateFilters}
      />

      <>
        {displayItems}

        <Card className="main-card my-3 shadow1">
          <Row>
            <Col>
              <Link
                to="/accessibility-dev/a11y/choice"
                className="btn btn-success btn-block shadow w-100"
                state={{ location: "a11y" }}
                rel="prev"
                onClick={updateWebsiteTests}
              >
                Salva e torna alla pagina dashboard
              </Link>
            </Col>
            <Col>
              <Link
                to="/accessibility-dev/a11y/wcag"
                className="btn btn-success btn-block shadow w-100"
                state={{ location: "a11y" }}
                rel="prev"
                onClick={updateWebsiteTests}
              >
                Salva e vai ai criteri WCAG
              </Link>
            </Col>
          </Row>
        </Card>

        {listGrouped.length > 1 && (
          <>
            <Card className="main-card my-3 shadow1">
              {displayPagination}
            </Card>
          </>
        )}
      </>
    </Container>
  );
}