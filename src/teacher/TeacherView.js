import React from 'react';
import { Alert, Container } from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import './TeacherView.css';

export const TeacherView = ({ t }) => (
  <div className="App">
    <Container fluid className="App-body TeacherView">
      <Alert color="primary">
        {t('This is the teacher view. Switch to the student view by clicking on the URL below.')}
        <a href="?mode=student">
          <pre>{`${window.location.host}/?mode=student`}</pre>
        </a>
      </Alert>
    </Container>
  </div>
);

TeacherView.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('translations')(TeacherView);
