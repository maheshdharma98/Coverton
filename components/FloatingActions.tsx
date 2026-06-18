"use client";

import { useState } from "react";

export default function FloatingActions() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const [waHover, setWaHover] = useState(false);
  const [mailHover, setMailHover] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 900,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
      }}
      aria-label="Quick contact actions"
    >
      {/* Email */}
      <a
        href="mailto:wecare@coverton.in"
        aria-label="Email us at wecare@coverton.in"
        onMouseEnter={() => setMailHover(true)}
        onMouseLeave={() => setMailHover(false)}
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: mailHover ? "#c0392b" : "#EA4335",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          transition: "background 0.2s ease, transform 0.2s ease",
          transform: mailHover ? "scale(1.1)" : "scale(1)",
          textDecoration: "none",
        }}
      >
        <i
          className="ti ti-mail"
          style={{ fontSize: 22, color: "#ffffff" }}
          aria-hidden="true"
        />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${waNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setWaHover(true)}
        onMouseLeave={() => setWaHover(false)}
        style={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: waHover ? "#1ebe59" : "#25D366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          transition: "background 0.2s ease, transform 0.2s ease",
          transform: waHover ? "scale(1.1)" : "scale(1)",
          textDecoration: "none",
        }}
      >
        <i
          className="ti ti-brand-whatsapp"
          style={{ fontSize: 26, color: "#ffffff" }}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
