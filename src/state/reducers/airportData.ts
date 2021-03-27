import { GetAirportAction } from "../actions";
import { GetAirportData } from "../action-types";

interface GetAirportState {
  loader: boolean;
  errorhandler: string | null;
  value: any;
}

const initialState = {
  loader: false,
  errorhandler: null,
  value: [],
};

const airportdatareducer = (
  state: GetAirportState = initialState,
  action: GetAirportAction
): GetAirportState => {
  switch (action.type) {
    case GetAirportData.GET_AIRPORT:
      return { loader: true, errorhandler: null, value: [] };

    case GetAirportData.GET_AIRPORT_SUCCESS:
      return { loader: false, errorhandler: null, value: action.payload };

    case GetAirportData.GET_AIRPORT_ERROR:
      return { loader: false, errorhandler: action.payload, value: [] };
    default:
      return state;
  }
};

export default airportdatareducer;
