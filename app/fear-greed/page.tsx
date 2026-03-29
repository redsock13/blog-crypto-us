"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const FEAR_VALUE = 45; // hardcoded at "Fear"
const DEGREE = -90 + (FEAR_VALUE / 100) * 180; // maps 0-100 to -90 to +90 degrees

const historical = [
  { date: "Mar 22", value: 38, label: "Fear" },
  { date: "Mar 23", value: 42, label: "Fear" },
  { date: "Mar 24", value: 51, label: "Neutral" },
  { date: "Mar 25", value: 47, label: "Fear" },
  { date: "Mar 26", value: 44, label: "Fear" },
  { date: "Mar 27", value: 49, label: "Fear" },
  { date: "Mar 28", value: 45, label: "Fear" },
];

const zones = [
  { label: "Extreme Fear", range: "0–24", color: "#ef4444" },
  { label: "Fear", range: "25–49", color: "#f97316" },
  { label: "Neutral", range: "50–55", color: "#eab308" },
  { label: "Greed", range: "56–74", color: "#84cc16" },
  { label: "Extreme Greed", range: "75–100", color: "#10b981" },
];

export default function FearGreed() {
  const needleRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!needleRef.current) return;
    needleRef.current.style.transition = "transform 1.5s cubic-bezier(0.34,1.56,0.64,1)";
    needleRef.current.style.transform = `rotate(${DEGREE}deg)`;
  }, []);

  return (
    <main style={{ background: "#050608", minHeight: "100vh", color: "#e2e8f0" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(5,6,8,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(249,115,22,0.1)", padding: "0 48px", height: 64, display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>
          CryptoCompass ₿
        </Link>
        <span style={{ color: "#1e293b" }}>›</span>
        <span style={{ color: "#475569", fontSize: 14 }}>Fear & Greed Index</span>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 48px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 16 }}>
            Crypto Fear &{" "}
            <span style={{ background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Greed</span>{" "}
            Index
          </h1>
          <p style={{ color: "#64748b", fontSize: 17, maxWidth: 500, margin: "0 auto" }}>
            Market sentiment analysis updated daily. Use it as a contrarian signal — extreme fear = buying opportunity.
          </p>
        </div>

        {/* Gauge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}>
          <div style={{ position: "relative", width: 340, height: 200 }}>
            <svg width="340" height="200" viewBox="0 0 340 200">
              {/* Background arc */}
              <defs>
                <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="25%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="75%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Gauge background */}
              <path d="M 30 170 A 140 140 0 0 1 310 170" stroke="rgba(255,255,255,0.06)" strokeWidth="24" fill="none" />
              {/* Gauge fill */}
              <path d="M 30 170 A 140 140 0 0 1 310 170" stroke="url(#gaugeGrad)" strokeWidth="20" fill="none" strokeLinecap="round" />

              {/* Needle */}
              <g style={{ transformOrigin: "170px 170px", transform: `rotate(${DEGREE}deg)`, transition: "transform 1.5s cubic-bezier(0.34,1.56,0.64,1)" }}>
                <line x1="170" y1="170" x2="170" y2="50" stroke="#f8fafc" strokeWidth="3" strokeLinecap="round" />
                <circle cx="170" cy="170" r="8" fill="#f8fafc" />
              </g>

              {/* Labels */}
              <text x="15" y="190" fill="#ef4444" fontSize="11" fontWeight="700">FEAR</text>
              <text x="155" y="30" fill="#eab308" fontSize="11" fontWeight="700" textAnchor="middle">NEUTRAL</text>
              <text x="295" y="190" fill="#10b981" fontSize="11" fontWeight="700" textAnchor="end">GREED</text>
            </svg>

            {/* Value display */}
            <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#f97316", lineHeight: 1, letterSpacing: "-0.04em" }}>{FEAR_VALUE}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#f97316", marginTop: 4 }}>FEAR</div>
              <div style={{ color: "#475569", fontSize: 13, marginTop: 8 }}>As of March 29, 2026</div>
            </div>
          </div>
        </div>

        {/* Context */}
        <div style={{ background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 16, padding: 28, marginTop: 40, marginBottom: 48 }}>
          <h3 style={{ color: "#f97316", fontWeight: 700, fontSize: 17, marginBottom: 12 }}>What does this mean?</h3>
          <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 15 }}>
            A score of <strong style={{ color: "#f97316" }}>{FEAR_VALUE}</strong> indicates the market is in a state of <strong style={{ color: "#f97316" }}>Fear</strong>.
            Historically, extreme fear periods have often preceded significant Bitcoin price recoveries.
            Warren Buffett's principle applies to crypto: "Be fearful when others are greedy, and greedy when others are fearful."
          </p>
          <p style={{ color: "#64748b", fontSize: 14, marginTop: 12 }}>
            ⚠️ This is not financial advice. Crypto markets are highly volatile. Never invest more than you can afford to lose.
          </p>
        </div>

        {/* Historical */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>Past 7 Days</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
            {historical.map((d, i) => (
              <div key={i} style={{ textAlign: "center", background: "#0a0a0c", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 12, padding: "12px 8px" }}>
                <div style={{ fontSize: 11, color: "#475569", marginBottom: 8 }}>{d.date}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: d.value < 45 ? "#f97316" : d.value < 55 ? "#eab308" : "#10b981" }}>{d.value}</div>
                <div style={{ fontSize: 10, color: "#374151", marginTop: 4 }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Zones */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>Index Zones Explained</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {zones.map((z, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, background: "#0a0a0c", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "16px 20px" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: z.color, flexShrink: 0 }} />
                <div style={{ fontWeight: 700, color: "#e2e8f0", minWidth: 130 }}>{z.label}</div>
                <div style={{ color: "#475569", fontSize: 14 }}>Score: {z.range}</div>
                {z.label === "Fear" && <div style={{ marginLeft: "auto", background: "rgba(249,115,22,0.15)", color: "#f97316", fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 100 }}>CURRENT</div>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.1),rgba(234,179,8,0.05))", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 20, padding: 40, textAlign: "center" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#f8fafc", marginBottom: 16 }}>Ready to buy during the fear?</h2>
          <p style={{ color: "#64748b", marginBottom: 28 }}>Open an account on our top-rated exchange. Takes 2 minutes.</p>
          <a href="#" style={{ display: "inline-block", background: "linear-gradient(135deg,#f97316,#eab308)", color: "#000", fontWeight: 800, padding: "14px 32px", borderRadius: 12, textDecoration: "none", fontSize: 16 }}>
            Open Coinbase Account →
          </a>
          <p style={{ color: "#1e293b", fontSize: 11, marginTop: 12 }}>Affiliate link · Not financial advice · DYOR</p>
        </div>
      </div>

      <footer style={{ padding: "48px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#374151", fontSize: 13, marginTop: 40 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <Link href="/" style={{ color: "#f97316", textDecoration: "none", fontWeight: 700 }}>← CryptoCompass</Link>
          <span>© 2026 CryptoCompass · Crypto is risky · DYOR</span>
        </div>
      </footer>
    </main>
  );
}
