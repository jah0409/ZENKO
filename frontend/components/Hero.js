import { motion } from "framer-motion";

const stats = [
  { label: "Total Supply", value: "1B ZENKO" },
  { label: "Community Allocation", value: "60%" },
  { label: "Max Staking APY", value: "40%" },
  { label: "Presale Round", value: "Round 1" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-20 pb-24 md:pt-28 md:pb-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-zenko-border bg-zenko-panel/60 px-4 py-1.5 text-xs text-zenko-muted">
            <span className="h-2 w-2 rounded-full bg-zenko-green animate-pulse" />
            Presale Round 1 — Live
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="block">Better Than Zenko.</span>
            <span className="gradient-text">Built Better.</span>
          </h1>
          <p className="mt-6 text-lg text-zenko-muted">
            A quantum-secure, community-owned crypto ecosystem with AI-powered
            trading, on-chain intelligence, revenue sharing, and institutional
            tools — all on a single chain.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#presale" className="btn-primary">Join Presale</a>
            <a href="#features" className="btn-ghost">Explore Ecosystem</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-zenko-muted mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
