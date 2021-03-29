import React from "react";
import {
  Button,
  Col,
  Form,
  Nav,
  Navbar,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const Routes: React.FC = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
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
            <Form>
              <Form.Control type="text" placeholder="Enter an airline" />
              <br />
              <Form.Control
                type="text"
                placeholder="Enter departure airport IATA"
              />
              <br />
              <Row>
                <Col>
                  <Form.Control as="select" defaultValue="Flight Status">
                    <option>All</option>
                    <option>Scheduled</option>
                    <option>Active</option>
                    <option>Landed</option>
                    <option>Cancelled</option>
                    <option>Incident</option>
                    <option>Diverted</option>
                  </Form.Control>
                </Col>
                <Col>
                  <Button variant="primary"> Search </Button>
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
    </div>
  );
};

export default Routes;
