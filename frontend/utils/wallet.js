import { BrowserProvider, Contract, formatEther, parseEther, formatUnits } from "ethers";

export const CONTRACTS = {
  token: process.env.NEXT_PUBLIC_TOKEN_ADDRESS || "",
  presale: process.env.NEXT_PUBLIC_PRESALE_ADDRESS || "",
  staking: process.env.NEXT_PUBLIC_STAKING_ADDRESS || "",
  governance: process.env.NEXT_PUBLIC_GOVERNANCE_ADDRESS || "",
};

export const TOKEN_ABI = [
  "function balanceOf(address) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
];

export const PRESALE_ABI = [
  "function tokensPerEth() view returns (uint256)",
  "function minContribution() view returns (uint256)",
  "function maxContribution() view returns (uint256)",
  "function contributions(address) view returns (uint256)",
  "function whitelisted(address) view returns (bool)",
  "function ended() view returns (bool)",
  "function totalRaised() view returns (uint256)",
  "function buy() payable",
];

export const STAKING_ABI = [
  "function stake(uint256 amount)",
  "function unstake(uint256 amount)",
  "function claim()",
  "function pendingRewards(address) view returns (uint256)",
  "function staked(address) view returns (uint256)",
  "function apyBps() view returns (uint256)",
];

export async function getProvider() {
  if (typeof window === "undefined" || !window.ethereum) return null;
  return new BrowserProvider(window.ethereum);
}

export async function connectWallet() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found. Install it to continue.");
  }
  const provider = new BrowserProvider(window.ethereum);
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  const signer = await provider.getSigner();
  const network = await provider.getNetwork();
  return { provider, signer, address: accounts[0], chainId: Number(network.chainId) };
}

export async function getEthBalance(address) {
  const provider = await getProvider();
  if (!provider) return "0";
  const bal = await provider.getBalance(address);
  return formatEther(bal);
}

export async function getTokenBalance(address) {
  if (!CONTRACTS.token) return "0";
  const provider = await getProvider();
  if (!provider) return "0";
  const c = new Contract(CONTRACTS.token, TOKEN_ABI, provider);
  const [bal, dec] = await Promise.all([c.balanceOf(address), c.decimals()]);
  return formatUnits(bal, dec);
}

export async function buyPresale(ethAmount) {
  if (!CONTRACTS.presale) throw new Error("Presale address not configured.");
  const { signer } = await connectWallet();
  const c = new Contract(CONTRACTS.presale, PRESALE_ABI, signer);
  const tx = await c.buy({ value: parseEther(String(ethAmount)) });
  return tx;
}

export function shortAddr(addr) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}
