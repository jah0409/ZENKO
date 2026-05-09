export default function Logo({ className = "h-9 w-9", glow = true }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      aria-label="ZENKO"
      style={glow ? { filter: "drop-shadow(0 0 14px rgba(0,255,163,0.55))" } : {}}
    >
      <defs>
        <linearGradient id="zk-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7df9c8" />
          <stop offset="55%" stopColor="#2dd4a7" />
          <stop offset="100%" stopColor="#0fae7e" />
        </linearGradient>
        <linearGradient id="zk-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Diamond body */}
      <path d="M100 8 L192 100 L100 192 L8 100 Z" fill="url(#zk-grad)" />

      {/* Inner Z negative-space (shadowed cutout) */}
      <path
        d="M58 70 L142 70 L142 86 L96 86 L142 130 L142 146 L58 146 L58 130 L104 130 L58 86 Z"
        fill="url(#zk-shadow)"
      />

      {/* Highlight edge */}
      <path
        d="M100 8 L192 100 L100 192"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
      />
    </svg>
  );
}
