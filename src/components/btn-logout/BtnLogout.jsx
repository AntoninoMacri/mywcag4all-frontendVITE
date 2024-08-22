import * as React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/accessibility-dev/log-in");
  };

  return (
    <Row className="m-0 p-0">
      <Col className="text-center m-0 p-0">
        <Button className="w-75 " variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      </Col>
    </Row>
  );
};

export default LogoutButton;
