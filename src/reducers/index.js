import { combineReducers } from 'redux';
import context from './context';
import appInstanceResources from './appInstanceResources';
import users from './users';

export default combineReducers({
  // keys should always be lowercase
  context,
  appInstanceResources,
  users,
});
