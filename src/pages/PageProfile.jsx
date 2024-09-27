import WebsiteForm from "../components/website-form/WebsiteForm";
import React, { useState, useEffect, useRef } from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { patchChangePassword, deleteAccount } from "../service/api/api.auth";
import { useTitle } from "../hooks/HookTitle";
import { useSelector, useDispatch } from "react-redux";
import { setFilters, setFilteredTestData } from "../store/websiteSlice";
import { resetToolFilter } from "../store/slice.tools";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

export default function PageProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Stato per il cambio password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Stato per conferma password
  const [passwordChangeError, setPasswordChangeError] = useState("");
  const [isChangePasswordFormValid, setIsChangePasswordFormValid] = useState(false); // Stato per validità del form cambio password

  // Stato per la cancellazione dell'account
  const [deletePassword, setDeletePassword] = useState(""); // Stato per la password della cancellazione
  const [deletePasswordError, setDeletePasswordError] = useState("");
  const [isDeleteFormValid, setIsDeleteFormValid] = useState(false); // Stato per validità del form cancellazione

  const [formValidated, setFormValidated] = useState(false);
  const [error, setError] = useState(""); // Stato per errori
  const [errorCount, setErrorCount] = useState(0); // Contatore degli errori

  const [successMessage, setSuccessMessage] = useState(""); // Stato per il messaggio di successo
  const [showChangePasswordActions, setShowChangePasswordActions] = useState(false);
  const [showDeleteActions, setShowDeleteActions] = useState(false);

  const errorRef = useRef(null); // Riferimento per scrollare al messaggio di errore
  const successRef = useRef(null); // Riferimento per scrollare al messaggio di successo
  const navigate = useNavigate();

  useTitle("Profilo | MyWcag4All");

  // Fetch filters and test data on component mount
  useEffect(() => {
    dispatch(setFilters());
    dispatch(setFilteredTestData());
    dispatch(resetToolFilter());
  }, [dispatch]);

  // Validare la nuova password e aggiornare la variabile di stato isChangePasswordFormValid
  useEffect(() => {
    const error = validatePassword(newPassword, confirmNewPassword);
    setPasswordChangeError(error);
    setIsChangePasswordFormValid(!error); // Imposta isChangePasswordFormValid in base all'errore della password
  }, [newPassword, confirmNewPassword]);

  // Validare la password di cancellazione e aggiornare la variabile di stato isDeleteFormValid
  useEffect(() => {
    const error = validateDeletePassword(deletePassword);
    setDeletePasswordError(error);
    setIsDeleteFormValid(!error); // Imposta isDeleteFormValid in base all'errore della password
  }, [deletePassword]);

  // Gestire la modifica della password
  const changePasswordHandler = async () => {
    try {
      const email = user.email;
      await patchChangePassword(email, newPassword);
      onResetHandler(); // Reset dello stato alla conferma
      setSuccessMessage("Password cambiata con successo!");
    } catch (error) {
      console.error(error);
      setPasswordChangeError("Errore durante il cambio della password.");
    }
  };

  // Gestire la cancellazione dell'account
  const onDeleteHandler = async () => {
    try {
      const email = user.email;
      await deleteAccount(email, deletePassword);
      dispatch(logout());
      navigate(import.meta.env.VITE_LOGOUT_REDIRECT_URL, { replace: true });
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.response && error.response.status === 400) {
        if (error.response.data.message === "Invalid credentials") {
          setError("Password Errata. Per favore, verifica i dati e riprova.");
        } else {
          setError("Errore nella registrazione. Verifica i dati e riprova.");
        }
      } else if (error.message === "Network Error") {
        setError("Mancata risposta dal server. Per favore, riprova più tardi.");
      } else {
        setError("Errore nella registrazione. Verifica i dati e riprova.");
      }
      setErrorCount((prevCount) => prevCount + 1); // Incrementa il contatore degli errori per forzare lo scroll
    }
  };

  // Mostrare le azioni di conferma della modifica della password
  const showChangePasswordActionsHandler = () => {
    setShowChangePasswordActions(true);
    setShowDeleteActions(false);
  };

  // Mostrare le azioni di conferma della cancellazione
  const showDeleteActionsHandler = () => {
    setShowChangePasswordActions(false);
    setShowDeleteActions(true);
  };

  // Resettare lo stato
  const onResetHandler = () => {
    setShowChangePasswordActions(false);
    setShowDeleteActions(false);
    setNewPassword("");
    setConfirmNewPassword(""); // Reset conferma password
    setPasswordChangeError("");
    setDeletePassword(""); // Reset della password per la cancellazione
    setDeletePasswordError("");
    setError(""); // Resetta l'errore
    setSuccessMessage(""); // Reset del messaggio di successo
  };

  // Validare il formato della nuova password e la conferma della nuova password
  const validatePassword = (pwd, confirmPwd) => {
    if (!pwd) return "Password cannot be empty.";
    if (pwd.length < 6) return "Password must be at least 6 characters long.";
    if (pwd !== confirmPwd) return "Passwords do not match.";
    return "";
  };

  // Validare la password di cancellazione dell'account
  const validateDeletePassword = (pwd) => {
    if (!pwd) return "Password cannot be empty.";
    return "";
  };

  // Gestire la modifica dell'input della nuova password
  const handleNewPasswordChange = (e) => {
    const pwd = e.target.value;
    setNewPassword(pwd);
  };

  // Gestire la modifica dell'input di conferma della nuova password
  const handleConfirmNewPasswordChange = (e) => {
    const confirmPwd = e.target.value;
    setConfirmNewPassword(confirmPwd);
  };

  // Gestire la modifica dell'input della password per la cancellazione dell'account
  const handleDeletePasswordChange = (e) => {
    const pwd = e.target.value;
    setDeletePassword(pwd);
  };

  // Dati della breadcrumb
  const breadcrumb_pages = [
    {
      page: "Home",
      url: "/accessibility-dev/",
      isCurrent: false,
      state: "accessibility-dev",
    },
    {
      page: "Profilo",
      url: "/accessibility-dev/profile",
      isCurrent: true,
      state: "profile",
    },
  ];

  // Scrollare al messaggio di errore se presente
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [error, errorCount]);

  // Scrollare al messaggio di successo se presente
  useEffect(() => {
    if (successMessage && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [successMessage]);

  return (
    <Container>
      <Breadcrumb pages={breadcrumb_pages} />
      <Title title="PROFILO" className="title-a11y" />

      <Card className="main-card shadow1">
        <h2 className="bold6">Informazioni</h2>
        <hr aria-hidden="true" />
        <Row className="dl">
          <Col as="dt" sm={2}>
            Email
          </Col>
          <Col as="dd" sm={10}>
            {user?.email}
          </Col>
        </Row>
        <Row className="dl">
          <Col as="dt" sm={2}>
            Username
          </Col>
          <Col as="dd" sm={10}>
            {user?.username}
          </Col>
        </Row>
      </Card>

      <Card className="main-card mt-5 shadow1">
        <h2 className="bold6 mb-3">Gestisci</h2>
        <hr aria-hidden="true" />

        <Row>
          <Col sm={12}>
            <Button variant="warning w-100 mb-3" onClick={showChangePasswordActionsHandler} disabled={false}>
              Cambia password
            </Button>
          </Col>

          <Col sm={12}>
            <Button variant="danger w-100" onClick={showDeleteActionsHandler} aria-controls="delete-user-btns">
              Cancella profilo
            </Button>
          </Col>
        </Row>

        {error && (
          <Alert ref={errorRef} variant="danger" className="mt-3">
            {error}
          </Alert>
        )}

        {successMessage && (
          <Alert ref={successRef} variant="success" className="mt-3">
            {successMessage}
          </Alert>
        )}

        {/* Sezione cambio password */}
        {showChangePasswordActions && (
          <Form noValidate validated={formValidated}>
            <Row className="mb-2">
              <Col sm={12}>
                <Form.Group controlId="new-password">
                  <Form.Label>Nuova Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci la tua nuova password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                    isInvalid={formValidated && !!passwordChangeError}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{passwordChangeError}</Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={12}>
                <Form.Group controlId="confirm-new-password">
                  <Form.Label>Conferma Nuova Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Conferma la tua nuova password"
                    value={confirmNewPassword}
                    onChange={handleConfirmNewPasswordChange}
                    isInvalid={formValidated && !!passwordChangeError}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{passwordChangeError}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-1" id="change-password-btns">
              <Col sm={6}>
                <Button
                  variant="success"
                  className="w-100"
                  type="button"
                  onClick={() => {
                    setFormValidated(true);
                    if (isChangePasswordFormValid) changePasswordHandler(); // Solo se il form è valido
                  }}
                  disabled={!isChangePasswordFormValid} // Disabilita il pulsante se il form non è valido
                >
                  Conferma Cambio Password
                </Button>
              </Col>

              <Col sm={6}>
                <Button variant="secondary" className="w-100" type="button" onClick={onResetHandler}>
                  Annulla Operazione
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        {/* Sezione cancellazione dell'account */}
        {showDeleteActions && (
          <Form noValidate validated={formValidated}>
            <Row className="mb-2">
              <Col sm={12}>
                <Form.Group controlId="delete-password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci la tua password"
                    value={deletePassword}
                    onChange={handleDeletePasswordChange}
                    isInvalid={formValidated && !!deletePasswordError}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{deletePasswordError}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-1" id="delete-user-btns">
              <Col sm={6}>
                <Button
                  variant="danger"
                  className="w-100"
                  type="button"
                  onClick={() => {
                    setFormValidated(true);
                    if (isDeleteFormValid) onDeleteHandler(); // Solo se il form è valido
                  }}
                  disabled={!isDeleteFormValid} // Disabilita il pulsante se il form non è valido
                >
                  Cancella per sempre il tuo profilo - operazione irreversibile
                </Button>
              </Col>

              <Col sm={6}>
                <Button variant="secondary" className="w-100" type="button" onClick={onResetHandler}>
                  Annulla operazione
                </Button>
              </Col>
            </Row>
          </Form>
        )}

        {showChangePasswordActions === false && showDeleteActions === false && <WebsiteForm type="state" />}
      </Card>
    </Container>
  );
}
