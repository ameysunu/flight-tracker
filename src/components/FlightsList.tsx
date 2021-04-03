import { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Navbar,
  Card,
  Spinner,
  Alert,
  Nav,
  Jumbotron,
} from "react-bootstrap";

const FlightsList: React.FC = () => {
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);
  const [greeting, setGreeting] = useState("");
  const { getAirport } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state: any) => state.repositories
  );
  const { getAirline } = useActions();

  useEffect(() => {
    var d = new Date();
    var hours = d.getHours();

    if (hours < 12) {
      setGreeting("Good Morning!");
    } else if (hours < 18) {
      setGreeting("Good Afternoon!");
    } else {
      setGreeting("Good Evening!");
    }
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getAirport(term);
  };
  const handleClose = () => setShow(false);
  const openPop = () => setShow(true);

  return (
    <div style={{ backgroundColor: "black" }}>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{ backgroundColor: "#212121" }}
      >
        <Navbar.Brand href="#home">Flight Tracker</Navbar.Brand>
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
          <Form inline className="mr-sm-2" onSubmit={onSubmit}>
            <Form.Control
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              type="text"
              placeholder="Search for an airline"
              className="mr-sm-2"
            />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ backgroundColor: "black", height: "50px" }}> </div>
      <div
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          backgroundColor: "black",
        }}
      >
        <Jumbotron className="jumbotron">
          <h1 style={{ color: "white" }}>{greeting}</h1>
          <p style={{ color: "white" }}>
            Begin by searching for an airline, airports or even live routes.
          </p>
          <p>
            <Button variant="outline-light" onClick={openPop}>
              Learn more
            </Button>
          </p>
        </Jumbotron>

        <Alert show={show} variant="success" onClose={handleClose} dismissible>
          <Alert.Heading>Hello! 👋 </Alert.Heading>
          <p>
            You can begin by searching any Airline Name, Airport Name and even
            an aircraft route. If you don't find your desired route, make sure
            that you have entered the correct aircraft name and IATA code.
          </p>
          <hr />
          <p className="mb-0">
            All routes found are active, scheduled or landed, depending on your
            preference.
          </p>
        </Alert>
      </div>
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
      {!error &&
        !loading &&
        data.map((name: any) => (
          <div
            key={name}
            style={{
              padding: "10px",
              alignItems: "center",
              cursor: "pointer",
              backgroundColor: "black",
            }}
          >
            <Link
              onClick={() => getAirline(name)}
              to={{
                pathname: "/details",
                state: name,
              }}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Card border="light" style={{ backgroundColor: "black" }}>
                <Card.Body>{name}</Card.Body>
              </Card>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default FlightsList;
