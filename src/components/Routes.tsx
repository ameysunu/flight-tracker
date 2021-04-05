import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Figure,
  Form,
  Modal,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RootState } from "../state";
import { getRoutes, getWeatherDetails } from "../state/action-creators";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const Routes: React.FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [airlinename, setAirlinename] = useState("");
  const [airlineiata, setAirlineiata] = useState("");
  const [arrivaliata, setArrivaliata] = useState("");
  const [status, setStatus] = useState("");
  const selector = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { done } = selector.routerepo;
  const { val } = selector.weatherrepo;
  const { load, error } = useTypedSelector((state: any) => state.routerepo);
  const { loading, err } = useTypedSelector((state: any) => state.weatherrepo);

  const dep_iata = done?.dep_iata?.[0];
  const arr_iata = done?.arr_iata?.[0];
  const flightnum = done?.flightnum?.[0];
  const flighticao = done?.flighticao?.[0];
  const airline = done?.airlinename?.[0];
  const dep_airport = done?.dep_airport?.[0];
  const arr_airport = done?.arr_airport?.[0];
  const dep_timezone = done?.dep_timezone?.[0];
  const arr_timezone = done?.arr_timezone?.[0];
  const dep_scheduled = done?.dep_scheduled?.[0];
  const arr_scheduled = done?.arr_scheduled?.[0];
  const dep_actual = done?.dep_actual?.[0];
  const arr_estimated = done?.arr_estimated?.[0];
  const flightiata = done?.airlineiata?.[0];
  const dep_terminal = done?.dep_terminal?.[0];
  const arr_terminal = done?.arr_terminal?.[0];
  const flightstatus = done?.flightstatus?.[0];
  const codeairline = done?.codeairline?.[0];
  const codeairlineiata = done?.codeairlineiata?.[0];
  const codeflight = done?.codeflight?.[0];
  const arr_icao = done?.arr_icao?.[0];
  const name = val?.name?.[0];
  const celsius = val?.celsius?.[0];
  const fahrenheit = val?.fahrenheit?.[0];
  const visibility = val?.visibility?.[0];
  const windspeed_kts = val?.windspeed_kts?.[0];
  const clouds = val?.clouds?.[0];

  const flightImage = `https://daisycon.io/images/airline/?width=300&height=150&color=000000&iata=${flightiata}`;
  const codeImage = `https://daisycon.io/images/airline/?width=300&height=150&color=000000&iata=${codeairlineiata}`;

  const useStyles = makeStyles({
    root: {
      width: "100%",
    },
  });

  const classes = useStyles();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(getRoutes(airlinename, airlineiata, arrivaliata, status));
    console.log(dep_iata);
    setShow(true);
  };

  const weatherTap = () => {
    dispatch(getWeatherDetails(arr_icao));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title
        as="h3"
        style={{ backgroundColor: "#212121", color: "white" }}
      >
        Help
      </Popover.Title>
      <Popover.Content style={{ backgroundColor: "black", color: "white" }}>
        If you are having trouble finding airline name and IATA, then head back
        to use our <strong>airport</strong> and <strong>airline</strong> finder.
      </Popover.Content>
    </Popover>
  );

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
                style={{ backgroundColor: "black", color: "white" }}
              />
              <br />
              <Form.Control
                value={airlineiata}
                onChange={(e) => setAirlineiata(e.target.value)}
                type="text"
                placeholder="Enter departure airport IATA"
                style={{ backgroundColor: "black", color: "white" }}
              />
              <br />
              <Row>
                <Col>
                  <Form.Control
                    value={arrivaliata}
                    onChange={(e) => setArrivaliata(e.target.value)}
                    type="text"
                    placeholder="Enter arrival airport IATA"
                    style={{ backgroundColor: "black", color: "white" }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ backgroundColor: "black", color: "white" }}
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
          <Button variant="dark"> Help? </Button>
        </OverlayTrigger>
      </div>
      <br />
      <br />
      {load && (
        <div
          className={classes.root}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            paddingLeft: "20%",
            paddingRight: "20%",
          }}
        >
          <LinearProgress />
          {/* <Spinner
            style={{ alignSelf: "center" }}
            animation="grow"
            role="status"
            variant="primary"
          >
            <span className="sr-only">Loading...</span>
          </Spinner> */}
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
      {!error && !load && (
        <Modal show={show} centered backdrop="static" size="lg">
          {/* <Tabs defaultActiveKey="flight" id="uncontrolled-tab-example">
            <Tab eventKey="flight" title="Flight">
              <Modal.Header
                style={{ backgroundColor: "black", color: "white" }}
              >
                <Modal.Title>
                  {flightnum}/{flighticao} <h6>{airline}</h6>{" "}
                </Modal.Title>
                <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt={flightiata}
                    src={flightImage}
                  />
                </Figure>
              </Modal.Header>
              <Modal.Body>
                <Table
                  striped
                  bordered
                  hover
                  variant="dark"
                  responsive
                  borderless
                >
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>
                        <h3>{dep_iata}</h3> {dep_airport}{" "}
                        <h6> {dep_timezone}</h6>{" "}
                      </th>
                      <th style={{ textAlign: "center" }}>
                        <h3>{arr_iata}</h3> {arr_airport}{" "}
                        <h6> {arr_timezone}</h6>{" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        Terminal: {dep_terminal}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {" "}
                        Terminal: {arr_terminal}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        SCHEDULED: {dep_scheduled}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        SCHEDULED: {arr_scheduled}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ textAlign: "center" }}>
                        ACTUAL: {dep_actual}{" "}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        ESTIMATED: {arr_estimated}{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                Status: {flightstatus}
                <br /> <br />
                <h2> Codeshare Flight </h2>
                <Table striped bordered hover responsive borderless>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>
                        <img
                          width="80"
                          src={codeImage}
                          alt={codeairlineiata}
                        ></img>
                      </th>
                      <th style={{ textAlign: "center" }}>{codeairline}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ textAlign: "center" }}>IATA</td>
                      <td style={{ textAlign: "center" }}>{codeflight}</td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Tab>
            <Tab eventKey="weather" title="Weather" onEnter={weatherTap}>
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
              {err && (
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
              {!loading && !err && (
                <div>
                  <Modal.Header>
                    <Modal.Title>
                      <h2> {name} </h2>{" "}
                      <h5>
                        {" "}
                        {celsius}C / {fahrenheit}F
                      </h5>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Table striped bordered hover variant="dark" borderless>
                      <tbody>
                        <tr>
                          <td>Visibility: {visibility}</td>
                        </tr>
                        <tr>
                          <td>Windspeed: {windspeed_kts}</td>
                        </tr>
                        <tr>
                          <td> Humidity: {clouds}% </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </div>
              )}
            </Tab>
          </Tabs> */}
          <div
            style={{
              paddingLeft: "10px",
              paddingRight: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Flight</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Weather</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Modal.Header
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        <Modal.Title>
                          {flightnum}/{flighticao} <h6>{airline}</h6>{" "}
                        </Modal.Title>
                        <Figure>
                          <Figure.Image
                            width={171}
                            height={180}
                            alt={flightiata}
                            src={flightImage}
                          />
                        </Figure>
                      </Modal.Header>
                      <Modal.Body>
                        <Table
                          striped
                          bordered
                          hover
                          variant="dark"
                          responsive
                          borderless
                        >
                          <thead>
                            <tr>
                              <th style={{ textAlign: "center" }}>
                                <h3>{dep_iata}</h3> {dep_airport}{" "}
                                <h6> {dep_timezone}</h6>{" "}
                              </th>
                              <th style={{ textAlign: "center" }}>
                                <h3>{arr_iata}</h3> {arr_airport}{" "}
                                <h6> {arr_timezone}</h6>{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                {" "}
                                Terminal: {dep_terminal}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {" "}
                                Terminal: {arr_terminal}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                SCHEDULED: {dep_scheduled}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                SCHEDULED: {arr_scheduled}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }}>
                                ACTUAL: {dep_actual}{" "}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                ESTIMATED: {arr_estimated}{" "}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        Status: {flightstatus}
                        <br /> <br />
                        <h2> Codeshare Flight </h2>
                        <Table
                          striped
                          bordered
                          hover
                          responsive
                          borderless
                          style={{ color: "white" }}
                        >
                          <thead>
                            <tr>
                              <th style={{ textAlign: "center" }}>
                                <img
                                  width="80"
                                  src={codeImage}
                                  alt={codeairlineiata}
                                ></img>
                              </th>
                              <th style={{ textAlign: "center" }}>
                                {codeairline}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ textAlign: "center" }}>IATA</td>
                              <td style={{ textAlign: "center" }}>
                                {codeflight}
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second" onEnter={weatherTap}>
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
                      {err && (
                        <div
                          style={{
                            position: "fixed",
                            top: "70%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          <Alert variant="danger">
                            <Alert.Heading>
                              Oh snap! That's bad :(
                            </Alert.Heading>
                            <p>{error}</p>
                          </Alert>
                        </div>
                      )}
                      {!loading && !err && (
                        <div>
                          <Modal.Header>
                            <Modal.Title>
                              <h2> {name} </h2>{" "}
                              <h5>
                                {" "}
                                {celsius}C / {fahrenheit}F
                              </h5>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Table
                              striped
                              bordered
                              hover
                              variant="dark"
                              borderless
                            >
                              <tbody>
                                <tr>
                                  <td>Visibility: {visibility}</td>
                                </tr>
                                <tr>
                                  <td>Windspeed: {windspeed_kts}</td>
                                </tr>
                                <tr>
                                  <td> Humidity: {clouds}% </td>
                                </tr>
                              </tbody>
                            </Table>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </div>
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Routes;
