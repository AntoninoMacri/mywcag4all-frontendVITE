import { React, useState, useEffect, useRef } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert"; // Importa Alert per visualizzare messaggi di errore
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";

import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../service/api/api.auth";

const PageLogin = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // Stato per tracciare l'errore
  const [errorCount, setErrorCount] = useState(0); // Contatore per tracciare le ripetizioni dell'errore
  const errorRef = useRef(null); // Ref per l'elemento dell'errore

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/accessibility-dev/tools");
    }
  }, [isAuthenticated, navigate]); // redirect nel caso in cui si entri nel link di login già da loggati //sol precedente []

  useEffect(() => {
    if (error) {
      errorRef.current.scrollIntoView({ behavior: "smooth" }); // Scrolla al messaggio di errore
    }
  }, [error, errorCount]); // Aggiunta di errorCount come dipendenza per eseguire lo scroll anche in caso di errore ripetuto

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
    // console.log("arrivo", formData);

    console.log("form.checkValidity()", form.checkValidity());
    if (form.checkValidity() === true) {
      try {
        // console.log("arrivo2", formData);

        console.log("Submitting login form with data:", formData);
        const response = await postLogin(formData.email, formData.password);
        /*
        //chiamata a typicode per testare la chiamata http se ha successo aggiungo token e user per simulare i dati che mi aspetto dal get
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        console.log("arrivo3", response.data);
        response.data = { ...response.data, token: "token", user: "user" };
        console.log("arrivo3", response.data);
        //fine parte di test */
        console.log("Login response:", response);
        // const { user, token } = response.data;
        const { user, token } = response;
        // localStorage.setItem("token", token); // Salva il token nel localStorage
        dispatch(login({ user, token }));
        navigate("/accessibility-dev/tools");
      } catch (error) {
        console.error("Error logging in:", error);

        // Gestione degli errori nel caso di credenziali non valide o altri errori specifici
        if (error.code && error.code === "ERR_NETWORK") {
          setError("Mancata risposta dal server. Per favore, riprova più tardi.");
        } else if (error.message === "Network Error") {
          setError("Mancata risposta dal server. Per favore, riprova più tardi.");
        } else {
          setError("Invalid email or password. Please try again.");
        }

        setErrorCount((prevCount) => prevCount + 1); // Incrementa il contatore degli errori per forzare lo scroll
      }
    }
  };

  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  useTitle("Log in | MyWcag4All");

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "log-in",
      url: "log-in",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container className="mt-5">
      <Breadcrumb pages={breadcrumb_pages} />
      <Title title="LOG IN" className="title-a11y" />
      <Card className="main-card shadow1">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                isInvalid={validated && !/^\S+@\S+\.\S+$/.test(formData.email)}
              />
              <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                minLength={6}
                required
                isInvalid={validated && formData.password.length < 6}
              />
              <Form.Control.Feedback type="invalid">Password must be at least 6 characters long.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Login</Button>
        </Form>
        {/* Messaggio di errore */}
        {error && (
          <Alert ref={errorRef} variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default PageLogin;

/*
 {validated && <Button onClick={handleLogin} type="submit" >Submit</Button>}
          {!validated && <Button onClick={handleLogin} type="submit" disabled>Submit</Button>}
*/
