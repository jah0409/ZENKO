import { motion } from "framer-motion";
import { TOKENOMICS } from "../utils/constants";

function DonutChart({ data }) {
  const size = 240;
  const radius = 100;
  const stroke = 28;
  const c = 2 * Math.PI * radius;
  let acc = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
        <circle r={radius} fill="none" stroke="#1c2336" strokeWidth={stroke} />
        {data.map((d) => {
          const len = (d.value / 100) * c;
          const dash = `${len} ${c - len}`;
          const offset = -((acc / 100) * c);
          acc += d.value;
          return (
            <circle
              key={d.label}
              r={radius}
              fill="none"
              stroke={d.color}
              strokeWidth={stroke}
              strokeDasharray={dash}
              strokeDashoffset={offset}
              strokeLinecap="butt"
            />
          );
        })}
      </g>
      <text x="50%" y="48%" textAnchor="middle" className="fill-white" fontSize="22" fontWeight="700">
        1B
      </text>
      <text x="50%" y="58%" textAnchor="middle" className="fill-zenko-muted" fontSize="11">
        Total Supply
      </text>
    </svg>
  );
}

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-zenko-accent2">Tokenomics</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">
            A token built for <span className="gradient-text">the community.</span>
          </h2>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <DonutChart data={TOKENOMICS} />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-3">
            {TOKENOMICS.map((t) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full" style={{ background: t.color }} />
                  <span className="font-medium">{t.label}</span>
                </div>
                <div className="text-lg font-bold">{t.value}%</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
