import { cryptoPages } from "@/data/crypto";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return cryptoPages.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = cryptoPages.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: `${c.title} | CryptoCompass`, description: c.description };
}

export default async function CryptoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = cryptoPages.find((x) => x.slug === slug);
  if (!c) notFound();

  const related = cryptoPages.filter(x => x.slug !== slug && x.category === c.category).slice(0, 3);

  return (
    <main style={{ background: "#050608", minHeight: "100vh", color: "#e2e8f0" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(5,6,8,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(249,115,22,0.1)", padding: "0 48px", height: 64, display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, background: "linear-gradient(135deg,#f97316,#eab308)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>
          CryptoCompass ₿
        </Link>
        <span style={{ color: "#1e293b" }}>›</span>
        <span style={{ color: "#475569", fontSize: 14 }}>{c.category}</span>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(249,115,22,0.1)", color: "#f97316", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.06em" }}>{c.category}</span>
            <span style={{ background: "rgba(234,179,8,0.1)", color: "#eab308", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>{c.commission}</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px,4vw,50px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#f8fafc", lineHeight: 1.15, marginBottom: 20 }}>{c.title}</h1>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7 }}>{c.description}</p>
          <p style={{ color: "#1e293b", fontSize: 13, marginTop: 16 }}>Last updated: <strong style={{ color: "#374151" }}>March 2026</strong> · Not financial advice · DYOR</p>
        </div>

        {/* Winner */}
        <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.1),rgba(234,179,8,0.04))", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 20, padding: 32, marginBottom: 48, position: "relative" }}>
          <div style={{ position: "absolute", top: -12, left: 24, background: "linear-gradient(135deg,#f97316,#eab308)", color: "#000", fontSize: 12, fontWeight: 800, padding: "4px 16px", borderRadius: 100 }}>
            🏆 TOP PICK 2026
          </div>
          <div style={{ paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ color: "#475569", fontSize: 13, marginBottom: 4 }}>Our #1 Pick</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: "#f97316", letterSpacing: "-0.02em" }}>{c.winner}</h2>
              <p style={{ color: "#475569", fontSize: 15, marginTop: 8 }}>vs. {c.runner_up}</p>
            </div>
            <a href={c.winnerLink} style={{ display: "inline-block", background: "linear-gradient(135deg,#f97316,#eab308)", color: "#000", fontWeight: 800, padding: "16px 32px", borderRadius: 12, textDecoration: "none", fontSize: 16 }}>
              Get Started with {c.winner} →
            </a>
          </div>
        </div>

        {/* Comparison Table */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Side-by-Side Comparison</h2>
          <div style={{ background: "#0a0a0c", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 16, overflow: "hidden" }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th style={{ color: "#f97316" }}>🥇 {c.winner}</th>
                  <th style={{ color: "#94a3b8" }}>{c.runner_up}</th>
                </tr>
              </thead>
              <tbody>
                {c.features.map((f, i) => (
                  <tr key={i}>
                    <td style={{ color: "#94a3b8", fontWeight: 600 }}>{f.name}</td>
                    <td style={{ color: "#f97316", fontWeight: 700 }}>{f.winner}</td>
                    <td style={{ color: "#475569" }}>{f.runnerUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros / Cons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
          <div style={{ background: "#0a0a0c", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#10b981", marginBottom: 16 }}>{c.winner} Pros</h3>
            {c.winnerPros.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < c.winnerPros.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{p}</span>
              </div>
            ))}
          </div>
          <div style={{ background: "#0a0a0c", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 16, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#ef4444", marginBottom: 16 }}>{c.winner} Cons</h3>
            {c.winnerCons.map((con, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "7px 0", borderBottom: i < c.winnerCons.length-1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ color: "#ef4444", fontWeight: 700 }}>✗</span>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Runner up */}
        <div style={{ background: "rgba(100,116,139,0.04)", border: "1px solid rgba(100,116,139,0.12)", borderRadius: 12, padding: 24, marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#374151", fontSize: 12 }}>RUNNER-UP</p>
            <p style={{ color: "#94a3b8", fontWeight: 700, fontSize: 18 }}>{c.runner_up}</p>
          </div>
          <a href={c.runnerUpLink} style={{ border: "1px solid rgba(100,116,139,0.3)", color: "#64748b", fontWeight: 600, padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14, display: "inline-block" }}>
            View {c.runner_up} →
          </a>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 28 }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {c.faq.map((item, i) => (
              <div key={i} style={{ background: "#0a0a0c", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f97316", marginBottom: 12 }}>{item.q}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 15 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)", borderRadius: 12, padding: 20, marginBottom: 48 }}>
          <p style={{ color: "#475569", fontSize: 13, lineHeight: 1.7 }}>
            ⚠️ <strong style={{ color: "#ef4444" }}>Risk Disclosure:</strong> Cryptocurrency investments are highly volatile and speculative. The value can go to zero. This is not financial advice. Only invest what you can afford to lose completely. DYOR (Do Your Own Research).
          </p>
        </div>

        {/* Final CTA */}
        <div style={{ background: "linear-gradient(135deg,rgba(249,115,22,0.1),rgba(234,179,8,0.04))", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 20, padding: 48, textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#f8fafc", marginBottom: 12 }}>Ready to get started?</h2>
          <p style={{ color: "#64748b", marginBottom: 28 }}>Our top pick for 2026 — regulated, trusted, and beginner-friendly.</p>
          <a href={c.winnerLink} style={{ display: "inline-block", background: "linear-gradient(135deg,#f97316,#eab308)", color: "#000", fontWeight: 800, padding: "16px 40px", borderRadius: 12, textDecoration: "none", fontSize: 17 }}>
            Open {c.winner} Account →
          </a>
          <p style={{ color: "#1e293b", fontSize: 11, marginTop: 12 }}>Affiliate link · Not financial advice</p>
        </div>

        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Related Reviews</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/${r.slug}`} style={{ textDecoration: "none", display: "block", background: "#0a0a0c", border: "1px solid rgba(249,115,22,0.1)", borderRadius: 12, padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 8, lineHeight: 1.4 }}>{r.title}</p>
                  <p style={{ color: "#f97316", fontSize: 12 }}>Winner: {r.winner}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer style={{ padding: "48px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#374151", fontSize: 13, marginTop: 40 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <Link href="/" style={{ color: "#f97316", textDecoration: "none", fontWeight: 700 }}>← CryptoCompass Home</Link>
          <span>© 2026 CryptoCompass · Affiliate Disclosure · Crypto is risky</span>
        </div>
      </footer>
    </main>
  );
}
