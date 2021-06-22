const { hexStripZeros } = require("ethers/lib/utils");
const { ethers } = require("hardhat");

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
  }) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts();
    let proposalNames = [];
  
    // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
    await deploy('Ballot', {
      from: deployer,
      gasLimit: 4000000,
      args: [ proposalNames ],
    });

    let Ballot = await ethers.getContract("Ballot");
    console.log(`Ballot Contract deployed at ${Ballot.address}`);
  };