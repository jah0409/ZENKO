const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ZENKO", function () {
  let token, owner, alice;

  beforeEach(async () => {
    [owner, alice] = await ethers.getSigners();
    const Z = await ethers.getContractFactory("ZENKO");
    token = await Z.deploy(owner.address);
  });

  it("mints initial supply to admin", async () => {
    const cap = await token.MAX_SUPPLY();
    expect(await token.balanceOf(owner.address)).to.equal(cap);
    expect(await token.totalSupply()).to.equal(cap);
  });

  it("respects max supply cap on mint", async () => {
    await expect(
      token.mint(alice.address, 1n)
    ).to.be.revertedWith("cap");
  });

  it("allows burning", async () => {
    const amt = ethers.parseEther("1000");
    await token.transfer(alice.address, amt);
    await token.connect(alice).burn(amt);
    expect(await token.balanceOf(alice.address)).to.equal(0n);
  });

  it("can be paused and unpaused", async () => {
    await token.pause();
    await expect(
      token.transfer(alice.address, 1n)
    ).to.be.revertedWithCustomError(token, "EnforcedPause");
    await token.unpause();
    await token.transfer(alice.address, 1n);
    expect(await token.balanceOf(alice.address)).to.equal(1n);
  });
});
