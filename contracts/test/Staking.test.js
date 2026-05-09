const { expect } = require("chai");
const { ethers, network } = require("hardhat");

describe("Staking", function () {
  let token, staking, owner, alice;
  const APY = 4000n; // 40%

  beforeEach(async () => {
    [owner, alice] = await ethers.getSigners();
    const Z = await ethers.getContractFactory("ZENKO");
    token = await Z.deploy(owner.address);
    const S = await ethers.getContractFactory("Staking");
    staking = await S.deploy(owner.address, await token.getAddress(), APY);

    // give alice tokens and fund rewards pool
    await token.transfer(alice.address, ethers.parseEther("10000"));
    await token.approve(await staking.getAddress(), ethers.parseEther("100000"));
    await staking.fundRewards(ethers.parseEther("100000"));
  });

  it("stakes and accrues rewards over time", async () => {
    const amt = ethers.parseEther("1000");
    await token.connect(alice).approve(await staking.getAddress(), amt);
    await staking.connect(alice).stake(amt);

    await network.provider.send("evm_increaseTime", [365 * 24 * 60 * 60]);
    await network.provider.send("evm_mine");

    const pending = await staking.pendingRewards(alice.address);
    // ~ 40% of 1000 = 400
    expect(pending).to.be.closeTo(ethers.parseEther("400"), ethers.parseEther("0.5"));
  });

  it("claim transfers rewards", async () => {
    const amt = ethers.parseEther("1000");
    await token.connect(alice).approve(await staking.getAddress(), amt);
    await staking.connect(alice).stake(amt);

    await network.provider.send("evm_increaseTime", [180 * 24 * 60 * 60]);
    await network.provider.send("evm_mine");

    const before = await token.balanceOf(alice.address);
    await staking.connect(alice).claim();
    const after = await token.balanceOf(alice.address);
    expect(after - before).to.be.gt(ethers.parseEther("190"));
  });

  it("unstake returns principal", async () => {
    const amt = ethers.parseEther("500");
    await token.connect(alice).approve(await staking.getAddress(), amt);
    await staking.connect(alice).stake(amt);
    await staking.connect(alice).unstake(amt);
    expect(await staking.staked(alice.address)).to.equal(0n);
  });

  it("rejects APY above MAX_APY_BPS", async () => {
    await expect(staking.setApy(5000)).to.be.revertedWith("apy too high");
  });
});
