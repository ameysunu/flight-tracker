import { combineReducers } from "redux";
import repositoryReducer from "./repositoryReducer";
import airlineReducer from "./airlineReducer";
import airportreducer from "./airportReducer";

const reducers = combineReducers({
  repositories: repositoryReducer,
  airlinerepo: airlineReducer,
  airportrepo: airportreducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
