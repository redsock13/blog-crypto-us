"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cryptoPages } from "@/data/crypto";
import CustomCursor from "@/components/CustomCursor";

const BitcoinGlobe3D = dynamic(() => import("@/components/BitcoinGlobe3D"), { ssr: false });

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₿Ξ$#";
function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, i) => {
        if (i < iter) return char;
        if (char === " ") return " ";
        return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
      }).join(""));
      iter += 0.5;
      if (iter >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return display;
}

const marketData = [
  { coin: "Bitcoin", symbol: "BTC", price: "$72,450", change: "+3.2%", positive: true },
  { coin: "Ethereum", symbol: "ETH", price: "$3,820", change: "+1.8%", positive: true },
  { coin: "Solana", symbol: "SOL", price: "$182", change: "-0.9%", positive: false },
  { coin: "BNB", symbol: "BNB", price: "$412", change: "+0.5%", positive: true },
];

const marqueeItems = [
  "Bitcoin spot ETF approved by SEC",
  "$2T+ total crypto market cap",
  "50+ exchanges reviewed",
  "Updated daily with live data",
  "No paid rankings",
  "US-focused, regulatory-aware",
  "Cold wallet guides included",
];

const exchanges = [
  { name: "Coinbase", fee: "0.6%", coins: "250+", rating: "9.4/10" },
  { name: "Kraken", fee: "0.26%", coins: "220+", rating: "9.2/10" },
  { name: "Gemini", fee: "0.35%", coins: "70+", rating: "8.9/10" },
  { name: "Binance.US", fee: "0.1%", coins: "150+", rating: "7.8/10" },
];

const steps = [
  { n: "01", title: "Regulation First", desc: "We only review exchanges that comply with US regulations. Your funds should be protected." },
  { n: "02", title: "Real Testing", desc: "We open accounts, deposit funds, and execute real trades to evaluate every aspect." },
  { n: "03", title: "No Hype", desc: "We cut through the noise. Just data, security assessments, and honest recommendations." },
];

const featured = cryptoPages.slice(0, 6);

export default function Home() {
  const h1 = useScramble("Navigate crypto with confidence.");
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <CustomCursor />
      <main style={{ background: "#050608" }} className="min-h-screen">

        {/* NAV */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 h-16"
          style={{ background: "rgba(5,6,8,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(249,115,22,0.1)" }}
        >
          <span
            className="font-extrabold text-xl"
            style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            CryptoCompass ₿
          </span>
          <div className="hidden md:flex gap-8 text-sm text-slate-500 flex-wrap">
            <Link href="/fear-greed" className="text-slate-500 no-underline hover:text-slate-300 transition-colors">Fear &amp; Greed</Link>
            <Link href={`/${cryptoPages[0].slug}`} className="text-slate-500 no-underline hover:text-slate-300 transition-colors">Reviews</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col lg:flex-row items-center px-4 md:px-8 lg:px-16 pt-24 pb-16 overflow-hidden">
          <div
            className="absolute pointer-events-none"
            style={{ top: "15%", left: "20%", width: 700, height: 700, background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 60%)" }}
          />
          <div className="flex-1 max-w-2xl relative z-10 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#f97316" }} />
              <span className="text-xs font-semibold" style={{ color: "#f97316" }}>BTC: $72,450 · ETH: $3,820 · SOL: $182</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-slate-50 mb-4">
              {h1}
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
              <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>No hype.</span>{" "}
              <span className="text-slate-200">Just data.</span>
            </h2>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
              Unbiased crypto exchange reviews, wallet comparisons, and guides for US investors. Regulatory-aware. Security-focused.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={`/${cryptoPages[0].slug}`} className="btn-glow" style={{ fontSize: 16 }}>
                Best Exchanges 2026 →
              </Link>
              <Link
                href="/fear-greed"
                className="inline-block px-7 py-3.5 rounded-xl text-base font-semibold"
                style={{ border: "1px solid rgba(249,115,22,0.3)", color: "#f97316", textDecoration: "none" }}
              >
                Fear &amp; Greed Index
              </Link>
            </div>
          </div>

          {/* Globe — hidden on mobile, visible on desktop */}
          <div className="hidden lg:block flex-1 absolute top-0 h-full z-0" style={{ right: -80, width: "55%" }}>
            <BitcoinGlobe3D />
          </div>
        </section>

        {/* MARQUEE */}
        <div
          className="overflow-hidden py-4"
          style={{ borderTop: "1px solid rgba(249,115,22,0.08)", borderBottom: "1px solid rgba(249,115,22,0.08)", background: "rgba(249,115,22,0.02)" }}
        >
          <div className="marquee-inner inline-flex gap-12 text-slate-600 text-xs font-medium">
            {[...marqueeItems, ...marqueeItems].map((s, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap">
                <span style={{ color: "#f97316" }}>₿</span> {s}
              </span>
            ))}
          </div>
        </div>

        {/* MARKET OVERVIEW */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: "#f97316" }}>MARKET OVERVIEW</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {marketData.map(m => (
                <div key={m.coin} className="market-card">
                  <div className="flex justify-between items-center mb-3">
                    <div className="text-xs font-bold" style={{ color: "#f97316" }}>{m.symbol}</div>
                    <div className="text-xs font-semibold" style={{ color: m.positive ? "#10b981" : "#ef4444" }}>{m.change}</div>
                  </div>
                  <div className="text-2xl font-black tracking-tight" style={{ color: "#f8fafc" }}>{m.price}</div>
                  <div className="text-xs mt-1" style={{ color: "#475569" }}>{m.coin}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs mt-3" style={{ color: "#1e293b" }}>* Placeholder data — connect to real API for live prices</p>
          </div>
        </section>

        {/* TOP EXCHANGES TABLE */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 pb-16 md:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-50">
                Top Exchanges This{" "}
                <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Week</span>
              </h2>
            </div>
            <div className="rounded-2xl overflow-hidden overflow-x-auto" style={{ background: "#0a0a0c", border: "1px solid rgba(249,115,22,0.12)" }}>
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Exchange</th>
                    <th>Trading Fee</th>
                    <th>Coins</th>
                    <th>Our Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {exchanges.map((ex, i) => (
                    <tr key={ex.name}>
                      <td>
                        <div className="flex items-center gap-3 flex-wrap">
                          {i === 0 && (
                            <span
                              className="text-xs font-bold px-2 py-0.5 rounded-full"
                              style={{ background: "rgba(249,115,22,0.15)", color: "#f97316" }}
                            >
                              BEST PICK
                            </span>
                          )}
                          <span className="font-bold" style={{ color: "#e2e8f0" }}>{ex.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#10b981", fontWeight: 600 }}>{ex.fee}</td>
                      <td style={{ color: "#94a3b8" }}>{ex.coins}</td>
                      <td style={{ color: i === 0 ? "#f97316" : "#64748b", fontWeight: 700 }}>{ex.rating}</td>
                      <td>
                        <a
                          href="#"
                          className="px-4 py-2 rounded-lg text-xs font-bold no-underline"
                          style={{
                            background: i === 0 ? "linear-gradient(135deg,#f97316,#eab308)" : "transparent",
                            color: i === 0 ? "#000" : "#f97316",
                            border: i === 0 ? "none" : "1px solid rgba(249,115,22,0.3)"
                          }}
                        >
                          {i === 0 ? "Top Pick →" : "Review →"}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FEATURED COMPARISONS */}
        <section
          ref={el => addReveal(el as HTMLElement)}
          className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-24"
          style={{ background: "rgba(249,115,22,0.02)", borderTop: "1px solid rgba(249,115,22,0.06)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#f97316" }}>COMPARISONS</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50">
                Expert{" "}
                <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Reviews
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(c => (
                <Link key={c.slug} href={`/${c.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-border p-7 transition-all duration-300">
                    <div className="flex justify-between mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(249,115,22,0.1)", color: "#f97316" }}
                      >
                        {c.category}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: "#eab308" }}>{c.commission}</span>
                    </div>
                    <h3 className="text-base font-bold leading-snug mb-4" style={{ color: "#f1f5f9" }}>{c.title}</h3>
                    <div className="flex gap-2.5 flex-wrap">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(249,115,22,0.12)", color: "#fb923c" }}
                      >
                        🥇 {c.winner}
                      </span>
                      <span className="text-xs flex items-center" style={{ color: "#374151" }}>vs {c.runner_up}</span>
                    </div>
                    <div className="mt-5 text-xs font-semibold" style={{ color: "#f97316" }}>Read comparison →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50">Our Research Method</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((s, i) => (
                <div key={i} className="relative p-8">
                  <div className="ghost-number">{s.n}</div>
                  <div className="relative z-10">
                    <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#f97316" }}>{s.n}</div>
                    <h3 className="text-xl md:text-2xl font-extrabold mb-3" style={{ color: "#f1f5f9" }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST STATS */}
        <section
          ref={el => addReveal(el as HTMLElement)}
          className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-24"
          style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.04),rgba(234,179,8,0.02))", borderTop: "1px solid rgba(249,115,22,0.06)" }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-16">
              The most trusted crypto resource for US investors
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: "50+", label: "Exchanges reviewed" },
                { n: "5M+", label: "Monthly readers" },
                { n: "3 yrs", label: "Of crypto coverage" },
                { n: "0", label: "Paid rankings" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="pulse-glow text-3xl md:text-4xl lg:text-5xl font-black mb-2" style={{ color: "#f97316" }}>{s.n}</div>
                  <div className="text-sm" style={{ color: "#475569" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 py-20 md:py-28 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.07), transparent)" }}
          />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-50 mb-6">
              Ready to buy your first{" "}
              <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Bitcoin?
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 mb-10">
              Start with our best exchange pick for 2026. Regulated, secure, and beginner-friendly.
            </p>
            <Link href={`/${cryptoPages[0].slug}`} className="btn-glow" style={{ fontSize: 18, padding: "18px 40px" }}>
              Find Best Exchange →
            </Link>
          </div>
        </section>

        <footer
          className="px-4 md:px-8 lg:px-12 py-12 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#374151" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="font-extrabold text-base mb-2" style={{ color: "#f97316" }}>CryptoCompass ₿</div>
              <div>US crypto exchange reviews since 2021. Not financial advice.</div>
            </div>
            <div>
              <p>Affiliate Disclosure: We earn commissions. This doesn&apos;t affect rankings.</p>
              <p className="mt-2">© 2026 CryptoCompass · Crypto is risky · DYOR</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
