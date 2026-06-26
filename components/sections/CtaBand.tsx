"use client";

import Link from "next/link";
import { useState } from "react";

export default function CtaBand() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const [waHover, setWaHover] = useState(false);
  const [exploreHover, setExploreHover] = useState(false);

  return (
    <section style={{ background: "#F5B800", padding: "0 24px" }}>
      <style>{`
        @media (max-width: 640px) {
          .cta-band-inner { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; padding: 32px 0 !important; }
          .cta-band-btns { flex-direction: column !important; width: 100%; }
          .cta-band-btns a { justify-content: center; }
        }
      `}</style>
      <div
        className="cta-band-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
          padding: "36px 0",
        }}
      >
        {/* Left — text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2
            style={{
              fontSize: "clamp(18px, 2.4vw, 24px)",
              fontWeight: 800,
              color: "#0A0F1E",
              margin: "0 0 6px",
              letterSpacing: "-0.4px",
              lineHeight: 1.2,
            }}
          >
            Ready to work with Coverton?
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "rgba(10,15,30,0.75)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Get unbiased insurance advice from our team today.
          </p>
        </div>

        {/* Right — buttons */}
        <div
          className="cta-band-btns"
          style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}
        >
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setWaHover(true)}
            onMouseLeave={() => setWaHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: waHover ? "#1ebe59" : "#25D366",
              color: "#ffffff",
              borderRadius: 50,
              padding: "13px 24px",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 18 }} aria-hidden="true" />
            Chat on WhatsApp
          </a>

          <Link
            href="/products"
            onMouseEnter={() => setExploreHover(true)}
            onMouseLeave={() => setExploreHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: exploreHover ? "#1a3060" : "#0f1f3d",
              color: "#ffffff",
              borderRadius: 50,
              padding: "13px 24px",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s ease",
              whiteSpace: "nowrap",
            }}
          >
            <i className="ti ti-category" style={{ fontSize: 16 }} aria-hidden="true" />
            Explore Insurance products
          </Link>
        </div>
      </div>
    </section>
  );
}
