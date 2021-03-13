import {ActionType} from '../action-types';

interface SearchFlightsAction {
    type: ActionType.SEARCH_FLIGHTS;
  }
  
  interface SearchFlightsSuccessAction {
    type: ActionType.SEARCH_FLIGHTS_SUCCESS;
    payload: string[];
  }
  
  interface SearchFlightsErrorAction {
    type: ActionType.SEARCH_FLIGHTS_ERROR;
    payload: string;
  }
  

export type Action= SearchFlightsAction | SearchFlightsSuccessAction | SearchFlightsErrorAction