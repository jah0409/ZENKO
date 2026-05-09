export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pillars", href: "#pillars" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "FAQ", href: "#faq" },
];

export const FEATURES = [
  {
    title: "Quantum-Secure",
    desc: "Post-quantum cryptography hardens every layer against tomorrow's attacks.",
    icon: "shield",
  },
  {
    title: "Community-Owned",
    desc: "60% of supply belongs to the community. Governance you can verify on-chain.",
    icon: "users",
  },
  {
    title: "AI-Powered",
    desc: "Trading copilots and on-chain intelligence built into the core platform.",
    icon: "spark",
  },
  {
    title: "Revenue Sharing",
    desc: "Stakers and active users earn a share of protocol revenue every epoch.",
    icon: "coin",
  },
  {
    title: "Privacy-First",
    desc: "Selective disclosure and zk-proofs let you transact without leaking data.",
    icon: "lock",
  },
  {
    title: "Institutional Tools",
    desc: "Audit trails, custodial integrations, and compliance built for funds.",
    icon: "building",
  },
];

export const PILLARS = [
  {
    title: "Exchange",
    desc: "A self-custodial CEX/DEX hybrid with deep books and instant settlement.",
  },
  {
    title: "AI Trading Bot",
    desc: "Strategy-as-a-service. Copy bots, build your own, and backtest on-chain.",
  },
  {
    title: "Intelligence Tools",
    desc: "Wallet labels, smart-money flows, and signals across 30+ chains.",
  },
  {
    title: "Quantum L1",
    desc: "A high-throughput chain hardened with post-quantum signatures.",
  },
  {
    title: "Staking & Rewards",
    desc: "Stake ZENKO to earn protocol fees, governance rights, and yield.",
  },
];

export const TOKENOMICS = [
  { label: "Community", value: 60, color: "#00ffa3" },
  { label: "Liquidity", value: 10, color: "#2dd4a7" },
  { label: "Marketing", value: 10, color: "#5eead4" },
  { label: "Team", value: 10, color: "#10b981" },
  { label: "Treasury", value: 5, color: "#0fae7e" },
  { label: "Other", value: 5, color: "#7df9c8" },
];

export const ROADMAP = [
  {
    quarter: "2026 H1",
    title: "Foundation",
    items: [
      "Token launch and presale",
      "Public testnet of Quantum L1",
      "Staking v1 live",
    ],
  },
  {
    quarter: "2026 H2",
    title: "Acceleration",
    items: [
      "Exchange v1 launch",
      "AI trading bot beta",
      "Mainnet of Quantum L1",
    ],
  },
  {
    quarter: "2027 H1",
    title: "Expansion",
    items: [
      "Institutional desk and OTC",
      "Intelligence Tools v2",
      "Cross-chain bridges live",
    ],
  },
  {
    quarter: "2027 H2",
    title: "Sovereignty",
    items: [
      "Full DAO control",
      "Revenue-sharing v2",
      "Mobile app GA",
    ],
  },
];

export const FAQS = [
  {
    q: "What is ZENKO?",
    a: "ZENKO is a quantum-secure, community-owned crypto ecosystem combining an exchange, AI trading, intelligence tools, an L1 chain, and staking.",
  },
  {
    q: "How do I join the presale?",
    a: "Connect your wallet, ensure you are whitelisted, and contribute ETH between the min and max limits. Tokens are calculated by the on-chain presale price.",
  },
  {
    q: "Is the contract audited?",
    a: "The contracts use battle-tested OpenZeppelin libraries. A full third-party audit will be published before mainnet rewards begin.",
  },
  {
    q: "What are the staking rewards?",
    a: "Variable APY up to 40% based on lock duration and protocol revenue. Rewards accrue per second and can be claimed any time.",
  },
  {
    q: "Where will ZENKO be listed?",
    a: "ZENKO will launch on the native Exchange and a curated set of partner DEXs. CEX listings will follow the roadmap.",
  },
];
