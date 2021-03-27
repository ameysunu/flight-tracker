import { GetAirportAction } from "../actions";
import { GetAirportData } from "../action-types";

interface GetAirportState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const airportdatareducer = (
  state: GetAirportState = initialState,
  action: GetAirportAction
): GetAirportState => {
  switch (action.type) {
    case GetAirportData.GET_AIRPORT:
      return { loading: true, error: null, data: [] };

    case GetAirportData.GET_AIRPORT_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case GetAirportData.GET_AIRPORT_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default airportdatareducer;
