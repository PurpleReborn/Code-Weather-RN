import {Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import axios from 'axios';
import {RootState} from '../store';
import {
  FETCH_WEATHER_START,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from '../actionTypes/weather';

interface FetchWeatherStartAction extends Action<typeof FETCH_WEATHER_START> {}

interface FetchWeatherSuccessAction
  extends Action<typeof FETCH_WEATHER_SUCCESS> {
  payload: any;
}

interface FetchWeatherFailureAction
  extends Action<typeof FETCH_WEATHER_FAILURE> {
  payload: string;
}

export type WeatherAction =
  | FetchWeatherStartAction
  | FetchWeatherSuccessAction
  | FetchWeatherFailureAction;

export const fetchWeatherStart = (): FetchWeatherStartAction => ({
  type: FETCH_WEATHER_START,
});

export const fetchWeatherSuccess = (data: any): FetchWeatherSuccessAction => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});

export const fetchWeatherFailure = (
  error: string,
): FetchWeatherFailureAction => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

export const fetchWeatherData =
  (city: string): ThunkAction<void, RootState, null, WeatherAction> =>
  async dispatch => {
    try {
      dispatch(fetchWeatherStart());

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=08f47e2313e2fbae645bd54f5ba16ef0&units=metric`;

      const response = await axios.get(url);
      const weatherData = response.data;
      console.log('iniii', weatherData);

      dispatch(fetchWeatherSuccess(weatherData));
    } catch (err: any) {
      dispatch(fetchWeatherFailure(err.message));
    }
  };
