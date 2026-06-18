"use client";

import { useState } from "react";

export default function CtaBand() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const [waHover, setWaHover] = useState(false);
  const [callHover, setCallHover] = useState(false);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0f1f3d 0%, #1a3a6b 100%)",
        padding: "72px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 640,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Still reading? You&apos;re exactly
          <br />
          the careful kind we like.
        </h2>

        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.55)",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Start with a question. No forms. No pressure.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: 8,
          }}
        >
          {/* WhatsApp CTA */}
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
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s ease, transform 0.2s ease",
              transform: waHover ? "translateY(-1px)" : "translateY(0)",
              minHeight: 50,
            }}
          >
            <i
              className="ti ti-brand-whatsapp"
              style={{ fontSize: 20 }}
              aria-hidden="true"
            />
            Start on WhatsApp
          </a>

          {/* Call CTA */}
          <a
            href="tel:+919566085116"
            onMouseEnter={() => setCallHover(true)}
            onMouseLeave={() => setCallHover(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: callHover ? "rgba(255,255,255,0.1)" : "transparent",
              color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.3)",
              borderRadius: 50,
              padding: "14px 28px",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.2s ease",
              transform: callHover ? "translateY(-1px)" : "translateY(0)",
              minHeight: 50,
            }}
          >
            <i
              className="ti ti-phone"
              style={{ fontSize: 18 }}
              aria-hidden="true"
            />
            Or just call us
          </a>
        </div>
      </div>
    </section>
  );
}
