import React, { useState, useEffect, useRef } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { postRegister } from "../service/api/api.auth";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function PageSignUp(props) {
  const [validated, set_Validated] = useState(false);
  const [form_Data, set_Form_Data] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confimPass: "",
    username: "username", // Valore hardcoded per username
    isAdmin: false, // Valore hardcoded per isAdmin
  });
  const [error, setError] = useState(null);
  const [errorCount, setErrorCount] = useState(0);
  const errorRef = useRef(null);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/accessibility-dev/tools");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [error, errorCount]);

  const submitFn = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        console.log("Registration data:", form_Data);
        const response = await postRegister(form_Data);
        console.log("Registration successful:", response);
        dispatch(login({ user: response.user, token: response.token }));
        navigate("/accessibility-dev/tools");
      } catch (error) {
        console.error("Error registering:", error);

        if (error.response && error.response.status === 400) {
          if (error.response.data.message === "user already exists") {
            setError("Un utente con questa email esiste già. Per favore, usa un'altra email.");
          } else {
            setError("Errore nella registrazione. Verifica i dati e riprova.");
          }
        } else if (error.message === "Network Error") {
          setError("Mancata risposta dal server. Per favore, riprova più tardi.");
        } else {
          setError("Errore nella registrazione. Verifica i dati e riprova.");
        }

        setErrorCount((prevCount) => prevCount + 1);
      }
    }
    set_Validated(true);
  };

  const chngFn = (event) => {
    const { name, value } = event.target;
    set_Form_Data({
      ...form_Data,
      [name]: value,
    });
  };

  useTitle("Sign Up | MyWcag4All");

  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "Sign-up",
      url: "Sign-up",
      isCurrent: true,
      state: "a11y",
    },
  ];

  return (
    <Container className="mt-5">
      <Breadcrumb pages={breadcrumb_pages} />
      <Title title="SIGN UP" className="title-a11y" />
      <Card className="main-card shadow1">
        <Form noValidate validated={validated} onSubmit={submitFn}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form_Data.name}
                onChange={chngFn}
                pattern="^[a-zA-Z0-9]+$"
                required
                placeholder="Nome"
                isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(form_Data.name)}
              />
              <Form.Control.Feedback type="invalid">Inserisci un nome valido</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId="surname">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={form_Data.surname}
                onChange={chngFn}
                pattern="^[a-zA-Z0-9]+$"
                required
                placeholder="Cognome"
                isInvalid={validated && !/^[a-zA-Z0-9]+$/.test(form_Data.surname)}
              />
              <Form.Control.Feedback type="invalid">Inserisci un cognome valido</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="email@mail.com"
                value={form_Data.email}
                onChange={chngFn}
                required
                isInvalid={validated && !/^\S+@\S+\.\S+$/.test(form_Data.email)}
              />
              <Form.Control.Feedback type="invalid">Inserisci una email valida</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={form_Data.password}
                onChange={chngFn}
                minLength={6}
                required
                isInvalid={validated && form_Data.password.length < 6}
              />
              <Form.Control.Feedback type="invalid">
                La password deve contenere almeno 6 caratteri
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group controlId="confirmPassword">
              <Form.Label>Conferma Password</Form.Label>
              <Form.Control
                type="password"
                name="confimPass"
                placeholder="Conferma Password"
                value={form_Data.confimPass}
                onChange={chngFn}
                minLength={6}
                required
                pattern={form_Data.password}
                isInvalid={validated && form_Data.confimPass !== form_Data.password}
              />
              <Form.Control.Feedback type="invalid">Password e Conferma Password non coincidono.</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Registrati</Button>
        </Form>
        {error && (
          <Alert ref={errorRef} variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Card>
    </Container>
  );
}
