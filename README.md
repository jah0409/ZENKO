# ZENKO

> Better Than Zenko. Built Better.

A complete crypto project: dark-themed Next.js marketing/dapp site, four
audited-style Solidity contracts (ERC-20, Presale, Staking, DAO Governance),
Hardhat tests, deploy + verify scripts, and ethers.js wallet integration.

```
ZENKO/
├── frontend/           Next.js 14 + Tailwind + Framer Motion + ethers v6
│   ├── pages/          _app.js, index.js
│   ├── components/     Header, Hero, Features, Pillars, Tokenomics,
│   │                   Presale, Roadmap, FAQ, Newsletter, Footer,
│   │                   WalletButton, Logo
│   ├── utils/          constants.js, wallet.js
│   ├── styles/         globals.css
│   └── public/
└── contracts/          Hardhat project (Solidity 0.8.24, OZ v5)
    ├── contracts/      ZENKO.sol, Presale.sol, Staking.sol, Governance.sol
    ├── test/           ZENKO / Presale / Staking / Governance tests
    ├── scripts/        deploy.js, verify.js
    └── hardhat.config.js
```

## Quick start

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local        # fill once contracts are deployed
npm run dev                       # http://localhost:3000
```

`.env.local` keys:

```
NEXT_PUBLIC_TOKEN_ADDRESS=
NEXT_PUBLIC_PRESALE_ADDRESS=
NEXT_PUBLIC_STAKING_ADDRESS=
NEXT_PUBLIC_GOVERNANCE_ADDRESS=
NEXT_PUBLIC_CHAIN_ID=11155111
```

### Smart contracts

```bash
cd contracts
npm install
cp .env.example .env              # SEPOLIA_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY
npx hardhat compile
npx hardhat test
```

### Deploy to Sepolia

```bash
npm run deploy:sepolia
# writes contracts/deployments.json with all 4 addresses

npm run verify:sepolia
# verifies all contracts on Etherscan using deployments.json
```

After deploy, copy the four addresses from `contracts/deployments.json` into
`frontend/.env.local`, restart `npm run dev`, and the wallet + presale UI
will talk to your live contracts.

### Deploy frontend to Vercel

1. Push this repo to GitHub.
2. Import the project in Vercel and set the **Root Directory** to `frontend/`.
3. Add the four `NEXT_PUBLIC_*` env vars from `.env.example`.
4. Deploy.

## Contract overview

| Contract     | Purpose                                                        |
|--------------|----------------------------------------------------------------|
| `ZENKO`      | ERC-20, 1B cap, mint (MINTER_ROLE), burn, pausable             |
| `Presale`    | ETH → ZENKO at fixed rate, whitelist, min/max, owner withdraw  |
| `Staking`    | Flexible stake, per-second accrual, APY up to 40%              |
| `Governance` | Stake-to-vote, threshold + quorum, 3d voting, 2d timelock      |

## Token distribution

- **60%** Community
- **10%** Liquidity
- **10%** Marketing
- **10%** Team
- **5%** Treasury
- **5%** Other

## Notes

- Solidity `0.8.24`, `@openzeppelin/contracts ^5`.
- All ETH-receiving paths use `ReentrancyGuard`.
- Frontend uses ethers v6 `BrowserProvider` for MetaMask.
- Newsletter form is client-side only — wire to your provider in
  `components/Newsletter.js`.
