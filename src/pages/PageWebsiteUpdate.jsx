import React, { useEffect, useState } from "react";
import Container from "../components/container/Container";
import WebsiteForm from "../components/website-form/WebsiteForm";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import { useLocation, useParams } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { getWebsite } from "../service/api/api.websites";

export default function PageWebsiteUpdate(props) {
  const { websiteid } = useParams();  // Estrai l'ID del sito dai parametri URL
  const location = useLocation();  // Ottieni l'oggetto della posizione corrente
  const [websiteData, setWebsiteData] = useState(null);
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento

  useEffect(() => {
    console.log("Current Pathname:", location.pathname);
    console.log("Extracted Website ID:", websiteid);

    if (websiteid) {
      fetchWebsiteData(websiteid);  // Chiama la funzione per ottenere i dati del sito
    } else {
      console.error("Website ID is undefined.");
    }
  }, [location, websiteid]);

  const fetchWebsiteData = async (id) => {
    try {
      const response = await getWebsite(id);  // Chiama la tua API
      setWebsiteData(response);
      console.log("Website data:", response);
      setLoading(false); // Imposta loading a false quando i dati sono stati caricati
    } catch (error) {
      console.error("Error fetching website data:", error);
      setLoading(false); // Imposta loading a false anche in caso di errore
    }
  };

  useTitle("Modifica un sito | I miei siti | Accessibilità | MyWcag4All");

  const breadcrumb_pages = !loading && websiteData ? [
    {
      page: "Home - I miei siti",
      url: "/accessibility-dev/websites",
      isCurrent: false,
      state: "websites",
    },
    {
      page: `Modifica dei dati del sito ${websiteData.name}`,
      url: `/accessibility-dev/websites/update/${websiteid}`,
      isCurrent: true,
      state: "websites",
    }
  ] : [];

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />

      <Title title="Aggiornamento dati" className="title-a11y" />

      {loading ? (
        <p>Caricamento...</p>
      ) : (
        websiteData ? (
          <WebsiteForm type="update" action={`Modifica i dati del sito  ${websiteData.name}`} name={websiteData.name} />
        ) : (
          <p>Errore nel caricamento dei dati.</p>
        )
      )}
    </Container>
  );
}
