import { GetRoutesAction } from "../actions";
import { GetRoutes } from "../action-types";

interface Route {
  load: boolean;
  error: string | null;
  done: any;
}

const initialState = {
  load: false,
  error: null,
  done: [],
};

const routereducer = (
  state: Route = initialState,
  action: GetRoutesAction
): Route => {
  switch (action.type) {
    case GetRoutes.GET_ROUTE:
      return { load: true, error: null, done: [] };

    case GetRoutes.GET_ROUTE_SUCCESS:
      return { load: false, error: null, done: action.payload };

    case GetRoutes.GET_ROUTE_ERROR:
      return { load: false, error: action.payload, done: [] };
    default:
      return state;
  }
};

export default routereducer;
