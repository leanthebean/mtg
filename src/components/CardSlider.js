import React from "react";
import Slider from "react-slick";
import './CardSlider.css';
import { connect } from 'react-redux'
import contract from 'truffle-contract'
import {web3connect, fetchCards, buyCard, instantiateMTGCardsContract} from './../actions';

const cards = require('./cards.json');

class CardSlider extends React.Component {
  availableCardClicked() {
    alert("hi")
  }

  render() {
    let images = cards.map( card => {
      return <div onClick={this.availableCardClicked}> 
        <img key={card.name} className="slider-image" alt="" src={`./cards/${card.name}`} />
      </div>
    });
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6,
      arrows: true
    };
    return (
      <Slider {...settings}>
      { images }
      </Slider>
    );
  }
}
export default CardSlider;