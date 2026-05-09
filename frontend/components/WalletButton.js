import { useEffect, useState } from "react";
import { connectWallet, getEthBalance, getTokenBalance, shortAddr } from "../utils/wallet";

export default function WalletButton() {
  const [address, setAddress] = useState("");
  const [eth, setEth] = useState("0");
  const [zenko, setZenko] = useState("0");
  const [error, setError] = useState("");

  const refresh = async (addr) => {
    try {
      const [e, z] = await Promise.all([getEthBalance(addr), getTokenBalance(addr)]);
      setEth(Number(e).toFixed(4));
      setZenko(Number(z).toFixed(2));
    } catch {}
  };

  const onConnect = async () => {
    setError("");
    try {
      const { address } = await connectWallet();
      setAddress(address);
      await refresh(address);
    } catch (e) {
      setError(e.message || "Connection failed");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return;
    const handler = (accs) => {
      const a = accs?.[0] || "";
      setAddress(a);
      if (a) refresh(a);
    };
    window.ethereum.on?.("accountsChanged", handler);
    return () => window.ethereum.removeListener?.("accountsChanged", handler);
  }, []);

  if (!address) {
    return (
      <button onClick={onConnect} className="btn-ghost text-sm" title={error}>
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-xl border border-zenko-border bg-zenko-card px-3 py-2 text-xs">
      <span className="hidden sm:inline text-zenko-muted">{eth} ETH</span>
      <span className="hidden md:inline text-zenko-muted">·</span>
      <span className="hidden md:inline text-zenko-accent2">{zenko} ZENKO</span>
      <span className="hidden sm:inline text-zenko-muted">·</span>
      <span className="font-mono">{shortAddr(address)}</span>
    </div>
  );
}
