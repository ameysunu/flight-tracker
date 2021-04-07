import { GetAirportIATAAction } from "../actions";
import { GetAirportIATA } from "../action-types";

interface GetAirportIATAState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const airportiatareducer = (
  state: GetAirportIATAState = initialState,
  action: GetAirportIATAAction
): GetAirportIATAState=> {
  switch (action.type) {
    case GetAirportIATA.GET_AIRPORT_IATA:
      return { loading: true, error: null, data: [] };

    case GetAirportIATA.GET_AIRPORT_IATA_SUCCESS:
      return { loading: true, error: null, data: action.payload };

    case GetAirportIATA.GET_AIRPORT_IATA_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default airportiatareducer;
