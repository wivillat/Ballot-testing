const {expect} = require("chai");

const setupTest = deployments.createFixture(async ({deployments, getNamedAccounts, ethers}, options) => {
    await deployments.fixture(); // ensure you start from a fresh deployments
    const { deployer, investor } = await getNamedAccounts();
    const Ballot = await ethers.getContract("Ballot");
    // console.log(deployer, investor);
   // await TokenContract.mint(10).then(tx => tx.wait()); //this mint is executed once and then `createFixture` will ensure it is snapshotted
    return {
      deployer,
      investor,
      Ballot
    };
  });

  const setupWithVoters = deployments.createFixture(async ({deployments, getNamedAccounts, ethers}, options) => {
    await deployments.fixture(); // ensure you start from a fresh deployments
    const {voter1, voter2, voter3, investor } = await getNamedAccounts();
    const {deployer, hacker} = await ethers.getSigners();

    console.log(deployer)
    const Ballot = await ethers.getContract("Ballot");

    console.log(hacker.address === investor);

    await Ballot.connect(deployer).giveRightToVote(hacker.address);
    await Ballot.giveRightToVote(voter2);
    await Ballot.giveRightToVote(voter3);

    // console.log(deployer, investor);
   // await TokenContract.mint(10).then(tx => tx.wait()); //this mint is executed once and then `createFixture` will ensure it is snapshotted
    return {
      deployer,
      voter1,
      voter2,
      voter3,
      Ballot
    };
  });

  describe("Ballot", () => {

    describe("Chairperson Permissions", () => {
      
      it("a would be hacker cannot give someone the right to vote", async () => {
        const {Ballot, investor} = await setupTest();
        await expect(Ballot.connect(investor).giveRightToVote(investor.address)).to.be.reverted;
      });
  
      it("only the chairperson can give someone the right to vote", async () => {
        const {Ballot, investor} = await setupTest();
        await Ballot.giveRightToVote(investor);
      });
    });


  });