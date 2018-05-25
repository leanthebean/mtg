import Web3 from 'web3';
import contract from 'truffle-contract';
import MTGContact from 'smart_contracts/build/contracts/MTG.json';
export const WEB3_CONNECTED = 'WEB3_CONNECTED';
export const WEB3_DISCONNECTED = 'WEB3_DISCONNECTED';
export const MTG_CARDS_CONTRACT_INSTANTIATED = 'MTG_CARDS_CONTRACT_INSTANTIATED';
export const MTG_CARDS_FETCHED = 'MTG_CARDS_FETCHED';
export const MTG_CARD_ADDED = 'MTG_CARD_ADDED';
export const CONTRACT_OWNER = 'CONTRACT_OWNER';
export const SIGNED_IN_ACCOUNT = 'SIGNED_IN_ACCOUNT';
export const YOUR_CARDS_ADDED = 'YOUR_CARDS_ADDED';
export const MTG_CARD_BOUGHT = 'MTG_CARD_BOUGHT';

export const defaultState = {
  web3: null,
  cardsContract: [], 
  mtgCards: [], 
  yourMtgCards: []
};

export function web3connect() {
  return (dispatch) => {
    const web3 = window.web3;

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(web3.currentProvider)
      });
    } else {
      dispatch({
        type: WEB3_CONNECTED,
        payload: new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
      });
    };
  };
}

export function instantiateMTGCardsContract() {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const cardsContract = contract(MTGContact);
    cardsContract.setProvider(web3.currentProvider);
    return cardsContract.deployed().then((contractInstance) => {
      dispatch({
        type: MTG_CARDS_CONTRACT_INSTANTIATED,
        payload: contractInstance
      });
    });
  };
}

export function fetchCards(forContract) {
  return (dispatch, getState) => {
    const state = getState();
    const web3 = state.web3;
    const cardsContract = state.cardsContract;
    web3.eth.getAccounts((err, accounts) => {
      cardsContract.tokensOf(
        forContract ? cardsContract.address : accounts[0]
      ).then((cards) => {
        //dont do this in production :(
        Promise.all(
          cards.map(card => cardsContract.getIpfsHash(card))
        ).then(values => {
          let i = 0;
          dispatch({
            type:forContract ? MTG_CARDS_FETCHED : YOUR_CARDS_ADDED,
            payload: values.map((value) => {
              return { 
                url: `http://localhost:8080/ipfs/${value}`,
                id: cards[i++].toNumber()
              }
            })
          });
        });
      });
    });
  };
}

export function mintCard(payload) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const cardsContract = getState().cardsContract;
    web3.eth.getAccounts((err, accounts) => {
      cardsContract.mint(
        payload.hash || "", 
        payload.price || web3.toWei(.001, "ether"), {
        from: accounts[0]
      }).then((results) => {
        dispatch({
          type: MTG_CARD_ADDED,
          payload: {
            url: `http://localhost:8080/ipfs/${payload.hash}`,
            id: results.logs[0].args._tokenId.toNumber()
          }
        });
      });
    });
  };
}

export function buyCard(payload) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const cardsContract = getState().cardsContract;
    const mtgCards = getState().mtgCards;
    web3.eth.getAccounts((err, accounts) => {
      cardsContract.buyCard(Number(payload.id), {
        from: accounts[0], 
        value: new web3.BigNumber(web3.toWei(.001, "ether"))
      }).then((results) => {
        let newAvailableCards = mtgCards.filter(card => card.id !== results.logs[0].args._tokenId.toNumber())
        return dispatch => {
          dispatch({
            type: MTG_CARD_BOUGHT,
            payload: { 
              id: results.logs[0].args._tokenId.toNumber(), 
              url: payload.url
            }
          })
          dispatch({
            type: MTG_CARDS_FETCHED,
            payload: newAvailableCards
          })
        }
      });
    });
  };
}

export function owner(payload) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    const cardsContract = getState().cardsContract;
    web3.eth.getAccounts((err, accounts) => {
      cardsContract.owner({
        from: accounts[0], 
      }).then((result) => {
        dispatch({
          type: CONTRACT_OWNER,
          payload: result
        });
      });
    });
  };
}

export function wallet(payload) {
  return (dispatch, getState) => {
    const web3 = getState().web3;
    web3.eth.getAccounts((err, accounts) => {
      dispatch({
        type: SIGNED_IN_ACCOUNT,
        payload: accounts[0]
      });
    });
  };
}