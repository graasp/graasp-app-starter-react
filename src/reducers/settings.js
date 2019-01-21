import {
  GET_API_ENDPOINT_SUCCEEDED,
  GET_SETTINGS_SUCCEEDED,
} from '../types';

const INITIAL_STATE = {
  endpoint: null,
  // the properties below come from the context via the query string
  lang: 'en',
  appInstanceId: null,
  spaceId: null,
  subSpaceId: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_API_ENDPOINT_SUCCEEDED:
      return {
        ...state,
        endpoint: payload,
      };
    case GET_SETTINGS_SUCCEEDED:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
