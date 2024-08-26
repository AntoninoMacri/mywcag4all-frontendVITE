import "./App.css";
import { React, useEffect, useState, useMemo } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import PageTest from "./pages/PageTest";
import PageA11yTests from "./pages/PageA11yTests";
import PageA11y from "./pages/PageA11y";
import PageWebsites from "./pages/PageWebsites";
import PageRanking from "./pages/PageRanking";
import PageTools from "./pages/PageTools";
import PageTool from "./pages/PageTool";
import PageA11yDashboard from "./pages/PageA11yDashboard";
import Footer from "./components/footer/Footer";
import "./index.css";
import PageA11yTips from "./pages/PageA11yTips";
import PageProfile from "./pages/PageProfile";
import PageNotFound from "./pages/PageNotFound";
import PageWebsiteCreate from "./pages/PageWebsiteCreate";
import PageA11yWcagGuidelineList from "./pages/PageA11yWcagGuidelinesList";
import PageA11yWcagGuideline from "./pages/PageA11yWcagGuideline";
import PageA11yResult from "./pages/PageA11yResult";
import Header from "./components/header/Header";
import PageToolsHint from "./pages/PageToolsHint";
import PageWebsiteDelete from "./pages/PageWebsiteDelete";
import PageWebsiteUpdate from "./pages/PageWebsiteUpdate";
import PageA11yGuide from "./pages/PageA11yGuide";
import PageLogin from "./pages/PageLogin";
import PageSignUp from "./pages/PageSignUp";
import PublicPageMyths from "./pages/PublicPageMyths";
import Spinner from "react-bootstrap/esm/Spinner";
import { useTitle } from "./hooks/HookTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "./store/authSlice";

import Container from "./components/container/Container";
import PublicPageNotFound from "./pages/PublicPageNotFound";
import PageHome from "./pages/PublicPageHome";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);

  const currentPath = useLocation(); // Location corrente
  const [location, setLocation] = useState("");

  useEffect(() => {
  setLocation(currentPath.pathname);
}, [currentPath.pathname]);


  useTitle("MyWcag4All");

const display = useMemo(() => {
  if (currentPath.pathname === "/accessibility-dev/" || currentPath.pathname === "/accessibility-dev/PageNotFound") {
    // console.log("entrato1", currentPath.pathname);
    // console.log("isAuthenticated", isAuthenticated);
    return (
      <>
        <Header />
        <Container className="d-flex justify-content-center">
          <Routes>
            <Route path="/" element={<Navigate replace to="/accessibility-dev/" />} />
            <Route path="/accessibility-dev/" element={<PageHome title="accessibility-dev" />} />
            <Route path="/accessibility-dev/PageNotFound" element={<PublicPageNotFound title="PageNotFound" />} />
          </Routes>
        </Container>
        <Footer />
      </>
    );
  } else if (isAuthenticated) {
    // console.log("entrato2", currentPath.pathname);
    // console.log("isAuthenticated", isAuthenticated);
    return (
      <>
        <Header />
        <div id="main" className="d-flex flex-row">
          <Navbar currentLocation={currentPath.pathname} />
          <Routes>
            <Route path="/" element={<Navigate replace to="/accessibility-dev/" />} />
            <Route path="/accessibility-dev/a11y" element={<PageA11y title="Accessibilità" />} />
            <Route path="/accessibility-dev/a11y/tips" element={<PageA11yTips title="Accessibilità" />} />
            <Route path="/accessibility-dev/a11y/guide" element={<PageA11yGuide title="Istruzioni per l'uso" />} />
            <Route path="/accessibility-dev/a11y/choice" element={<PageA11yDashboard title="Accessibilità" />} />
            <Route path="/accessibility-dev/a11y/tests" element={<PageA11yTests title="Accessibilità" />} />
            <Route path="/accessibility-dev/a11y/wcag" element={<PageA11yWcagGuidelineList title="Accessibilità wcag" />} />
            <Route path="/accessibility-dev/a11y/result" element={<PageA11yResult title="Risultati" />} />
            <Route path="/accessibility-dev/a11y/wcag-guidelines/:guideline" element={<PageA11yWcagGuideline />} />
            <Route path="/accessibility-dev/a11y/tests/:testid" element={<PageTest />} />
            <Route path="/accessibility-dev/tools" element={<PageTools title="Strumenti per l'accessibilità" />} />
            <Route path="/accessibility-dev/tools/:toolid" element={<PageTool />} />
            <Route path="/accessibility-dev/tools/hint" element={<PageToolsHint title="Suggerisci strumenti per l'accessibilità" />} />
            <Route path="/accessibility-dev/websites" element={<PageWebsites className="w-75" title="I miei siti" />} />
            <Route path="/accessibility-dev/websites/create" element={<PageWebsiteCreate className="w-75" title="I miei siti" />} />
            <Route path="/accessibility-dev/websites/delete/:websiteid" element={<PageWebsiteDelete type="delete" />} />
            <Route path="/accessibility-dev/websites/update/:websiteid" element={<PageWebsiteUpdate type="update" />} />
            <Route path="/accessibility-dev/ranking" element={<PageRanking title="Classifica" />} />
            <Route path="/accessibility-dev/profile" element={<PageProfile title="Profilo" />} />
            <Route path="/accessibility-dev/myths" element={<PublicPageMyths />} />
            <Route path="*" element={<PublicPageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  } else {
    // console.log("entrato3", currentPath.pathname);
    // console.log("isAuthenticated", isAuthenticated);
    return (
      <>
        <Header />
        <div id="main" className="d-flex flex-row">
          <Navbar currentLocation={currentPath.pathname} />
          <Routes>
            <Route path="/" element={<Navigate replace to="/accessibility-dev/" />} />
            <Route path="/accessibility-dev/log-in" element={<PageLogin />} />
            <Route path="/accessibility-dev/sign-up" element={<PageSignUp />} />
            <Route path="/accessibility-dev/myths" element={<PublicPageMyths />} />
            <Route path="/accessibility-dev/tools" element={<PageTools title="Strumenti per l'accessibilità" />} />
            <Route path="/accessibility-dev/tools/:toolid" element={<PageTool />} />
            <Route path="*" element={<PublicPageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </>
    );
  }
}, [currentPath.pathname, isAuthenticated]);


  return <>{display}</>;
}

export default App;
