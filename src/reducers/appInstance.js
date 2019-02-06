import {
  GET_APP_INSTANCE_FAILED,
  GET_APP_INSTANCE_SUCCEEDED,
  PATCH_APP_INSTANCE_FAILED,
  PATCH_APP_INSTANCE_SUCCEEDED,
} from '../types/appInstance';

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
    case GET_APP_INSTANCE_SUCCEEDED:
    case PATCH_APP_INSTANCE_SUCCEEDED:
      return payload;

    case PATCH_APP_INSTANCE_FAILED:
    case GET_APP_INSTANCE_FAILED:
      // show error to user
      alert(payload);
      return state;

    default:
      return state;
  }
};
