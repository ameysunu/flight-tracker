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
import { Link, useHistory } from "react-router-dom";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RootState } from "../state";
import "../fonts.css";

const Airports: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getAirportData(name);
    setShow(true);
  };

  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  const [airport_name, setAirport_name] = useState("");
  const selector = useSelector((state: RootState) => state);
  const { data } = selector.airportrepo;
  const { value } = selector.airportdatarepo;
  const { errorhandler, loader } = useTypedSelector(
    (state: any) => state.airportdatarepo
  );
  const { error, loading } = useTypedSelector(
    (state: any) => state.airportrepo
  );
  const { getAirportDetails, getAirportData } = useActions();
  const name = data?.name?.[0];
  const code = data?.code?.[0];
  const iata_code = value?.iata_code?.[0];
  const gmt = value?.gmt?.[0];
  const flag = value?.flag?.[0];
  const icao = value?.icao_code?.[0];
  const coordinates = value?.coordinates?.[0];
  const country = value?.country?.[0];
  const timezone = value?.timezone?.[0];

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAirportDetails(airport_name);
  };

  const countryFlag = `https://www.countryflags.io/${flag}/flat/64.png`;

  return (
    <div style={{ backgroundColor: "black", color: "white" }}>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#212121" }}
        variant="dark"
      >
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleClick}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/routes" className="nav-link">
              {" "}
              Routes{" "}
            </Link>
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
                placeholder="Search for a city, airport or IATA code"
                style={{ backgroundColor: "black", color: "white" }}
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
            variant="light"
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

          {loader && (
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
                animation="grow"
                role="status"
                variant="light"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
          {errorhandler && (
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
                <p>{errorhandler}</p>
              </Alert>
            </div>
          )}
          {!errorhandler && !loader && (
            <Modal show={show} centered backdrop="static" size="lg">
              <Modal.Header
                style={{ color: "white", backgroundColor: "#212121" }}
              >
                <Modal.Title>{name} Airport</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ color: "white", backgroundColor: "black" }}>
                GMT: {gmt} <br />
                IATA: {iata_code} <br />
                ICAO: {icao} <br />
                Coordinates: {coordinates} <br />
                Timezone: {timezone} <br />
                Country: {country}{" "}
                <img src={countryFlag} width="25px" alt="flag"></img> <br />
              </Modal.Body>
              <Modal.Footer
                style={{ color: "white", backgroundColor: "#212121" }}
              >
                <Button variant="outline-light" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </Col>
      )}
    </div>
  );
};

export default Airports;
