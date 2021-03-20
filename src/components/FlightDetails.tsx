import React, { useEffect } from "react";
import { Nav, Navbar, Row, Col, Card } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAirline } from "../state/action-creators";
import { RootState } from "../state";

const FlightDetails: React.FC = () => {
  let location = useLocation<{
    state: unknown;
  }>();

  const history = useHistory();
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

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
  const callSign = data?.callsign?.[0];

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={handleClick}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link> Airports </Nav.Link>
            <Nav.Link> Routes </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
      <div style={{ paddingLeft: "10%" }}>
        <Row>
          <Col>
            <Card>
              <Card.Header> Airline Details</Card.Header>
              <Card.Body>
                <Card.Title>{location.state}</Card.Title>
                <Card.Text>
                  Country: {city} <br />
                  IATA: {iata} <br />
                  Call Sign : {callSign} <br />
                  Fleet: {fleet}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FlightDetails;
