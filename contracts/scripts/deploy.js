const { ethers, network, run } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);
  console.log("Network:", network.name);

  // 1. Token
  const Z = await ethers.getContractFactory("ZENKO");
  const token = await Z.deploy(deployer.address);
  await token.waitForDeployment();
  const tokenAddr = await token.getAddress();
  console.log("ZENKO:", tokenAddr);

  // 2. Presale: 10,000 ZENKO per ETH, min 0.05 ETH, max 5 ETH, whitelist on
  const tokensPerEth = 10_000n;
  const min = ethers.parseEther("0.05");
  const max = ethers.parseEther("5");
  const P = await ethers.getContractFactory("Presale");
  const presale = await P.deploy(deployer.address, tokenAddr, tokensPerEth, min, max, true);
  await presale.waitForDeployment();
  const presaleAddr = await presale.getAddress();
  console.log("Presale:", presaleAddr);

  // Fund presale with 100M ZENKO
  await (await token.transfer(presaleAddr, ethers.parseEther("100000000"))).wait();

  // 3. Staking @ 40% APY
  const S = await ethers.getContractFactory("Staking");
  const staking = await S.deploy(deployer.address, tokenAddr, 4000);
  await staking.waitForDeployment();
  const stakingAddr = await staking.getAddress();
  console.log("Staking:", stakingAddr);

  // Fund rewards pool with 50M
  await (await token.approve(stakingAddr, ethers.parseEther("50000000"))).wait();
  await (await staking.fundRewards(ethers.parseEther("50000000"))).wait();

  // 4. Governance: threshold 10k ZENKO, quorum 1M ZENKO
  const G = await ethers.getContractFactory("Governance");
  const gov = await G.deploy(
    tokenAddr,
    ethers.parseEther("10000"),
    ethers.parseEther("1000000")
  );
  await gov.waitForDeployment();
  const govAddr = await gov.getAddress();
  console.log("Governance:", govAddr);

  const out = {
    network: network.name,
    chainId: Number((await ethers.provider.getNetwork()).chainId),
    deployer: deployer.address,
    contracts: {
      ZENKO: tokenAddr,
      Presale: presaleAddr,
      Staking: stakingAddr,
      Governance: govAddr,
    },
    presale: {
      tokensPerEth: Number(tokensPerEth),
      minEth: "0.05",
      maxEth: "5",
      whitelistOnly: true,
    },
  };

  const outPath = path.join(__dirname, "..", "deployments.json");
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
