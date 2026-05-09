import { useState } from "react";
import { motion } from "framer-motion";
import { buyPresale } from "../utils/wallet";

export default function Presale() {
  const [amount, setAmount] = useState("0.1");
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const onBuy = async (e) => {
    e.preventDefault();
    setStatus({ state: "loading", msg: "Confirm in your wallet…" });
    try {
      const tx = await buyPresale(amount);
      setStatus({ state: "pending", msg: `Submitted: ${tx.hash.slice(0, 10)}…` });
      const receipt = await tx.wait();
      setStatus({
        state: "success",
        msg: `Confirmed in block ${receipt.blockNumber}.`,
      });
    } catch (err) {
      setStatus({ state: "error", msg: err?.shortMessage || err?.message || "Transaction failed." });
    }
  };

  const tokenEstimate = Number(amount || 0) * 10000;

  return (
    <section id="presale" className="py-20 md:py-28 border-t border-zenko-border">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-zenko-border bg-zenko-card p-6 md:p-10 grid md:grid-cols-2 gap-8"
        >
          <div>
            <p className="text-sm uppercase tracking-widest text-zenko-accent2">Presale</p>
            <h3 className="mt-2 text-3xl md:text-4xl font-extrabold">
              Join the <span className="gradient-text">ZENKO</span> presale
            </h3>
            <p className="mt-3 text-zenko-muted">
              Round 1 price: 1 ETH = 10,000 ZENKO. Min 0.05 ETH · Max 5 ETH.
              Whitelist required during the first 24h.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-zenko-muted">
              <li>· Tokens claimable at TGE</li>
              <li>· Funds locked in audited contract</li>
              <li>· Refundable if soft cap not reached</li>
            </ul>
          </div>

          <form onSubmit={onBuy} className="glass rounded-2xl p-5">
            <label className="text-xs text-zenko-muted">You pay (ETH)</label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-zenko-border bg-zenko-bg px-4 py-3">
              <input
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg"
              />
              <span className="text-zenko-muted">ETH</span>
            </div>

            <div className="mt-4 text-xs text-zenko-muted">You receive (estimated)</div>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-zenko-border bg-zenko-bg px-4 py-3">
              <span className="flex-1 text-lg font-semibold">
                {tokenEstimate.toLocaleString()}
              </span>
              <span className="text-zenko-accent2 font-semibold">ZENKO</span>
            </div>

            <button type="submit" className="btn-primary w-full mt-5" disabled={status.state === "loading"}>
              {status.state === "loading" ? "Processing…" : "Buy with ETH"}
            </button>

            <div className="mt-3 text-xs h-5">
              {status.state === "success" && <span className="text-zenko-green">{status.msg}</span>}
              {status.state === "pending" && <span className="text-zenko-accent2">{status.msg}</span>}
              {status.state === "error" && <span className="text-red-400">{status.msg}</span>}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
