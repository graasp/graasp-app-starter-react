import React from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from 'react-i18next';
import { Alert, Container } from 'reactstrap';

export const StudentView = ({ t }) => (
  <Container className="App App-body StudentView">
    <Alert color="info">
      {t('This is the student view. Switch to the teacher view by clicking on the URL below.')}
      <a href="?mode=teacher">
        <pre>{`${window.location.host}/?mode=teacher`}</pre>
      </a>
    </Alert>
  </Container>
);

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('translations')(StudentView);
