import axios from "axios";
import { Dispatch } from "redux";
import {
  ActionType,
  AirlineActionType,
  AirportActionType,
  GetAirportData,
  GetRoutes,
} from "../action-types";
import {
  Action,
  AirlineAction,
  AirportAction,
  GetAirportAction,
  GetRoutesAction,
} from "../actions";

export const getAirport = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.SEARCH_FLIGHTS,
    });

    try {
      const { data } = await axios.get(`http://airlabs.co/api/v7/airlines`, {
        params: {
          api_key: process.env.REACT_APP_AVLABS_KEY,
          name: term,
        },
      });

      const names = data.response.map((result: any) => {
        if (result.iata_code === null) {
          return result.name;
        } else return result.name;
      });

      dispatch({
        type: ActionType.SEARCH_FLIGHTS_SUCCESS,
        payload: names,
      });
    } catch (err) {
      dispatch({
        type: ActionType.SEARCH_FLIGHTS_ERROR,
        payload: err.message,
      });

      console.log(err);
    }
  };
};

export const getAirline = (airline_name: string) => {
  return async (dispatch: Dispatch<AirlineAction>) => {
    dispatch({
      type: AirlineActionType.SEARCH_AIRLINE,
    });

    try {
      const { data } = await axios.get(
        `http://api.aviationstack.com/v1/airlines`,
        {
          params: {
            access_key: process.env.REACT_APP_AVSTACK_KEY,
            airline_name: airline_name,
          },
        }
      );

      const flightname = data.data.map((result: any) => {
        return result.airline_name;
      });

      const iata = data.data.map((result: any) => {
        return result.iata_code;
      });

      const city = data.data.map((result: any) => {
        return result.country_name;
      });

      const fleet = data.data.map((result: any) => {
        return result.fleet_size;
      });

      const icao = data.data.map((result: any) => {
        return result.icao_code;
      });

      const callsign = data.data.map((result: any) => {
        return result.callsign;
      });
      dispatch({
        type: AirlineActionType.SEARCH_AIRLINE_SUCCESS,
        payload: {
          icao: icao,
          flightname: flightname,
          iata: iata,
          city: city,
          fleet: fleet,
          callsign: callsign,
        },
      });
    } catch (err) {
      dispatch({
        type: AirlineActionType.SEARCH_AIRLINE_ERROR,
        payload: err.message,
      });

      console.log(err);
    }
  };
};

export const getAirportDetails = (airport_name: string) => {
  return async (dispatch: Dispatch<AirportAction>) => {
    dispatch({
      type: AirportActionType.SEARCH_AIRPORT,
    });

    try {
      const { data } = await axios.get(
        `http://airlabs.co/api/v6/autocomplete?api_key=15c6d234-e87f-4224-a1e5-07d5161d4295`,
        {
          params: {
            query: airport_name,
          },
        }
      );

      const code = data.response.airports.map((result: any) => {
        return result.code;
      });

      const name = data.response.airports.map((result: any) => {
        return result.name;
      });

      dispatch({
        type: AirportActionType.SEARCH_AIRPORT_SUCCESS,
        payload: {
          code: code,
          name: name,
        },
      });
    } catch (err) {
      dispatch({
        type: AirportActionType.SEARCH_AIRPORT_ERROR,
        payload: err.message,
      });

      console.log(err);
    }
  };
};

export const getAirportData = (airport_name: string) => {
  return async (dispatch: Dispatch<GetAirportAction>) => {
    dispatch({
      type: GetAirportData.GET_AIRPORT,
    });

    try {
      const { data } = await axios.get(
        `http://api.aviationstack.com/v1/airports?access_key=b3dbfb353ff0bc5f4b22ff8c10f02e3e`,
        {
          params: {
            airport_name: airport_name,
          },
        }
      );

      const gmt = data.data.map((result: any) => {
        return result.gmt;
      });

      const flag = data.data.map((result: any) => {
        return result.country_iso2;
      });

      const iata_code = data.data.map((result: any) => {
        return result.iata_code;
      });

      const icao_code = data.data.map((result: any) => {
        return result.icao_code;
      });

      const coordinates = data.data.map((result: any) => {
        return result.latitude + "," + result.longitude;
      });

      const country = data.data.map((result: any) => {
        return result.country_name;
      });

      const timezone = data.data.map((result: any) => {
        return result.timezone;
      });

      dispatch({
        type: GetAirportData.GET_AIRPORT_SUCCESS,
        payload: {
          flag: flag,
          gmt: gmt,
          iata_code: iata_code,
          icao_code: icao_code,
          coordinates: coordinates,
          country: country,
          timezone: timezone,
        },
      });
    } catch (err) {
      dispatch({
        type: GetAirportData.GET_AIRPORT_ERROR,
        payload: err.message,
      });

      console.log(err);
    }
  };
};

export const getRoutes = (
  airline_name: string,
  dep_iata: string,
  arr_iata: string,
  flight_status: string
) => {
  return async (dispatch: Dispatch<GetRoutesAction>) => {
    dispatch({
      type: GetRoutes.GET_ROUTE,
    });

    try {
      const { data } = await axios.get(
        `http://api.aviationstack.com/v1/flights?access_key=b3dbfb353ff0bc5f4b22ff8c10f02e3e`,
        {
          params: {
            airline_name: airline_name,
            arr_iata: arr_iata,
            dep_iata: dep_iata,
            flight_status: flight_status,
          },
        }
      );

      const depiata = data.data.map((result: any) => {
        return result.departure.iata;
      });

      const depairport = data.data.map((result: any) => {
        return result.departure.airport;
      });

      const deptimezone = data.data.map((result: any) => {
        return result.departure.timezone;
      });

      const depterminal = data.data.map((result: any) => {
        return result.departure.terminal;
      });

      const depscheduled = data.data.map((result: any) => {
        return result.departure.scheduled;
      });

      const depestimated = data.data.map((result: any) => {
        return result.departure.estimated;
      });

      const depactual = data.data.map((result: any) => {
        return result.departure.actual;
      });

      const arriata = data.data.map((result: any) => {
        return result.arrival.iata;
      });

      const arrairport = data.data.map((result: any) => {
        return result.arrival.airport;
      });

      const arrtimezone = data.data.map((result: any) => {
        return result.arrival.timezone;
      });

      const arrterminal = data.data.map((result: any) => {
        return result.arrival.terminal;
      });

      const arrscheduled = data.data.map((result: any) => {
        return result.arrival.scheduled;
      });

      const arrestimated = data.data.map((result: any) => {
        return result.arrival.estimated;
      });

      const arractual = data.data.map((result: any) => {
        return result.arrival.actual;
      });

      dispatch({
        type: GetRoutes.GET_ROUTE_SUCCESS,
        payload: {
          dep_airport: depairport,
          dep_iata: depiata,
          dep_timezone: deptimezone,
          dep_terminal: depterminal,
          dep_scheduled: depscheduled,
          dep_estimated: depestimated,
          dep_actual: depactual,

          arr_airport: arrairport,
          arr_iata: arriata,
          arr_timezone: arrtimezone,
          arr_terminal: arrterminal,
          arr_scheduled: arrscheduled,
          arr_estimated: arrestimated,
          arr_actual: arractual,
        },
      });
    } catch (err) {
      dispatch({
        type: GetRoutes.GET_ROUTE_ERROR,
        payload: err.message,
      });

      console.log(err);
    }
  };
};
