import { motion } from "framer-motion";
import { PILLARS } from "../utils/constants";

export default function Pillars() {
  return (
    <section id="pillars" className="py-20 md:py-28 border-t border-zenko-border bg-zenko-panel/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-zenko-accent2">5 Pillars</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">
            One ecosystem. <span className="gradient-text">Five powerful pillars.</span>
          </h2>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative rounded-2xl border border-zenko-border bg-zenko-card p-6 overflow-hidden group"
            >
              <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-zenko-accent/20 blur-2xl group-hover:bg-zenko-accent/40 transition" />
              <div className="text-3xl font-extrabold gradient-text">0{i + 1}</div>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-zenko-muted">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
