import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCardsGrid from "@/components/sections/ProductCardsGrid";
import BubbleBackground from "@/components/ui/BubbleBackground";

export const metadata: Metadata = {
  title: "All Products — Coverton Insurance",
  description:
    "Browse all 13 insurance categories — motor, health, life, travel, fire, marine, engineering and more. Get a quote in minutes.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main>
        <BubbleBackground>
          {/* ── Hero ──────────────────────────────────────────────────────────── */}
          <section style={{ background: "transparent", paddingTop: 80, paddingBottom: 24 }} className="px-5 lg:px-20">
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#EEF3FF", borderRadius: 20, padding: "4px 12px", marginBottom: 14 }}>
                <i className="ti ti-category" style={{ fontSize: 12, color: "#1247D6" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#1247D6", letterSpacing: "0.06em" }}>15 INSURANCE CATEGORIES</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: "#0A0F1E", letterSpacing: "-1.2px", lineHeight: 1.1, margin: "0 0 14px" }}>
                    Protection for every individual.{" "}
                    <span style={{ color: "#1247D6" }}>Solution for every business.</span>
                  </h1>
                  <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7, maxWidth: 460, margin: 0 }}>
                    Compare options across 30+ insurers and choose coverage that fits your needs — from personal to commercial.
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 28px", borderLeft: "1px solid #E8EBF5", paddingLeft: 32 }} className="hidden lg:flex">
                  {[
                    { num: "15", label: "Insurance categories" },
                    { num: "30+", label: "Insurer partners" },
                    { num: "100%", label: "Unbiased advice" },
                    { num: "Zero", label: "Hidden charges" },
                  ].map(({ num, label }) => (
                    <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontSize: 17, fontWeight: 800, color: "#0A0F1E" }}>{num}</span>
                      <span style={{ fontSize: 11, color: "#64748B" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Product cards grid ───────────────────────────────────────────── */}
          <ProductCardsGrid />
        </BubbleBackground>
      </main>

      <Footer />
    </>
  );
}
