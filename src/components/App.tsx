import { Provider } from "react-redux";
import { store } from "../state";
import FlightsList from "./FlightsList";
import "../fonts.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import FlightDetails from "./FlightDetails";
import NotFound from "./NotFound";
import Airports from "./Airports";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={FlightsList} />
          <Route exact path="/details" component={FlightDetails} />
          <Route exact path="/airports" component={Airports} />
          <Route component={NotFound} />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
