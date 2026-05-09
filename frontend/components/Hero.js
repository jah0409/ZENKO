import { motion } from "framer-motion";
import OrbitingTokens from "./OrbitingTokens";
import NetworkBackground from "./NetworkBackground";

const stats = [
  { label: "Total Supply", value: "1B" },
  { label: "Community", value: "60%" },
  { label: "Max APY", value: "40%" },
  { label: "Audited", value: "v1" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <NetworkBackground />

      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-zenko-accent/30 bg-zenko-accent/10 px-4 py-1.5 text-xs text-zenko-accent2">
              <span className="h-2 w-2 rounded-full bg-zenko-neon animate-pulse" />
              Presale Round 1 — Live
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05]">
              <span className="block">Better Than Zenko.</span>
              <span className="block gradient-text">Built Better.</span>
            </h1>
            <p className="mt-6 text-lg text-zenko-muted max-w-xl">
              A quantum-secure, community-owned crypto ecosystem. AI trading,
              on-chain intelligence, revenue sharing and institutional tools —
              powered by a high-throughput L1.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#presale" className="btn-primary">Join Presale</a>
              <a href="#features" className="btn-ghost">Explore Ecosystem</a>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-3 max-w-md">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl glass p-3 text-center">
                  <div className="text-lg md:text-xl font-bold gradient-text">{s.value}</div>
                  <div className="text-[10px] md:text-xs text-zenko-muted mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex justify-center"
          >
            <OrbitingTokens />
          </motion.div>
        </div>
      </div>

      {/* fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black pointer-events-none" />
    </section>
  );
}
