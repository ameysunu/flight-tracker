import { AirportAction } from "../actions";
import { AirportActionType } from "../action-types";

interface AirportState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const airportreducer = (
  state: AirportState = initialState,
  action: AirportAction
): AirportState => {
  switch (action.type) {
    case AirportActionType.SEARCH_AIRPORT:
      return { loading: true, error: null, data: [] };

    case AirportActionType.SEARCH_AIRPORT_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case AirportActionType.SEARCH_AIRPORT_ERROR:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default airportreducer;
