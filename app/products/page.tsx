import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductsGrid from "@/components/sections/ProductsGrid";

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
          style={{ background: "var(--ink)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-4">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)", color: "#1E90FF" }}
            >
              Our products
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white">
              13 ways to stay{" "}
              <span style={{ color: "var(--gold)" }}>protected.</span>
            </h1>
            <p className="text-sm sm:text-base max-w-lg" style={{ color: "rgba(255,255,255,0.55)" }}>
              From motor to marine, health to surety — find the coverage that fits your life or business.
            </p>
          </div>
        </section>

        {/* ── Bento grid ───────────────────────────────────────────────────── */}
        <ProductsGrid showHeader={false} showViewAll={false} />
      </main>

      <Footer />
    </>
  );
}
