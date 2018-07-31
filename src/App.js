import React, { Component } from 'react';
import Logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={Logo} className="App-logo" alt="Logo" />
          <h1 className="App-title">Welcome to the Graasp App Starter Kit</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
