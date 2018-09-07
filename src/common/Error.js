import React from 'react';
import { Alert } from 'reactstrap';

const Error = (props) => {
  const { message = 'Error!' } = props;
  return (
    <Alert color="danger">
      { message }
    </Alert>
  );
};

export default Error;
