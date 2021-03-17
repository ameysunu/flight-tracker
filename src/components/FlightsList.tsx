import {useState} from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Navbar, Card, Spinner, Alert, Nav, Col} from 'react-bootstrap';

const FlightsList: React.FC = () => {

    const [term, setTerm] = useState('');
    const {getAirport} = useActions();
    const {data, error, loading} = useTypedSelector((state:any)=> state.repositories);


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getAirport(term);
    }

    return(
        <div>
            <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Flight Tracker</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link>Airports</Nav.Link>
            </Nav>
                </Navbar>
                <br /><br />
            <Form onSubmit= {onSubmit} style = {{position: "fixed", left: "20%", right: "20%"}}>
                <Form.Row> 
                    <Col><Form.Control value ={term} onChange= {e => setTerm(e.target.value)} type="text" placeholder="Search for an airline" className="mr-sm-2" /></Col>
                    <Col><Button variant="outline-info" type = "submit">Search</Button></Col>
                </Form.Row>
                </Form>
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
            {!error && !loading && data.map((name: any)=> <div key = {name} style ={{padding: "10px", alignItems: "center"}}>
            <Card>
                <Card.Body>{name}</Card.Body>
            </Card>
             </div>)}    
        </div>
    );

}

export default FlightsList;