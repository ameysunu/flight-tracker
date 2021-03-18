import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';

const FlightDetails: React.FC = () => {
    
    let location = useLocation<{
        state: unknown;
    }>();

    const history = useHistory();

    const handleClick = () =>{
        history.push('/')
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
        <h1>{location.state}</h1>
    </div>
}

export default FlightDetails;