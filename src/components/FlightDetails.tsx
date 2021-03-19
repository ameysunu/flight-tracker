import React from 'react';
import axios from 'axios';
import { Nav, Navbar, Row, Col } from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';


const FlightDetails: React.FC = () => {
    
    let location = useLocation<{
        state: unknown;
    }>();

    const history = useHistory();

    const handleClick = () =>{
        flightComponents();
        history.push('/')
    }

    const flightComponents = async() => {
        const {data} = await axios.get(`http://api.aviationstack.com/v1/airlines?access_key=3df13bb497027140f6265e1ca76d20ba`, {
            params:{
                airline_name:location.state
            }
          
        });
        
        const names = data.data.map((result: any) => {
            return result.airline_name;
        });

        const city = data.data.map((result: any) => {
            return result.country_name;
        });


        console.log(names + city);
        }

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
                <Col>{location.state}</Col>
                <Col>2 of 2</Col>
                </Row>
                </div>
        {/* <h1>{location.state}</h1> */}
    </div>
}

export default FlightDetails;