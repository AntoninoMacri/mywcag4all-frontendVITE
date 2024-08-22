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


export default function PageRanking(props) {

  const ranking = useSelector((state) => state.ranking.ranking);
  const page = useSelector((state) => state.ranking.page_ranking);

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
                <MyPagination
                  totalPage={listGrouped.length}
                  actualPage={page}
                  type="ranking"
                />
              </>
            )}
          </>

        </Card.Body>
      </Card>
    </Container>
  );
}
