import Qs from 'qs';
import {
  FLAG_GETTING_CONTEXT,
  GET_CONTEXT_FAILED,
  GET_CONTEXT_SUCCEEDED,
} from '../types';
import { flag, receiveMessage } from './common';
import { DEFAULT_API_HOST, DEFAULT_MODE } from '../config/settings';
import { DEFAULT_VIEW } from '../config/views';
import isInFrame from '../utils/isInFrame';

// flags
const flagGettingContext = flag(FLAG_GETTING_CONTEXT);

/**
 * synchronously gets the context from the query string
 * @returns {Function}
 */
const getContext = () => dispatch => {
  dispatch(flagGettingContext(true));
  try {
    const {
      mode = DEFAULT_MODE,
      view = DEFAULT_VIEW,
      lang = 'en',
      apiHost = DEFAULT_API_HOST,
      appInstanceId = null,
      spaceId = null,
      subSpaceId = null,
      parentSpaceId = null,
      userId = null,
      reviewerId = null,
      sessionId = null,
      offline = 'false',
      dev = 'false',
      reviewing = 'false',
      analytics = 'true',
    } = Qs.parse(window.location.search, { ignoreQueryPrefix: true });

    const offlineBool = offline === 'true';
    const devBool = dev === 'true';
    const reviewingBool = reviewing === 'true';
    const analyticsBool = analytics === 'true';

    const standalone = !devBool && !isInFrame();

    const context = {
      mode,
      view,
      lang,
      apiHost,
      appInstanceId,
      userId,
      reviewerId,
      sessionId,
      spaceId,
      subSpaceId,
      parentSpaceId,
      standalone,
      offline: offlineBool,
      dev: devBool,
      reviewing: reviewingBool,
      analytics: analyticsBool,
    };

    // if offline, we need to set up the listeners here
    if (offlineBool) {
      window.addEventListener('message', receiveMessage(dispatch));
    }

    dispatch({
      type: GET_CONTEXT_SUCCEEDED,
      payload: context,
    });
  } catch (err) {
    dispatch({
      type: GET_CONTEXT_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingContext(false));
  }
};

export {
  // todo: remove with more exports
  // eslint-disable-next-line import/prefer-default-export
  getContext,
};
