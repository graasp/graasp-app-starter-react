const flag = type => payload => dispatch => dispatch({
  type,
  payload,
});

export {
  // todo: remove when more functions are exported
  // eslint-disable-next-line import/prefer-default-export
  flag,
};
