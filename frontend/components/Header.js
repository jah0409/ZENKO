import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";
import WalletButton from "./WalletButton";
import { NAV_LINKS } from "../utils/constants";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 backdrop-blur bg-zenko-bg/70 border-b border-zenko-border"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <Logo />
          <span className="font-extrabold tracking-wider">ZENKO</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-zenko-muted hover:text-white transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <WalletButton />
          <a href="#presale" className="btn-primary text-sm">
            Join Presale
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg border border-zenko-border"
          onClick={() => setOpen(!open)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zenko-border">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-zenko-muted hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <WalletButton />
              <a href="#presale" className="btn-primary text-sm flex-1 text-center">
                Join Presale
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
