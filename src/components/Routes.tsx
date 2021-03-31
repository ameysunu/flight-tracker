import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RootState } from "../state";
import { getRoutes } from "../state/action-creators";

const Routes: React.FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  const [airlinename, setAirlinename] = useState("");
  const [airlineiata, setAirlineiata] = useState("");
  const [arrivaliata, setArrivaliata] = useState("");
  const [status, setStatus] = useState("");
  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { done } = selector.routerepo;
  const { load, error } = useTypedSelector((state: any) => state.routerepo);

  const dep_iata = done?.dep_iata?.[0];
  const arr_iata = done?.arr_iata?.[0];
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getRoutes(airlinename, airlineiata, arrivaliata, status));
    console.log(dep_iata);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Help</Popover.Title>
      <Popover.Content>
        If you are having trouble finding airline name and IATA, then head back
        to use our <strong>airport</strong> and <strong>airline</strong> finder.
      </Popover.Content>
    </Popover>
  );

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleClick}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/airports" className="nav-link">
              {" "}
              Airports{" "}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br /> <br />
      <div style={{ paddingLeft: "15%", paddingRight: "15%" }}>
        <h1> Find a route</h1>
        <br />
        <Row>
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Control
                value={airlinename}
                onChange={(e) => setAirlinename(e.target.value)}
                type="text"
                placeholder="Enter an airline"
              />
              <br />
              <Form.Control
                value={airlineiata}
                onChange={(e) => setAirlineiata(e.target.value)}
                type="text"
                placeholder="Enter departure airport IATA"
              />
              <br />
              <Row>
                <Col>
                  <Form.Control
                    value={arrivaliata}
                    onChange={(e) => setArrivaliata(e.target.value)}
                    type="text"
                    placeholder="Enter arrival airport IATA"
                  />
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="active">Active</option>
                    <option value="landed">Landed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="incident">Incident</option>
                    <option value="diverted">Diverted</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Button block variant="primary" type="submit">
                    {" "}
                    Search{" "}
                  </Button>
                </Col>
              </Row>

              <Col md="auto"></Col>
            </Form>
          </Col>
        </Row>
        <br />
        <br />

        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button variant="light"> Help? </Button>
        </OverlayTrigger>
      </div>
      {load && (
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
            variant="primary"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      )}
      {error && (
        <div
          style={{
            position: "fixed",
            top: "70%",
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
      {!load && !error && (
        <div>
          <ul>{dep_iata}</ul>
          <ul>{arr_iata}</ul>
        </div>
      )}
    </div>
  );
};

export default Routes;
