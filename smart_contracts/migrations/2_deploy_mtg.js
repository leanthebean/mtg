var MTG = artifacts.require("./MTG.sol");

hashes = [ 
  "QmaJmzqteDHV8cFzGEjvUo8veyxDfPn5pHw57MAXE2mLXL", 
  "QmXDv5aVtjdyrTkZMW8eXSNBUS64yFWQgd4kncmFJtm2VY", 
  "QmfZX6ybvc3frwSBJzrQr5ceZCHf2c8einePjaRNggS5WW", 
  "QmQ1zSuNCXx5k7p79bb19c2wXgJzbc5LUsJgRWKZNHtF92", 
  "QmUfzjDq8V9wmVyTf3yyn4DFLX8swPJh4Dsz6zvg8QkmBT", 
  "QmauVVjuAihxmBaWXhmB7uEnAVbLwq7qKhVUz2uafcpR1D", 
  "QmSYTK2Rk4BFmzRw3Mv9hd9q8XRYd4rhHWeE7EfGXABpoR", 
  "QmNT2Vp4Rj7ysXRp19YkUDbH4BUF1MvG6RbJu7BcVCsn2P", 
  "QmaVJkxbMZ8vxEKQAjnmydRpKzywJAAbF5ys8R2RyjtSZb", 
  "QmXrDFKyCwzQQoeeySRFyKeSLQDsZBDk6z6DymjQVaJumW"
]

module.exports = function(deployer) {
  deployer.deploy(MTG).then(contract => { 
    hashes.forEach(function(hash) { 
      contract.mint(hash, web3.toWei(.001, "ether"))
    })
  })
};
