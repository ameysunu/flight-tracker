import { combineReducers } from "redux";
import repositoryReducer from "./repositoryReducer";
import airlineReducer from "./airlineReducer";
import airportreducer from "./airportReducer";
import airportdatareducer from "./airportData";
import routereducer from "./routeData";

const reducers = combineReducers({
  repositories: repositoryReducer,
  airlinerepo: airlineReducer,
  airportrepo: airportreducer,
  airportdatarepo: airportdatareducer,
  routerepo: routereducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
