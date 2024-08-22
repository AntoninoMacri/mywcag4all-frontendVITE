import * as React from "react";
import { FaCogs, FaCog, FaHandPaper } from "react-icons/fa";

export default function TestLegend(props) {
  return (
    <>
      <a href="#container" className="visually-hidden">
        Salta la legenda e vai al contenuto principale
      </a>
      <div id="test-legend" className="test-legend shadow1 rounded p-2">
        <p className="h5 text-center">Legenda</p>
        <p>
          <FaCog aria-hidden alt="" /> Test di tipo automatico
        </p>
        <p>
          <FaCogs aria-hidden alt="" /> Test di tipo semi-automatico
        </p>
        <p>
          <FaHandPaper aria-hidden alt="" /> Test di tipo manuale
        </p>
      </div>
    </>
  );
}
