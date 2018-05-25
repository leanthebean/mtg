import React from "react";
import Slider from "react-slick";
import './CardSlider.css';
import { connect } from 'react-redux'
import { web3connect, fetchCards, instantiateMTGCardsContract } from './../actions';

class YourCardsView extends React.Component {
  constructor(props) {
    super(props)

    this.renderCards.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See actions/index.js => web3connect for more info.
    window.addEventListener('load', () => {
      this.props.web3connect();
      this.props.instantiateMTGCardsContract().then(() => {
        this.props.fetchCards(false);
      });
    });
  }

  renderCards(yourMtgCards) {
    return yourMtgCards.map(card => {
      return <div key={card.id + "your cards"}> 
        <img className="slider-image" alt="" src={card.url} />
      </div>
    });
  }

  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 6,
      arrows: true
    };
    return (
      <Slider {...settings}>
        {this.renderCards(this.props.yourMtgCards)}
      </Slider>
    );
  }
}
const mapDispatchToProps = {
  web3connect,
  instantiateMTGCardsContract,
  fetchCards
};

const mapStateToProps = (state) => ({
  web3: state.web3,
  cardsContract: state.cardsContract, 
  yourMtgCards: state.yourMtgCards
});

export default connect(mapStateToProps, mapDispatchToProps)(YourCardsView);
