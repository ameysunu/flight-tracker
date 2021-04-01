import {
  ActionType,
  AirlineActionType,
  AirportActionType,
  GetAirportData,
  GetRoutes,
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

interface GetAirportDataAction {
  type: GetAirportData.GET_AIRPORT;
}

interface GetAirportSuccessData {
  type: GetAirportData.GET_AIRPORT_SUCCESS;
  payload: {
    flag: string;
    gmt: string;
    iata_code: string;
    icao_code: string;
    coordinates: string;
    country: string;
    timezone: string;
  };
}

interface GetAirportErrorData {
  type: GetAirportData.GET_AIRPORT_ERROR;
  payload: string;
}

interface GetRouteData {
  type: GetRoutes.GET_ROUTE;
}

interface GetRouteSuccessData {
  type: GetRoutes.GET_ROUTE_SUCCESS;
  payload: {
    dep_airport: string;
    dep_iata: string;
    dep_timezone: string;
    dep_terminal: string;
    dep_scheduled: string;
    dep_estimated: string;
    dep_actual: string;

    arr_airport: string;
    arr_iata: string;
    arr_timezone: string;
    arr_terminal: string;
    arr_scheduled: string;
    arr_estimated: string;
    arr_actual: string;

    flightnum: string;
    flighticao: string;
    airlinename: string;
    airlineiata: string;
    flightstatus: string;

    
    codeairline: string;
    codeairlineiata: string;
    codeflight: string;
  };
}

interface GetRouteErrorData {
  type: GetRoutes.GET_ROUTE_ERROR;
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

export type GetAirportAction =
  | GetAirportDataAction
  | GetAirportSuccessData
  | GetAirportErrorData;

export type GetRoutesAction =
  | GetRouteData
  | GetRouteSuccessData
  | GetRouteErrorData;
