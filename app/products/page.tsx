import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCardsGrid from "@/components/sections/ProductCardsGrid";

export const metadata: Metadata = {
  title: "All Products — Coverton Insurance",
  description:
    "Browse all 13 insurance categories — motor, health, life, travel, fire, marine, engineering and more. Get a quote in minutes.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />

      <main style={{ background: "#F0F4FA" }}>
        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section
          className="pt-32 pb-10 sm:pt-36 sm:pb-14 lg:pt-40 lg:pb-20 text-center"
          style={{ background: "#0f1f3d", position: "relative", overflow: "hidden" }}
        >
          {/* Decorative blobs */}
          <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", right: -80, top: -80, background: "rgba(18,71,214,0.15)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", left: "10%", bottom: -80, background: "rgba(245,184,0,0.07)", pointerEvents: "none" }} />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4" style={{ position: "relative", zIndex: 1 }}>
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", color: "#F5B800" }}
            >
              Insurance products
            </span>
            <h1 className="text-2xl sm:text-2xl lg:text-4xl font-black text-white">
              Protection for Every Individual.{" "}
              <span style={{ color: "#F5B800" }}>Solution for Every Business.</span>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
              From personal insurance to commercial risk solutions, we make insurance simple by comparing options and helping you choose the coverage that best fits your needs.
            </p>
          </div>
        </section>

        {/* ── Product cards grid ───────────────────────────────────────────── */}
        <ProductCardsGrid />
      </main>

      <Footer />
    </>
  );
}
