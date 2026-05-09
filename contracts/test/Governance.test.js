const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Governance", function () {
  let token, gov, owner, alice, bob;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const Z = await ethers.getContractFactory("ZENKO");
    token = await Z.deploy(owner.address);
    const G = await ethers.getContractFactory("Governance");
    gov = await G.deploy(
      await token.getAddress(),
      ethers.parseEther("100"),  // proposalThreshold
      ethers.parseEther("1000")  // quorum
    );

    await token.transfer(alice.address, ethers.parseEther("5000"));
    await token.transfer(bob.address, ethers.parseEther("5000"));
  });

  async function stake(user, amount) {
    await token.connect(user).approve(await gov.getAddress(), amount);
    await gov.connect(user).stakeForVoting(amount);
  }

  it("allows propose / vote / queue / execute", async () => {
    await stake(alice, ethers.parseEther("2000"));
    await stake(bob, ethers.parseEther("2000"));

    await gov.connect(alice).propose("Set new APY", ethers.ZeroAddress, 0, "0x");
    await gov.connect(alice).castVote(1, true);
    await gov.connect(bob).castVote(1, true);

    await network.provider.send("evm_increaseTime", [3 * 24 * 60 * 60 + 1]);
    await network.provider.send("evm_mine");

    expect(await gov.state(1)).to.equal(3); // Succeeded
    await gov.queue(1);
    expect(await gov.state(1)).to.equal(4); // Queued

    await network.provider.send("evm_increaseTime", [2 * 24 * 60 * 60 + 1]);
    await network.provider.send("evm_mine");

    await gov.execute(1);
    expect(await gov.state(1)).to.equal(5); // Executed
  });

  it("rejects proposals below threshold", async () => {
    await expect(
      gov.connect(alice).propose("nope", ethers.ZeroAddress, 0, "0x")
    ).to.be.revertedWith("below threshold");
  });

  it("blocks double voting", async () => {
    await stake(alice, ethers.parseEther("2000"));
    await gov.connect(alice).propose("p", ethers.ZeroAddress, 0, "0x");
    await gov.connect(alice).castVote(1, true);
    await expect(gov.connect(alice).castVote(1, true)).to.be.revertedWith("already voted");
  });
});
