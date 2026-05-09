export default function NetworkBackground() {
  const nodes = [
    { x: 8, y: 18 }, { x: 22, y: 60 }, { x: 14, y: 88 },
    { x: 38, y: 32 }, { x: 52, y: 70 }, { x: 70, y: 22 },
    { x: 86, y: 50 }, { x: 92, y: 84 }, { x: 64, y: 90 },
  ];
  const links = [
    [0,1],[0,3],[1,2],[1,4],[3,5],[3,4],[4,8],[5,6],[6,7],[6,4],[7,8],[2,4],
  ];
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-hero-grid" />
      <div className="absolute inset-0 grid-bg" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4a7" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#2dd4a7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#00ffa3" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id="nodeGrad">
            <stop offset="0%" stopColor="#7df9c8" />
            <stop offset="100%" stopColor="#2dd4a7" stopOpacity="0" />
          </radialGradient>
        </defs>
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="url(#lineGrad)"
            strokeWidth="0.18"
            className="dash"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r="2.2" fill="url(#nodeGrad)" />
            <circle cx={n.x} cy={n.y} r="0.6" fill="#7df9c8" />
          </g>
        ))}
      </svg>
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-zenko-accent/20 blur-[120px]" />
    </div>
  );
}
