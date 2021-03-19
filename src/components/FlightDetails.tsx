import React, { useState } from 'react';
import axios from 'axios';
import { Nav, Navbar, Row, Col, Card } from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';


const FlightDetails: React.FC = () => {
    
    let location = useLocation<{
        state: unknown;
    }>();

    const history = useHistory();

    const handleClick = () =>{
        history.push('/')
    }

    const [city, setCity] = useState('');
    const [iata, setIATA] = useState('');
    const [fleet, setFleet] = useState('');
    const [callSign, setCallSign] = useState('');

    const flightComponents = async() => {
        const {data} = await axios.get(`http://api.aviationstack.com/v1/airlines?access_key=bcf3ccc2dbe7d4bb39f475a6042ded9a`, {
            params:{
                airline_name:location.state
            }
          
        });
        
        const iata = data.data.map((result: any) => {
            return result.iata_code;
        });

       const city = data.data.map((result: any) => {
            return result.country_name;
        });

        const fleet = data.data.map((result: any) => {
            return result.fleet_size;
        });

        const callsign = data.data.map((result: any) => {
            return result.callsign;
        })

        setCity(city);
        setIATA(iata);
        setFleet(fleet);
        setCallSign(callsign);

        }
     
        flightComponents();  

    return <div> 
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand style = {{cursor: "pointer"}} onClick= {handleClick}>Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link> Airports </Nav.Link>
            <Nav.Link> Routes </Nav.Link>
            </Nav>

                </Navbar.Collapse>
                </Navbar>
                <br /><br />
                <div style ={{paddingLeft: "10%"}}>
                <Row>
                {/* <Col>{location.state}</Col> */}
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
                <Col>2 of 2</Col>
                </Row>
                </div>
    </div>
}

export default FlightDetails;