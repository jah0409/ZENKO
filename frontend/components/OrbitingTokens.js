import Logo from "./Logo";

const TOKENS = [
  { sym: "BTC",  color: "#f7931a", angle: 0,   r: 180, dur: 26 },
  { sym: "ETH",  color: "#8a92b2", angle: 60,  r: 180, dur: 26 },
  { sym: "USDT", color: "#26a17b", angle: 120, r: 180, dur: 26 },
  { sym: "BNB",  color: "#f3ba2f", angle: 200, r: 240, dur: 38 },
  { sym: "TON",  color: "#0098ea", angle: 280, r: 240, dur: 38 },
  { sym: "USDC", color: "#2775ca", angle: 340, r: 240, dur: 38 },
];

function TokenBubble({ sym, color }) {
  return (
    <div
      className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#0c1a13] border border-zenko-border flex items-center justify-center shadow-glowSm"
      style={{ boxShadow: `0 0 20px ${color}55, inset 0 0 0 1px ${color}33` }}
    >
      <span className="text-[10px] md:text-xs font-bold tracking-wider" style={{ color }}>
        {sym}
      </span>
    </div>
  );
}

export default function OrbitingTokens() {
  return (
    <div className="relative mx-auto h-[420px] w-[420px] md:h-[560px] md:w-[560px] flex items-center justify-center">
      {/* outer rings */}
      <div className="absolute inset-0 rounded-full border border-zenko-accent/20 animate-spinSlow" />
      <div className="absolute inset-8 rounded-full border border-zenko-accent/15 animate-spinReverse" />
      <div className="absolute inset-16 rounded-full border border-zenko-accent/10" />

      {/* radial glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zenko-accent/20 via-transparent to-zenko-neon/10 blur-2xl" />

      {/* center coin */}
      <div className="relative z-10 animate-float">
        <div className="relative h-44 w-44 md:h-56 md:w-56 rounded-full bg-gradient-to-br from-[#0c1a13] to-[#020806] border border-zenko-accent/40 flex items-center justify-center shadow-glow">
          <div className="absolute inset-0 rounded-full bg-zenko-accent/10 animate-pulseGlow" />
          <Logo className="h-24 w-24 md:h-32 md:w-32 relative z-10" />
          <div className="absolute -inset-2 rounded-full border border-zenko-accent/20" />
        </div>
      </div>

      {/* orbiting bubbles */}
      {TOKENS.map((t) => (
        <div
          key={t.sym}
          className="absolute orbit"
          style={{
            "--r": `${t.r / 2}px`,
            "--dur": `${t.dur}s`,
            transform: `rotate(${t.angle}deg) translateX(${t.r / 2}px) rotate(-${t.angle}deg)`,
          }}
        >
          <TokenBubble sym={t.sym} color={t.color} />
        </div>
      ))}

      {/* particle dots */}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-zenko-accent/70 drift"
          style={{
            top: `${10 + (i * 9) % 80}%`,
            left: `${(i * 17) % 95}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
