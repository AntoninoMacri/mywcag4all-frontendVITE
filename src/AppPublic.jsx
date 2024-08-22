import "./App.css";
import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicPageMyths from "./pages/PublicPageMyths";
import PublicPageTools from "./pages/PublicPageTools";
import PageHome from "./pages/PublicPageHome";
import Footer from "./components/footer/Footer";
import "./index.css";
import Container from "react-bootstrap/Container";
import Header from "./components/header/Header";
import PublicPageNotFound from "./pages/PublicPageNotFound";
import { useSelector } from "react-redux";
import { selectAuth } from "./store/authSlice";

function App() {
  const { user, isLoading } = useSelector(selectAuth);
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    !isLoading && (
      <>
        <Header />

        <Container className="d-flex justify-content-center">
          <Routes>
            <Route path="*" element={<PublicPageNotFound title="Accessibilità" />} />

            <Route path="/" element={<Navigate replace to="/accessibility-dev" />} />

            <Route path="/accessibility-dev/" element={<PageHome title="Accessibilità" />} />

            <Route
              path="/accessibility-dev/tools"
              element={<PublicPageTools title="Strumenti per l'accessibilità" />}
            />

            <Route path="/accessibility-dev/myths" element={<PublicPageMyths />} />
          </Routes>
        </Container>

        <Footer />
      </>
    )
  );
}

export default App;
