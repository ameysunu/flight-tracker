import {useState} from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Navbar, Card, Spinner} from 'react-bootstrap';

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
            <Form inline className="mr-sm-2" onSubmit= {onSubmit}>
            <Form.Control value ={term} onChange= {e => setTerm(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info" type = "submit">Search</Button>
                </Form>
                </Navbar>
                <br /><br />
             {error && <h3>{error}</h3>}
             {loading && 
            <div style = {{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>
            <Spinner style ={{alignSelf:'center'}} animation="border" role="status" variant="primary" >
            <span className="sr-only">Loading...</span>
            </Spinner>     
            </div>}
            {!error && !loading && data.map((name: any)=> <div key = {name} style ={{padding: "10px", alignItems: "center"}}>
            <Card style = {{width: "18rem"}}>
                <Card.Body>
                <Card.Title>{name}</Card.Title>
                    <Card.Text>
                This is a wider card with supporting text below as a natural lead-in to
                additional content. This content is a little bit longer.
                    </Card.Text>
                </Card.Body>
            </Card>
             </div>)}    
        </div>
    );

}

export default FlightsList;