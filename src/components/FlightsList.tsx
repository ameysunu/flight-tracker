import {useState} from 'react';
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useActions} from '../hooks/useActions';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';

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
            <Form onSubmit= {onSubmit}>
                <input value={term} onChange= {e => setTerm(e.target.value)} />
                <br /><br />
                <Button type = "submit">Search</Button>
                </Form>
                <br /><br />
             {error && <h3>{error}</h3>}
             {loading && <div>Loading... </div>}
             {!error && !loading && data.map((name: any)=> <div key = {name}>{name}</div>)}    
        </div>
    );

}

export default FlightsList;