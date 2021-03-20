// import {Action, AirlineAction} from '../actions';
// import {ActionType, AirlineActionType} from '../action-types';

// interface RepositoriesState {
//     loading: boolean;
//     error: string | null;
//     data: string[];
//   }

//   interface AirlineState {
//     loading: boolean;
//     error: string | null;
//     data: any;
//   }

//   const initialState = {
//     loading: false,
//     error: null,
//     data: []
//   }
  
// const reducer = (state: RepositoriesState = initialState, action: Action): RepositoriesState => {

//     switch(action.type){
//         case ActionType.SEARCH_FLIGHTS: 
//             return {loading: true, error: null, data: []}

//         case ActionType.SEARCH_FLIGHTS_SUCCESS:
//             return {loading: false, error: null, data: action.payload} 

//         case ActionType.SEARCH_FLIGHTS_ERROR:
//             return {loading: false, error: action.payload, data: [] }
//         default:
//             return state;
//     }

// }

// const airlinereducer = (state: AirlineState = initialState, action: AirlineAction): AirlineState => {

//     switch(action.type){
//         case AirlineActionType.SEARCH_AIRLINE: 
//             return {loading: true, error: null, data: []}

//         case AirlineActionType.SEARCH_AIRLINE_SUCCESS:
//             return {loading: false, error: null, data: action.payload} 

//         case AirlineActionType.SEARCH_AIRLINE_ERROR:
//             return {loading: false, error: action.payload, data: [] }
//         default:
//             return state;
//     }

// }

// export default {reducer, airlinereducer};
import {Action} from '../actions';
import {ActionType} from '../action-types';

interface RepositoriesState {
    loading: boolean;
    error: string | null;
    data: string[];
  }

  const initialState = {
    loading: false,
    error: null,
    data: []
  }
  
const reducer = (state: RepositoriesState = initialState, action: Action): RepositoriesState => {

    switch(action.type){
        case ActionType.SEARCH_FLIGHTS: 
            return {loading: true, error: null, data: []}

        case ActionType.SEARCH_FLIGHTS_SUCCESS:
            return {loading: false, error: null, data: action.payload} 

        case ActionType.SEARCH_FLIGHTS_ERROR:
            return {loading: false, error: action.payload, data: [] }
        default:
            return state;
    }

}
export default reducer;
