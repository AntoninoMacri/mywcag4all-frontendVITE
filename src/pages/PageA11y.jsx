import { React, useMemo, useState, useEffect } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { setWebsite, setFilters, setFilteredTestData } from "../store/websiteSlice";

export default function PageA11y(props) {
  const [isSelected, setIsSelected] = useState(false);
  const websites = useSelector((state) => state.website.websites);
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    dispatch(setWebsite({ id: event.target.value }));
    dispatch(setFilters());
    dispatch(setFilteredTestData());
    setIsSelected(true);
  };

  useTitle("Accessibilità | MyWcag4All");

  const display = useMemo(() => {
    return (
      <Form.Select
        aria-label="Default select example"
        id="select_type"
        size="lg"
        onChange={handleOnChange}
        className="mb-5 mt-5"
        aria-controls="btn-init"
      >
        <option value="" hidden>
          Seleziona il sito che vuoi testare
        </option>
        {websites.map((website, index) => {
          return (
            <option value={website._id} key={`wbs-opt-${index}`}>
              {" "}
              {website.name}{" "}
            </option>
          );
        })}
      </Form.Select>
    );
  }, [websites]);

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
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="ACCESSIBILITÀ" className="title-a11y" />

      <Card className="main-card shadow1">
        <h2 className="bold6">Inizia selezionando un sito </h2>
        {websites.length > 0 && display}
        {websites.length === 0 && (
          <p>
            Non sembra che tu abbia ancora inserito un sito,{" "}
            <Link to="/accessibility-dev/websites/create" state={{ location: "websites" }} className="default-anchor">
              inserisci un sito ora
            </Link>
            !
          </p>
        )}

        <div id="btn-init">
          {isSelected && (
            <Link
              to="/accessibility-dev/a11y/choice"
              className="btn btn-danger w-100 bold8"
              state={{ location: "a11y" }}
            >
              Inizia la valutazione di accessibilità
            </Link>
          )}
        </div>
      </Card>
    </Container>
  );
}
