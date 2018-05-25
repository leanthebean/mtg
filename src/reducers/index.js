import { MTG_CARD_BOUGHT, YOUR_CARDS_ADDED, WEB3_CONNECTED, MTG_CARD_ADDED, MTG_CARDS_CONTRACT_INSTANTIATED, MTG_CARDS_FETCHED, CONTRACT_OWNER, SIGNED_IN_ACCOUNT, defaultState } from '../actions';

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
      cardsContract: action.payload
    };
  case MTG_CARDS_FETCHED:
    return {
      ...state,
      mtgCards: action.payload
    };
  case MTG_CARD_BOUGHT: 
  return {
    ...state,
    yourMtgCards: [
      ...state.yourMtgCards,
      action.payload
    ]
  };
  case MTG_CARD_ADDED:
  return {
      ...state,
      mtgCards: [
        ...state.mtgCards,
        action.payload
      ]
    };
  case YOUR_CARDS_ADDED:
  return {
      ...state,
      yourMtgCards: action.payload
    };
  case CONTRACT_OWNER:
    return {
      ...state,
      contractOwner: action.payload
    };
  case SIGNED_IN_ACCOUNT:
    return {
      ...state,
      signedInAccount: action.payload
    };
  default:
    return state
  }
};

export default mtgCards;