import { motion } from "framer-motion";
import { ROADMAP } from "../utils/constants";

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 md:py-28 border-t border-zenko-border bg-zenko-panel/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-zenko-accent2">Roadmap</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">
            From <span className="gradient-text">presale</span> to a self-sovereign DAO.
          </h2>
        </div>

        <div className="mt-14 relative">
          <div className="hidden md:block absolute left-0 right-0 top-12 h-[2px] bg-gradient-to-r from-zenko-accent to-zenko-accent2" />
          <div className="grid md:grid-cols-4 gap-6">
            {ROADMAP.map((r, i) => (
              <motion.div
                key={r.quarter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <div className="hidden md:flex h-6 w-6 rounded-full bg-zenko-bg border-2 border-zenko-accent items-center justify-center mx-auto mt-9 mb-4">
                  <div className="h-2 w-2 rounded-full bg-zenko-accent2" />
                </div>
                <div className="rounded-2xl border border-zenko-border bg-zenko-card p-5">
                  <div className="text-xs uppercase tracking-wider text-zenko-accent2">{r.quarter}</div>
                  <h3 className="mt-1 text-lg font-semibold">{r.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-zenko-muted">
                    {r.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="text-zenko-accent2">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
