import * as React from "react";
import { FaCogs, FaCog, FaHandPaper, FaQuestionCircle } from "react-icons/fa";

export default function TestCategory(props) {
  const displayIcon = () => {
    switch (props.category) {
      case "A":
        return <FaCog className="badge-item-card" alt="test di tipo automatico" />;
      case "S":
        return <FaCogs className="badge-item-card" alt="test di tipo semiautomatico" />;
      case "M":
        return <FaHandPaper className="badge-item-card" alt="test di tipo manuale" />;
      default:
        return <FaQuestionCircle alt="test di tipo non identificato" />;
    }
  };

  return displayIcon();
}
