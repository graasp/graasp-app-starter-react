import React from 'react';
import { Alert, Container } from 'reactstrap';
import Logo from '../logo.svg';

const StudentView = () => (
  <div className="App">
    <header className="App-header">
      <img src={Logo} className="App-logo" alt="Logo" />
      <h1 className="App-title">Welcome to the Graasp App Starter Kit</h1>
    </header>
    <Container className="App-body">
      <Alert color="info">
        This is the student view. Switch to the teacher view by clicking on the URL below.
        <a href="?mode=teacher">
          <pre>{`${window.location.host}/?mode=teacher`}</pre>
        </a>
      </Alert>
    </Container>
  </div>
);

export default StudentView;
