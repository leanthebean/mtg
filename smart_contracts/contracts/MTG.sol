pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';
import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract MTG is ERC721Token("Magic the Gathering", "MTG"), Ownable { 
  
}