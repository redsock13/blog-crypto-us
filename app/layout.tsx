import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "CryptoCompass — Navigate Crypto with Confidence",
  description: "No hype, just data. Best crypto exchange reviews, wallet comparisons, and Bitcoin guides for 2026.",
  keywords: "best crypto exchange 2026, Coinbase vs Kraken, best Bitcoin wallet, crypto exchange comparison",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased scanline-effect">{children}</body>
    </html>
  );
}
