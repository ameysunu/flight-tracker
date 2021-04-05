import React, { useEffect } from "react";
import {
  Nav,
  Navbar,
  Col,
  Card,
  Alert,
  Spinner,
  Figure,
} from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAirline } from "../state/action-creators";
import { RootState } from "../state";
import { useTypedSelector } from "../hooks/useTypedSelector";

const FlightDetails: React.FC = () => {
  let location = useLocation<{
    state: unknown;
  }>();

  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const { error, loading } = useTypedSelector(
    (state: any) => state.airlinerepo
  );

  const handleClick = () => {
    history.push("/");
  };

  useEffect(() => {
    dispatch(getAirline(String(location.state)));
    //eslint-disable-next-line
  }, [dispatch]);

  const { data } = selector.airlinerepo;

  const city = data?.city?.[0];
  const fleet = data?.fleet?.[0];
  const iata = data?.iata?.[0];
  const icao = data?.icao?.[0];
  const callSign = data?.callsign?.[0];
  const flightname = data.flightname?.[0];

  const flightDeet = `https://daisycon.io/images/airline/?width=300&height=150&color=000000&iata=${iata}`;

  return (
    <div style={{ backgroundColor: "black" }}>
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
              Airports
            </Link>
            <Link to="/routes" className="nav-link">
              {" "}
              Routes{" "}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
      {!error && !loading && (
        <div style={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <Col>
            <Card
              border="dark"
              style={{ backgroundColor: "black", color: "white" }}
            >
              <Card.Header
                style={{ backgroundColor: "#212121", color: "white" }}
              >
                {" "}
                Airline Details
              </Card.Header>
              <Card.Body>
                <Figure style={{ backgroundColor: "black" }}>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt={flightname}
                    src={flightDeet}
                  />
                </Figure>
                <Card.Title>{flightname}</Card.Title>
                <Card.Text>
                  Country: {city} <br />
                  IATA: {iata} <br />
                  ICAO: {icao} <br />
                  Call Sign : {callSign} <br />
                  Fleet: {fleet}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </div>
      )}
    </div>
  );
};

export default FlightDetails;
