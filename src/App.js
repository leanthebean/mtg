import React, { Component } from 'react';
import CardSlider from './components/CardSlider.js';
import logo from './logo.svg';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
var Row = require('react-bootstrap').Row;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Row className="container">
          <h1 className="aligned-text">Magic The Gathering</h1>
          <h3 className="aligned-text">Available Cards:</h3>
          <CardSlider/>
        </Row>
      </React.Fragment>
    );
  }
}

export default App;
