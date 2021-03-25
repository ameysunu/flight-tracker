import {
  ActionType,
  AirlineActionType,
  AirportActionType,
} from "../action-types";

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

interface SearchAirlineAction {
  type: AirlineActionType.SEARCH_AIRLINE;
}

interface SearchAirlineSuccessAction {
  type: AirlineActionType.SEARCH_AIRLINE_SUCCESS;
  payload: {
    icao: string;
    flightname: string;
    iata: string;
    city: string;
    fleet: string;
    callsign: string;
  };
}

interface SearchAirlineErrorAction {
  type: AirlineActionType.SEARCH_AIRLINE_ERROR;
  payload: string;
}

interface SearchAirportAction {
  type: AirportActionType.SEARCH_AIRPORT;
}

interface SearchAirportSuccessAction {
  type: AirportActionType.SEARCH_AIRPORT_SUCCESS;
  payload: {
    name: string;
    code: string;
  };
}

interface SearchAirportErrorAction {
  type: AirportActionType.SEARCH_AIRPORT_ERROR;
  payload: string;
}

export type Action =
  | SearchFlightsAction
  | SearchFlightsSuccessAction
  | SearchFlightsErrorAction;

export type AirlineAction =
  | SearchAirlineAction
  | SearchAirlineSuccessAction
  | SearchAirlineErrorAction;

export type AirportAction =
  | SearchAirportAction
  | SearchAirportSuccessAction
  | SearchAirportErrorAction;
