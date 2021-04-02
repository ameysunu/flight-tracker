import { combineReducers } from "redux";
import repositoryReducer from "./repositoryReducer";
import airlineReducer from "./airlineReducer";
import airportreducer from "./airportReducer";
import airportdatareducer from "./airportData";
import routereducer from "./routeData";
import weatherreducer from "./weatherReducer";

const reducers = combineReducers({
  repositories: repositoryReducer,
  airlinerepo: airlineReducer,
  airportrepo: airportreducer,
  airportdatarepo: airportdatareducer,
  routerepo: routereducer,
  weatherrepo: weatherreducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
