const flag = type => payload => dispatch => dispatch({
  type,
  payload,
});

const isErrorResponse = async (response) => {
  const LOWEST_HTTP_ERROR_CODE = 400;
  const HIGHEST_HTTP_ERROR_CODE = 599;

  if (
    response.status >= LOWEST_HTTP_ERROR_CODE
    && response.status <= HIGHEST_HTTP_ERROR_CODE
  ) {
    // assumes response has a message property
    const { message } = await response.json();

    throw message;
  }
};

const getApiContext = (getState) => {
  const { context } = getState();
  const { apiHost, appInstanceId } = context;
  if (!apiHost) {
    throw Error('api host missing');
  }
  if (!appInstanceId) {
    throw Error('app instance id missing');
  }
  return { apiHost, appInstanceId };
};

export {
  flag,
  isErrorResponse,
  getApiContext,
};
