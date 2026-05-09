const { run } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const file = path.join(__dirname, "..", "deployments.json");
  if (!fs.existsSync(file)) throw new Error("deployments.json not found. Run deploy first.");
  const d = JSON.parse(fs.readFileSync(file, "utf8"));

  await safeVerify(d.contracts.ZENKO, [d.deployer]);
  await safeVerify(d.contracts.Presale, [
    d.deployer,
    d.contracts.ZENKO,
    d.presale.tokensPerEth,
    (BigInt(parseFloat(d.presale.minEth) * 1e18)).toString(),
    (BigInt(parseFloat(d.presale.maxEth) * 1e18)).toString(),
    d.presale.whitelistOnly,
  ]);
  await safeVerify(d.contracts.Staking, [d.deployer, d.contracts.ZENKO, 4000]);
  await safeVerify(d.contracts.Governance, [
    d.contracts.ZENKO,
    "10000000000000000000000",   // 10,000 ZENKO
    "1000000000000000000000000", // 1,000,000 ZENKO
  ]);
}

async function safeVerify(address, args) {
  try {
    console.log("Verifying", address);
    await run("verify:verify", { address, constructorArguments: args });
  } catch (e) {
    console.warn("verify failed:", e.message);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
