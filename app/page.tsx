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
      <main style={{ background: "#050608", minHeight: "100vh" }}>
        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(5,6,8,0.88)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(249,115,22,0.1)", padding: "0 48px",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            CryptoCompass ₿
          </span>
          <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#64748b" }}>
            <Link href="/fear-greed" style={{ color: "#64748b", textDecoration: "none" }}>Fear & Greed</Link>
            <Link href={`/${cryptoPages[0].slug}`} style={{ color: "#64748b", textDecoration: "none" }}>Reviews</Link>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "15%", left: "20%", width: 700, height: 700,
            background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 60%)",
            pointerEvents: "none"
          }} />
          <div style={{ flex: 1, maxWidth: 640, position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
              <span style={{ fontSize: 13, color: "#f97316", fontWeight: 600 }}>BTC: $72,450 · ETH: $3,820 · SOL: $182</span>
            </div>
            <h1 style={{ fontSize: "clamp(44px,5.5vw,80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 16 }}>
              {h1}
            </h1>
            <h2 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 24 }}>
              <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>No hype.</span>{" "}
              <span style={{ color: "#e2e8f0" }}>Just data.</span>
            </h2>
            <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.7, marginBottom: 40, maxWidth: 520 }}>
              Unbiased crypto exchange reviews, wallet comparisons, and guides for US investors. Regulatory-aware. Security-focused.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link href={`/${cryptoPages[0].slug}`} className="btn-glow" style={{ fontSize: 16 }}>
                Best Exchanges 2026 →
              </Link>
              <Link href="/fear-greed" style={{ display: "inline-block", padding: "14px 28px", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 10, color: "#f97316", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
                Fear & Greed Index
              </Link>
            </div>
          </div>
          {/* Globe */}
          <div style={{ position: "absolute", right: -80, top: 0, width: "55%", height: "100%", zIndex: 1 }}>
            <BitcoinGlobe3D />
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ borderTop: "1px solid rgba(249,115,22,0.08)", borderBottom: "1px solid rgba(249,115,22,0.08)", padding: "16px 0", overflow: "hidden", background: "rgba(249,115,22,0.02)" }}>
          <div className="marquee-inner" style={{ display: "inline-flex", gap: 48, color: "#374151", fontSize: 13, fontWeight: 500 }}>
            {[...marqueeItems, ...marqueeItems].map((s, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
                <span style={{ color: "#f97316" }}>₿</span> {s}
              </span>
            ))}
          </div>
        </div>

        {/* MARKET OVERVIEW */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "80px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ color: "#f97316", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>MARKET OVERVIEW</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {marketData.map(m => (
                <div key={m.coin} className="market-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontWeight: 700, color: "#f97316", fontSize: 13 }}>{m.symbol}</div>
                    <div style={{ color: m.positive ? "#10b981" : "#ef4444", fontSize: 13, fontWeight: 600 }}>{m.change}</div>
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: "#f8fafc", letterSpacing: "-0.02em" }}>{m.price}</div>
                  <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>{m.coin}</div>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "#1e293b", fontSize: 11, marginTop: 12 }}>* Placeholder data — connect to real API for live prices</p>
          </div>
        </section>

        {/* TOP EXCHANGES TABLE */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "0 48px 80px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#f8fafc" }}>
                Top Exchanges This{" "}
                <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Week</span>
              </h2>
            </div>
            <div style={{ background: "#0a0a0c", border: "1px solid rgba(249,115,22,0.12)", borderRadius: 20, overflow: "hidden" }}>
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
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          {i === 0 && <span style={{ background: "rgba(249,115,22,0.15)", color: "#f97316", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 100 }}>BEST PICK</span>}
                          <span style={{ fontWeight: 700, color: "#e2e8f0" }}>{ex.name}</span>
                        </div>
                      </td>
                      <td style={{ color: "#10b981", fontWeight: 600 }}>{ex.fee}</td>
                      <td style={{ color: "#94a3b8" }}>{ex.coins}</td>
                      <td style={{ color: i === 0 ? "#f97316" : "#64748b", fontWeight: 700 }}>{ex.rating}</td>
                      <td>
                        <a href="#" style={{ background: i === 0 ? "linear-gradient(135deg,#f97316,#eab308)" : "transparent", color: i === 0 ? "#000" : "#f97316", border: i === 0 ? "none" : "1px solid rgba(249,115,22,0.3)", padding: "8px 16px", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
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
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "60px 48px 100px", background: "rgba(249,115,22,0.02)", borderTop: "1px solid rgba(249,115,22,0.06)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <p style={{ color: "#f97316", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>COMPARISONS</p>
              <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, color: "#f8fafc" }}>
                Expert{" "}
                <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Reviews</span>
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
              {featured.map(c => (
                <Link key={c.slug} href={`/${c.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-border" style={{ padding: 28, transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                      <span style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100, textTransform: "uppercase" }}>
                        {c.category}
                      </span>
                      <span style={{ color: "#eab308", fontSize: 12, fontWeight: 600 }}>{c.commission}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, marginBottom: 16 }}>{c.title}</h3>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <span style={{ background: "rgba(249,115,22,0.12)", color: "#fb923c", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 8 }}>
                        🥇 {c.winner}
                      </span>
                      <span style={{ color: "#374151", fontSize: 12, display: "flex", alignItems: "center" }}>vs {c.runner_up}</span>
                    </div>
                    <div style={{ marginTop: 20, color: "#f97316", fontSize: 13, fontWeight: 600 }}>Read comparison →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "100px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: "#f8fafc" }}>Our Research Method</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
              {steps.map((s, i) => (
                <div key={i} style={{ position: "relative", padding: 32 }}>
                  <div className="ghost-number">{s.n}</div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f97316", marginBottom: 16, letterSpacing: "0.1em" }}>{s.n}</div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST STATS */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "100px 48px", background: "linear-gradient(135deg,rgba(249,115,22,0.04),rgba(234,179,8,0.02))", borderTop: "1px solid rgba(249,115,22,0.06)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#f8fafc", marginBottom: 64 }}>
              The most trusted crypto resource for US investors
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
              {[
                { n: "50+", label: "Exchanges reviewed" },
                { n: "5M+", label: "Monthly readers" },
                { n: "3 yrs", label: "Of crypto coverage" },
                { n: "0", label: "Paid rankings" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="pulse-glow" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#f97316", marginBottom: 8 }}>{s.n}</div>
                  <div style={{ fontSize: 14, color: "#475569" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "120px 48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(249,115,22,0.07), transparent)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(32px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 24 }}>
              Ready to buy your first{" "}
              <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Bitcoin?</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: 17, marginBottom: 40 }}>
              Start with our best exchange pick for 2026. Regulated, secure, and beginner-friendly.
            </p>
            <Link href={`/${cryptoPages[0].slug}`} className="btn-glow" style={{ fontSize: 18, padding: "18px 40px" }}>
              Find Best Exchange →
            </Link>
          </div>
        </section>

        <footer style={{ padding: "48px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#374151", fontSize: 13 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#f97316", marginBottom: 8 }}>CryptoCompass ₿</div>
              <div>US crypto exchange reviews since 2021. Not financial advice.</div>
            </div>
            <div>
              <p>Affiliate Disclosure: We earn commissions. This doesn't affect rankings.</p>
              <p style={{ marginTop: 8 }}>© 2026 CryptoCompass · Crypto is risky · DYOR</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
