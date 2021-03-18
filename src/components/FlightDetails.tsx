import {useHistory} from 'react-router-dom'; ;

const FlightDetails = () => {
    const history = useHistory();

    const handleClick = () =>{
        history.push('/')
    }

    return <div> 
        <h1>Test Router</h1>
        <button onClick= {handleClick}> Bacccc </button>
    </div>
}

export default FlightDetails;