import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RootState } from "../state";
import "../fonts.css";

const Airports: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  const [airport_name, setAirport_name] = useState("");
  const selector = useSelector((state: RootState) => state);
  const { data } = selector.airportrepo;
  const { error, loading } = useTypedSelector(
    (state: any) => state.airportrepo
  );
  const { getAirportDetails } = useActions();
  const name = data?.name?.[0];
  const code = data?.code?.[0];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAirportDetails(airport_name);
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleClick}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link> Routes </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br /> <br />
      <div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
        <h1> Airport List</h1>
        <br />
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Control
                type="text"
                value={airport_name}
                onChange={(e) => setAirport_name(e.target.value)}
                placeholder="Search for a city or airport"
              />
              <Col md="auto"></Col>
            </Form>
          </Col>
        </Row>
      </div>
      <br />
      <br />
      {error && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Alert variant="danger">
            <Alert.Heading>Oh snap! That's bad :(</Alert.Heading>
            <p>{error}</p>
          </Alert>
        </div>
      )}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Spinner
            style={{ alignSelf: "center" }}
            animation="border"
            role="status"
            variant="primary"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {!loading && !error && (
        <Col style={{ paddingLeft: "15%", paddingRight: "15%" }}>
          <div
            style={{ cursor: "pointer", fontSize: "25px" }}
            onClick={handleShow}
          >
            {name} {code}
          </div>
          <Modal show={show} centered backdrop="static" size= "lg">
            <Modal.Header>
              <Modal.Title>{name} Airport</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Woohoo, you're reading this text in a modal!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      )}
    </div>
  );
};

export default Airports;
