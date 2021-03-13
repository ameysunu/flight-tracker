import {Provider} from 'react-redux';
import { store } from '../state';
import FlightsList from './FlightsList';

const App: React.FC = () => {
    return <Provider store = {store}> 
    <div> 
        <h1> I'm alive. </h1>
        <FlightsList />
    </div>
    </Provider>
}

export default App;