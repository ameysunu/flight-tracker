import {AirlineAction} from '../actions';
import {AirlineActionType} from '../action-types';

  interface AirlineState {
    loading: boolean;
    error: string | null;
    data: any;
  }

  const initialState = {
    loading: false,
    error: null,
    data: []
  }

const airlinereducer = (state: AirlineState = initialState, action: AirlineAction): AirlineState => {

    switch(action.type){
        case AirlineActionType.SEARCH_AIRLINE: 
            return {loading: true, error: null, data: []}

        case AirlineActionType.SEARCH_AIRLINE_SUCCESS:
            return {loading: false, error: null, data: action.payload} 

        case AirlineActionType.SEARCH_AIRLINE_ERROR:
            return {loading: false, error: action.payload, data: [] }
        default:
            return state;
    }

}

export default airlinereducer;