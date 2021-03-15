import {Provider} from 'react-redux';
import { store } from '../state';
import FlightsList from './FlightsList';
import '../fonts.css'

const App: React.FC = () => {
    return <Provider store = {store}> 
    <div> 
        <FlightsList />
    </div>
    </Provider>
}

export default App;