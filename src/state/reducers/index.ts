import {combineReducers} from 'redux';
import repositoryReducer from './repositoryReducer';
import airlineReducer from './airlineReducer';

const reducers = combineReducers({
    repositories: repositoryReducer,
    airlinerepo: airlineReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;