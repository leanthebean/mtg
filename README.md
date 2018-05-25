### Magic the Gathering - Demo on Non-Fungible Tokens 

#### Setup:
1) This example relies on IPFS (https://ipfs.io/) so go ahead and follow the installation steps and run the ipfs daemon     
- `ipfs daemon`

2) Let's write some smart contracts! 
- `cd mtg/smart_contracts`
- `truffle init` 
- `npm init` 
- `npm install --save openzeppelin-solidity`      
     
<black magic> 

3) We'll create an npm link between our smart contract package, and our front end 
- `cd mtg/smart_contracts`
- `npm link`
- `cd ../`
- `npm link smart_contracts`

4) Let's run our backend (so we can accept file uploads and hand them over to IPFS) 
- `cd mtg/server` 
- `npm start` 

5) And finally, let's run out frontend! 
- `cd mtg/`
- `npm run start` 
