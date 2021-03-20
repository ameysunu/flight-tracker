import {useState} from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
import {Form, Button, Navbar, Card, Spinner, Alert, Nav} from 'react-bootstrap';

const FlightsList: React.FC = () => {

    const [term, setTerm] = useState('');
    const {getAirport} = useActions();
    const {data, error, loading} = useTypedSelector((state:any)=> state.repositories);
    const {getAirline} = useActions();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getAirport(term);
    }

    return(
        <div>
           <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="#home">Flight Tracker</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link> Airports </Nav.Link>
            <Nav.Link> Routes </Nav.Link>
            </Nav>
            <Form inline className="mr-sm-2" onSubmit= {onSubmit}>
            <Form.Control value ={term} onChange= {e => setTerm(e.target.value)} type="text" placeholder="Search for an airline" className="mr-sm-2" />
                <Button variant="outline-light" type = "submit">Search</Button>
                </Form>
                </Navbar.Collapse>
                </Navbar>
                <br /><br />
             {error && 
             <div style = {{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}> 
            <Alert variant="danger">
                <Alert.Heading>Oh snap! That's bad :(</Alert.Heading>
                <p>{error}</p>
            </Alert>
             </div>}
             
             {loading && 
            <div style = {{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Spinner style ={{alignSelf:'center'}} animation="border" role="status" variant="primary" >
            <span className="sr-only">Loading...</span>
            </Spinner>     
            </div>}
            {!error && !loading && data.map((name: any)=> <div key = {name} style ={{padding: "10px", alignItems: "center", cursor: "pointer"}}>
            <Link onClick = {()=> getAirline(name)} to={
                {
                    pathname: '/details',
                    state: name
                }
            } 
            style={{ textDecoration: 'none', color: 'black' }}>
            <Card>
                <Card.Body>{name}</Card.Body>
            </Card>
            </Link>
             </div>)}    
        </div>
    );

}

export default FlightsList;