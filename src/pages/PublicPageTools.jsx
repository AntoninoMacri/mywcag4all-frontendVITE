import { React, useMemo } from "react";
import Container from "../components/container/Container";
import MyPagination from "../components/pagination/MyPagination";
import ItemList from "../components/item-list/ItemList";
import Title from "../components/title/Title";
import SearchBarTools from "../components/searchbar-tools/SearchBarTools";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { useTitle } from "../hooks/HookTitle";
import { useSelector } from "react-redux";

export default function PageTools(props) {

  useTitle("Lista strumenti | Accessibilità | MyWcag4All");
  const tools = useSelector((state) => state.tools.tools_data);
  const page = useSelector((state) => state.tools.filter_page);

  console.log("tools", tools);

  const listGrouped = useMemo(() => {
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
    return listGrouped[Number(page - 1)];
  }, [listGrouped, page]);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "websites",
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

        <ItemList
          cardList={cardsByPage}
          index={page}
          type="tool"
          uid="tools-list"
          element="strumento"
        />
        {listGrouped.length > 1 && (
          <>
            <Card className="main-card my-3 shadow1">
              <MyPagination
                totalPage={listGrouped.length}
                actualPage={page}
                type={"tools"}
              />
            </Card>
          </>
        )}
      </>
    </Container>
  );
}
