const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Presale", function () {
  let token, presale, owner, alice, bob;
  const RATE = 10_000n; // 10,000 ZENKO per ETH
  const MIN = ethers.parseEther("0.05");
  const MAX = ethers.parseEther("5");

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const Z = await ethers.getContractFactory("ZENKO");
    token = await Z.deploy(owner.address);

    const P = await ethers.getContractFactory("Presale");
    presale = await P.deploy(owner.address, await token.getAddress(), RATE, MIN, MAX, true);

    // fund presale with tokens
    await token.transfer(await presale.getAddress(), ethers.parseEther("1000000"));
  });

  it("blocks non-whitelisted buys", async () => {
    await expect(
      presale.connect(alice).buy({ value: ethers.parseEther("0.1") })
    ).to.be.revertedWith("not whitelisted");
  });

  it("allows whitelisted buy and credits tokens", async () => {
    await presale.setWhitelist([alice.address], true);
    const ethIn = ethers.parseEther("1");
    await expect(presale.connect(alice).buy({ value: ethIn }))
      .to.emit(presale, "Bought");
    expect(await token.balanceOf(alice.address)).to.equal(RATE * 10n ** 18n);
    expect(await presale.totalRaised()).to.equal(ethIn);
  });

  it("enforces min and max contribution", async () => {
    await presale.setWhitelist([alice.address], true);
    await expect(
      presale.connect(alice).buy({ value: ethers.parseEther("0.01") })
    ).to.be.revertedWith("below min");
    await presale.connect(alice).buy({ value: ethers.parseEther("4") });
    await expect(
      presale.connect(alice).buy({ value: ethers.parseEther("2") })
    ).to.be.revertedWith("above max");
  });

  it("owner can withdraw ETH", async () => {
    await presale.setWhitelist([alice.address], true);
    await presale.connect(alice).buy({ value: ethers.parseEther("1") });
    const before = await ethers.provider.getBalance(bob.address);
    await presale.withdrawETH(bob.address);
    const after = await ethers.provider.getBalance(bob.address);
    expect(after - before).to.equal(ethers.parseEther("1"));
  });

  it("owner can end presale", async () => {
    await presale.endPresale();
    await presale.setWhitelist([alice.address], true);
    await expect(
      presale.connect(alice).buy({ value: ethers.parseEther("0.1") })
    ).to.be.revertedWith("ended");
  });
});
