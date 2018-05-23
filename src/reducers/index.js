import { WEB3_CONNECTED, MTG_ADDED, MTG_CARDS_CONTRACT_INSTANTIATED, MTG_CARDS_FETCHED, defaultState } from '../actions';

const mtgCards = (state = defaultState, action) => {
  switch (action.type) {
  case WEB3_CONNECTED:
    return {
      ...state,
      web3: action.payload
    };
  case MTG_CARDS_CONTRACT_INSTANTIATED:
    return {
      ...state,
      mtgCardsContract: action.payload
    };
  case MTG_CARDS_FETCHED:
    return {
      ...state,
      mtgCards: action.payload
    };
  case MTG_ADDED:
    return {
      ...state,
      mtgCards: [
        ...state.mtgCards,
        action.payload
      ]
    };
  default:
    return state
  }
};

export default mtgCards;