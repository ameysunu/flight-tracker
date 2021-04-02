import { GetWeatherAction } from "../actions";
import { GetWeather } from "../action-types";

interface Weather {
  loading: boolean;
  err: string | null;
  val: any;
}

const initialState = {
  loading: false,
  err: null,
  val: [],
};

const weatherreducer = (
  state: Weather = initialState,
  action: GetWeatherAction
): Weather => {
  switch (action.type) {
    case GetWeather.GET_WEATHER:
      return { loading: true, err: null, val: [] };

    case GetWeather.GET_WEATHER_SUCCESS:
      return { loading: false, err: null, val: action.payload };

    case GetWeather.GET_WEATHER_ERROR:
      return { loading: false, err: action.payload, val: [] };
    default:
      return state;
  }
};

export default weatherreducer;
