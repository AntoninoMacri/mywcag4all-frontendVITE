import { React } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function WebsiteFormLanding(props) {
  return (
      <Card className="main-card shadow1">

        <h1 className="text-center mb-5"> {props.action} </h1>

        <Link
          to="/accessibility-dev/websites"
          className="btn btn-primary my-2"
          state={{ location: "websites" }}
        >
          Torna ai tuoi siti
        </Link>
      </Card>

  );
}
