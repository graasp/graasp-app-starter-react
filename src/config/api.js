// base graasp api url
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || 'https://api.graasp.eu';

// local api
export const LOCAL_API = 'http://localhost:3636';

// endpoints
export const HOSTNAME_ENDPOINT = '/hostname';
export const APP_INSTANCE_RESOURCES_ENDPOINT = '/app-instance-resources';

// request defaults
const DEFAULT_REQUEST = {
  headers: { 'content-type': 'application/json' },
  credentials: 'include',
};
export const DEFAULT_GET_REQUEST = {
  ...DEFAULT_REQUEST,
  method: 'GET',
};
export const DEFAULT_POST_REQUEST = {
  ...DEFAULT_REQUEST,
  method: 'POST',
};
export const DEFAULT_PATCH_REQUEST = {
  ...DEFAULT_REQUEST,
  method: 'PATCH',
};
export const DEFAULT_DELETE_REQUEST = {
  ...DEFAULT_REQUEST,
  method: 'DELETE',
};
