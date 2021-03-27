import { combineReducers } from "redux";
import repositoryReducer from "./repositoryReducer";
import airlineReducer from "./airlineReducer";
import airportreducer from "./airportReducer";
import airportdatareducer from "./airportData";

const reducers = combineReducers({
  repositories: repositoryReducer,
  airlinerepo: airlineReducer,
  airportrepo: airportreducer,
  airportdatarepo: airportdatareducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
