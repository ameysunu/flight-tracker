import axios from "axios";
import { Dispatch } from "redux";
import {
  ActionType,
  AirlineActionType,
  AirportActionType,
} from "../action-types";
import { Action, AirlineAction, AirportAction } from "../actions";

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
      const { data } = await axios.get(`http://airlabs.co/api/v7/airlines`, {
        params: {
          api_key: process.env.REACT_APP_AVLABS_AIRPORT_KEY,
          airport_name: airport_name,
        },
      });

      const iata = data.response.map((result: any) => {
        return result.iata_code;
      });

      const gmt = data.response.map((result: any) => {
        return result.gmt;
      });

      const icao = data.response.map((result: any) => {
        return result.icao_code;
      });

      const countrycode = data.response.map((result: any) => {
        return result.country_iso2;
      });

      const country = data.response.map((result: any) => {
        return result.country_name;
      });

      const airport = data.response.map((result: any) => {
        return result.airport_name;
      });

      const coordinates = data.response.map((result: any) => {
        return result.latitude + result.longitude;
      });
      const timezone = data.response.map((result: any) => {
        return result.timezone;
      });

      dispatch({
        type: AirportActionType.SEARCH_AIRPORT_SUCCESS,
        payload: {
          icao: icao,
          gmt: gmt,
          countrycode: countrycode,
          country: country,
          airportname: airport,
          coordinate: coordinates,
          timezone: timezone,
          iata: iata,
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
