import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Title from "../components/title/Title";
import { Link } from "react-router-dom";
import { useTitle } from "../hooks/HookTitle";
import { getQuestions } from "../service/api/api.questions";

export default function PageWizard(props) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTests, setShowTests] = useState(false);
  const [currentTestIndex, setCurrentTestIndex] = useState(0);

  const questionHeadingRef = useRef(null);
  const testHeadingRef = useRef(null);

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "Wizard",
      url: "/accessibility-dev/wizard",
      isCurrent: true,
      state: "wizard",
    },
  ];

  useTitle("Wizard | MyWcag4All");

  useEffect(() => {
    // Recupera domande e stato salvato
    getQuestions()
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          const validQuestions = res.filter((question) => question._id && question.testo && question.tests);
          if (validQuestions.length !== res.length) {
            console.warn("Alcune domande mancano di proprietà richieste:", res);
          }
          setQuestions(validQuestions);

          // Ripristina stato salvato
          const savedState = JSON.parse(localStorage.getItem("wizardState"));
          if (savedState) {
            setCurrentQuestionIndex(savedState.currentQuestionIndex || 0);
            setCurrentTestIndex(savedState.currentTestIndex || 0);
            setShowTests(savedState.showTests || false);
          }
        } else {
          console.warn("Nessuna domanda ricevuta o dati non nel formato previsto:", res);
        }
      })
      .catch((error) => {
        console.error("Errore nel recupero delle domande:", error);
      });
  }, []);

  // Salva stato corrente nel localStorage
  const saveState = (questionIndex, testIndex, testsVisible) => {
    const wizardState = {
      currentQuestionIndex: questionIndex,
      currentTestIndex: testIndex,
      showTests: testsVisible,
    };
    localStorage.setItem("wizardState", JSON.stringify(wizardState));
  };

  // Funzione Reset
  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setCurrentTestIndex(0);
    setShowTests(false);
    localStorage.removeItem("wizardState");
  };

  // Gestione avanzamento domanda/test
  const handleYes = () => {
    setShowTests(true);
    saveState(currentQuestionIndex, currentTestIndex, true);
  };

  const handleNo = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    setCurrentQuestionIndex(nextQuestionIndex);
    setShowTests(false);
    setCurrentTestIndex(0);
    saveState(nextQuestionIndex, 0, false);
  };

  const handleNextTest = () => {
    if (currentTestIndex < questions[currentQuestionIndex].tests.length - 1) {
      const nextTestIndex = currentTestIndex + 1;
      setCurrentTestIndex(nextTestIndex);
      saveState(currentQuestionIndex, nextTestIndex, true);
    } else {
      const nextQuestionIndex = currentQuestionIndex + 1;
      setShowTests(false);
      setCurrentTestIndex(0);
      setCurrentQuestionIndex(nextQuestionIndex);
      saveState(nextQuestionIndex, 0, false);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      const previousQuestionIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(previousQuestionIndex);
      setCurrentTestIndex(0);
      saveState(previousQuestionIndex, 0, showTests);
    }
  };

  const handlePreviousTest = () => {
    if (currentTestIndex > 0) {
      const previousTestIndex = currentTestIndex - 1;
      setCurrentTestIndex(previousTestIndex);
      saveState(currentQuestionIndex, previousTestIndex, true);
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <Container>
        <Breadcrumb pages={breadcrumb_pages} />
        <Card className="main-card shadow1 my-5">
          <Title title="Wizard Completato" />
          <Card.Body>
            <p>Hai completato tutte le domande del wizard!</p>
            <Link className="btn btn-secondary w-100" to="/accessibility-dev/">
              Torna alla home.
            </Link>
            <button className="btn btn-danger w-100 mt-3" onClick={handleReset}>
              Reset Wizard
            </button>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const currentTest = currentQuestion && currentQuestion.tests ? currentQuestion.tests[currentTestIndex] : null;

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Card className="main-card shadow1 my-5">
        <Title title="Wizard" />
        <div className="d-flex justify-content-end my-2">
          <button className="btn btn-danger" onClick={handleReset}>
            Reset Wizard
          </button>
        </div>
        {!showTests ? (
          <Card.Body>
            <h2 tabIndex="-1" ref={questionHeadingRef}>
              Domanda {currentQuestionIndex + 1} di {questions.length}
            </h2>
            <h3>{currentQuestion.testo}</h3>
            <div className="d-flex justify-content-between my-4">
              <button
                className="btn btn-secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Domanda Precedente
              </button>
              <div>
                <button className="btn btn-primary me-2" onClick={handleYes} type="button">
                  Esegui i test
                </button>
                <button className="btn btn-secondary" onClick={handleNo} type="button">
                  Prossima domanda
                </button>
              </div>
            </div>
          </Card.Body>
        ) : (
          <Card.Body>
            <h2>
              Domanda {currentQuestionIndex + 1} di {questions.length}
            </h2>
            <h3 tabIndex="-1" ref={testHeadingRef}>
              Test {currentTestIndex + 1} di {currentQuestion.tests.length}
            </h3>
            <h4>{currentTest.title}</h4>
            <p>
              <strong>Scopo:</strong> {currentTest.purpose}
            </p>
            <p>
              <strong>Procedura:</strong> {currentTest.procedure}
            </p>
            <div className="d-flex justify-content-between my-4">
              <button
                className="btn btn-secondary"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Domanda Precedente
              </button>
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={handlePreviousTest}
                  disabled={currentTestIndex === 0}
                >
                  Test Precedente
                </button>
                <button className="btn btn-primary" onClick={handleNextTest}>
                  {currentTestIndex + 1 < currentQuestion.tests.length ? "Prossimo Test" : "Prossima Domanda"}
                </button>
              </div>
            </div>
          </Card.Body>
        )}
      </Card>
    </Container>
  );
}
