import React, { Component } from 'react';
import CardSlider from './components/CardSlider.js';
import OwnerView from './components/OwnerView.js';
import YourCardsView from './components/YourCardsView.js';

import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux'
import { web3connect, fetchCards, buyCard, instantiateMTGCardsContract, owner, wallet } from './actions';

var Row = require('react-bootstrap').Row;

class App extends Component {
  constructor(props) {
    super(props)

    this.renderCardCreatorView.bind(this);

  }

  renderCardCreatorView(owner, wallet) {
    
    if(owner === wallet) { 
      return (
        <OwnerView/>
      );
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    window.addEventListener('load', () => {
      this.props.web3connect();
      this.props.instantiateMTGCardsContract().then(() => {
        this.props.owner();
        this.props.wallet();
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Row className="container">
          <h1 className="aligned-text">
            <span className="header">Magic The Gathering </span>
            <span className="handwritten">Online Exchange</span>
          </h1>
          {this.renderCardCreatorView(this.props.contractOwner, this.props.signedInAccount)}
          <h3 className="aligned-text">Available Cards:</h3>
          <CardSlider/>
          <h3 className="aligned-text">Your Cards:</h3>
          <YourCardsView/>
        </Row>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = {
  web3connect,
  instantiateMTGCardsContract,
  fetchCards,
  buyCard,
  wallet, 
  owner
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  cardsContract: state.cardsContract, 
  contractOwner: state.contractOwner, 
  signedInAccount: state.signedInAccount
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

