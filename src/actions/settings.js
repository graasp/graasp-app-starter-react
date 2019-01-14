import Qs from 'qs';
import {
  FLAG_GETTING_API_ENDPOINT, FLAG_GETTING_SETTINGS,
  GET_API_ENDPOINT_FAILED,
  GET_API_ENDPOINT_SUCCEEDED, GET_SETTINGS_FAILED, GET_SETTINGS_SUCCEEDED,
} from '../types/settings';
import {
  BASE_API_URL,
  HOSTNAME_ENDPOINT,
} from '../config/api';
import { flag } from './common';

const flagGettingApiEndpoint = flag(FLAG_GETTING_API_ENDPOINT);
const flagGettingSettings = flag(FLAG_GETTING_SETTINGS);

/**
 * asynchronously gets the correct api endpoint from the graasp api
 * @returns {Promise<Function>}
 */
const getApiEndpoint = async () => async (dispatch) => {
  dispatch(flagGettingApiEndpoint(true));
  try {
    const url = `${BASE_API_URL + HOSTNAME_ENDPOINT}?parentLocationHostname=${window.parent.location.hostname}`;
    const endpoint = await fetch(url);
    dispatch({
      type: GET_API_ENDPOINT_SUCCEEDED,
      payload: endpoint,
    });
  } catch (err) {
    dispatch({
      type: GET_API_ENDPOINT_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingApiEndpoint(false));
  }
};

/**
 * synchronously gets the settings from the query string
 * @returns {Function}
 */
const getSettings = () => (dispatch) => {
  dispatch(flagGettingSettings(true));
  try {
    const {
      mode = 'default',
      lang = 'en',
    } = Qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const settings = {
      mode,
      lang,
    };
    dispatch({
      type: GET_SETTINGS_SUCCEEDED,
      payload: settings,
    });
  } catch (err) {
    dispatch({
      type: GET_SETTINGS_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingSettings(false));
  }
};

export {
  getApiEndpoint,
  getSettings,
};
