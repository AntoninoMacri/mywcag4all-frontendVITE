import { React, useMemo } from "react";
import ToolItemCard from "../tool-item-card/ToolItemCard";
import TestItemCard from "../test-item-card/TestItemCard";
import WebsiteItemCard from "../website-item-card/WebSiteItemCard";
import WcagItemCard from "../wcag-item-card/WcagItemCard";
import Card from "react-bootstrap/Card";

function ItemList(props) {
  const itemListResolved = useMemo(() => {
    if (!Array.isArray(props.cardList)) {
      return null; // oppure un fallback appropriato
    }

    return (
      props.cardList.length > 0 &&
      props.cardList.map((card, indx) => {
        switch (props.type) {
          case "test":
            return (
              <TestItemCard
                key={`test-item-${card.index}`}
                index={card.index}
                title={card.title}
                wcagLevel={card.wcagLevel}
                category={card.category}
                isApplicable={card.isApplicable}
                isMet={card.isMet}
              />
            );
          case "tool":
            return (
              <ToolItemCard
                key={`tool-item-${card.index}`}
                id={card._id}
                index={card.index}
                name={card.name}
                classes={card.types} // Cambia qui: Visualizza le tipologie ("types")
                licenseAbbr={card.licenseabbr}
                licenseName={card.licensename}
                price={card.pricing}
              />
            );
          case "website":
            return (
              <WebsiteItemCard
                key={`website-item-${card._id}`}
                id={card._id}
                name={card.name}
                score={card.score}
                is_pa={card.is_pa}
                update={props.updateHandling}
                level={card.level}
              />
            );
          case "wcag":
            return (
              <WcagItemCard
                key={`wcag-item-${card.id}`}
                id={card.id}
                index={card.index}
                title={card.title}
                description={card.description}
                wcaglevel={card.wcagLevel}
                url={card.linkApply}
                isApplicable={card.isApplicable}
                isMet={card.isMet}
                isAgid={card.level === "AA" || card.level === "A" ? true : false}
              />
            );
          default:
            return <div key={`default-${indx}`}></div>;
        }
      })
    );
  }, [props.cardList, props.type, props.updateHandling]);

  const displayList = useMemo(() => {
    return props.cardList?.length > 0 ? (
      <ul className="w-100 p-0 list-unstyled" id={props.uid} aria-live="polite" aria-atomic="true">
        {itemListResolved}
      </ul>
    ) : (
      <>
        <Card className="main-card shadow1 text-center">
          <p>Nessun {props.element} da visualizzare!</p>
        </Card>
      </>
    );
  }, [itemListResolved, props.cardList, props.element, props.uid]);

  return <div>{displayList}</div>;
}

export default ItemList;
