import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-20 md:py-28 border-t border-zenko-border">
      <div className="mx-auto max-w-3xl px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold">
          Get the <span className="gradient-text">ZENKO</span> insider drop.
        </h2>
        <p className="mt-3 text-zenko-muted">
          Presale dates, audits, listings, and ecosystem releases — straight to your inbox.
        </p>

        <form onSubmit={submit} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus("idle");
            }}
            placeholder="you@domain.com"
            className="flex-1 max-w-md rounded-xl bg-zenko-card border border-zenko-border px-4 py-3 outline-none focus:border-zenko-accent transition"
          />
          <button type="submit" className="btn-primary" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
        <div className="mt-3 text-sm h-5">
          {status === "success" && <span className="text-zenko-green">You're on the list. Welcome aboard.</span>}
          {status === "invalid" && <span className="text-red-400">Please enter a valid email.</span>}
        </div>
      </div>
    </section>
  );
}
