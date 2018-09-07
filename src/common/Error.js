import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

const Error = (props) => {
  const { message = 'Error!' } = props;
  return (
    <Alert color="danger">
      { message }
    </Alert>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: 'Error!',
};

export default Error;
