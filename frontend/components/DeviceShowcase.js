import { motion } from "framer-motion";
import Logo from "./Logo";

function MiniChart() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-20">
      <defs>
        <linearGradient id="ch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2dd4a7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#2dd4a7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 10 L200 14 L200 80 L0 80 Z"
        fill="url(#ch)"
      />
      <path
        d="M0 60 L20 50 L40 55 L60 35 L80 42 L100 25 L120 30 L140 18 L160 22 L180 10 L200 14"
        fill="none"
        stroke="#00ffa3"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Phone() {
  return (
    <div className="relative w-[230px] md:w-[260px] aspect-[9/19] rounded-[36px] border border-zenko-accent/30 bg-[#020806] p-2 shadow-glow">
      <div className="absolute -inset-px rounded-[36px] bg-gradient-to-b from-zenko-accent/30 to-transparent pointer-events-none" />
      <div className="relative h-full w-full rounded-[28px] bg-black overflow-hidden border border-zenko-border">
        {/* notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black border border-zenko-border z-10" />
        {/* screen content */}
        <div className="p-4 pt-10 h-full flex flex-col gap-3 relative">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6" glow={false} />
            <span className="text-xs font-extrabold tracking-widest">ZENKO</span>
            <span className="ml-auto text-[10px] text-zenko-muted">Wallet</span>
          </div>
          <div className="rounded-2xl border border-zenko-border bg-zenko-card p-3">
            <div className="text-[10px] text-zenko-muted">Balance</div>
            <div className="text-xl font-bold text-white">12,480 <span className="text-zenko-accent">ZENKO</span></div>
            <div className="text-[10px] text-zenko-accent2">+8.42% today</div>
            <MiniChart />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Stake","Swap","Send"].map((l) => (
              <div key={l} className="rounded-xl border border-zenko-border bg-zenko-card py-2 text-center text-[10px] text-zenko-text">
                {l}
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-zenko-border bg-zenko-card p-3">
            <div className="text-[10px] text-zenko-muted mb-2">Staking</div>
            <div className="flex items-center justify-between text-xs">
              <span>APY</span><span className="text-zenko-neon font-bold">40%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-zenko-border overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-zenko-accent to-zenko-neon" />
            </div>
          </div>
          {/* scanline */}
          <div className="absolute inset-0 pointer-events-none scanline" />
        </div>
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div className="relative w-full max-w-[640px]">
      <div className="rounded-2xl border border-zenko-accent/30 bg-[#020806] p-3 shadow-glow">
        <div className="rounded-xl bg-black border border-zenko-border overflow-hidden aspect-[16/10] relative">
          {/* top bar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-zenko-border">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <span className="h-2 w-2 rounded-full bg-green-500/70" />
            <span className="ml-3 text-[10px] text-zenko-muted">app.zenko.xyz</span>
          </div>
          {/* dashboard grid */}
          <div className="grid grid-cols-3 gap-2 p-3 h-full">
            <div className="col-span-2 rounded-lg border border-zenko-border bg-zenko-card p-3">
              <div className="flex items-center justify-between text-[10px] text-zenko-muted">
                <span>ZENKO / USDT</span>
                <span className="text-zenko-neon">+12.3%</span>
              </div>
              <div className="text-xl font-bold mt-1">$0.0421</div>
              <MiniChart />
              <div className="grid grid-cols-4 gap-1 mt-1">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-1 rounded bg-zenko-accent/40" />
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-zenko-border bg-zenko-card p-3 flex flex-col gap-2">
              <div className="text-[10px] text-zenko-muted">AI Bot</div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zenko-neon animate-pulse" />
                <span className="text-xs">Long ETH</span>
              </div>
              <div className="text-[10px] text-zenko-accent2">+2.1% PnL</div>
              <div className="mt-auto h-8 rounded bg-gradient-to-r from-zenko-accent/30 to-transparent" />
            </div>
            <div className="rounded-lg border border-zenko-border bg-zenko-card p-3">
              <div className="text-[10px] text-zenko-muted">Stake</div>
              <div className="text-sm font-bold">5,400 ZENKO</div>
              <div className="text-[10px] text-zenko-neon">Earning · 40% APY</div>
            </div>
            <div className="rounded-lg border border-zenko-border bg-zenko-card p-3">
              <div className="text-[10px] text-zenko-muted">Governance</div>
              <div className="text-sm font-bold">3 Active</div>
              <div className="text-[10px] text-zenko-accent2">Vote now</div>
            </div>
            <div className="rounded-lg border border-zenko-border bg-zenko-card p-3">
              <div className="text-[10px] text-zenko-muted">Revenue</div>
              <div className="text-sm font-bold">+0.21 ETH</div>
              <div className="text-[10px] text-zenko-neon">Claim</div>
            </div>
          </div>
          {/* sweep highlight */}
          <div className="absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-zenko-accent/10 to-transparent animate-sweep pointer-events-none" />
        </div>
      </div>
      {/* base */}
      <div className="mx-auto h-2 w-1/2 rounded-b-xl bg-zenko-border" />
    </div>
  );
}

export default function DeviceShowcase() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60 -z-10" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-zenko-accent/10 blur-[120px] -z-10" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-zenko-accent2">Cinematic UX</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">
            Trade, stake and govern <span className="gradient-text">on every screen.</span>
          </h2>
          <p className="mt-4 text-zenko-muted">
            One identity, one wallet, one experience — desktop dashboards or
            mobile-first flows. Zero compromise.
          </p>
        </div>

        <div className="mt-16 relative flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 18 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            style={{ transformPerspective: 1200 }}
          >
            <Laptop />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformPerspective: 1200 }}
            className="-mt-24 md:-mt-28 md:-mr-[460px] md:self-center"
          >
            <Phone />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
