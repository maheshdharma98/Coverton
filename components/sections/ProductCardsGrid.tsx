"use client";

import Link from "next/link";
import { useState } from "react";

interface ProductItem {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  accent: string;
  cardBg: string;
  badge?: string;
  href: string;
}

const PRODUCTS: ProductItem[] = [
  { id: "motor",             name: "Motor Insurance",        shortDesc: "Cover your vehicle against accidents, theft and third-party damage.",                            icon: "ti-car",         accent: "#1247D6", cardBg: "#EEF3FF", badge: "6 plans",   href: "/products/motor" },
  { id: "health-individual", name: "Health — Individual",    shortDesc: "Personal health cover with cashless hospitalisation and pre-existing disease support.",           icon: "ti-heart",       accent: "#0F8060", cardBg: "#F0FDF4",                   href: "/products/health-individual" },
  { id: "health-floater",    name: "Health — Floater",       shortDesc: "One policy protecting your entire family under a single, shared sum insured.",                    icon: "ti-users",       accent: "#0a7a62", cardBg: "#F0FDFA", badge: "Family",    href: "/products/health-floater" },
  { id: "health-group",      name: "Group Health",           shortDesc: "Comprehensive employee health insurance customised for your entire workforce.",                    icon: "ti-building",    accent: "#1a3a7a", cardBg: "#EFF6FF", badge: "Corporate", href: "/products/health-group" },
  { id: "life",              name: "Life Insurance",         shortDesc: "Secure your family's future with term plans, ULIPs, endowment and whole life policies.",          icon: "ti-file-text",   accent: "#9A7000", cardBg: "#FFFBEB", badge: "5 plans",   href: "/products/life" },
  { id: "travel",            name: "Travel Insurance",       shortDesc: "Travel anywhere confidently with full medical, baggage, delay and trip cancellation protection.",  icon: "ti-plane",       accent: "#4038A0", cardBg: "#F5F3FF",                   href: "/products/travel" },
  { id: "agriculture",       name: "Agriculture Insurance",  shortDesc: "Protect your crops and cattle against natural disasters, drought and market risks.",               icon: "ti-leaf",        accent: "#8C4520", cardBg: "#FFF7ED", badge: "2 plans",   href: "/products/agriculture" },
  { id: "fire",              name: "Fire Insurance",         shortDesc: "Safeguard your property from fire, natural calamities, explosions and allied perils.",             icon: "ti-flame",       accent: "#B51A00", cardBg: "#FEF2F2", badge: "4 plans",   href: "/products/fire" },
  { id: "credit",            name: "Credit Insurance",       shortDesc: "Protect your business against borrower defaults, non-payment and trade credit risks.",             icon: "ti-credit-card", accent: "#1247D6", cardBg: "#EFF6FF", badge: "2 plans",   href: "/products/credit" },
  { id: "engineering",       name: "Engineering Insurance",  shortDesc: "Cover machinery, civil projects and equipment against breakdowns and contractor risks.",           icon: "ti-tool",        accent: "#1a2d54", cardBg: "#ECEEF8", badge: "4 plans",   href: "/products/engineering" },
  { id: "liability",         name: "Liability Insurance",    shortDesc: "Shield your business from third-party claims, cyber threats and professional indemnity.",          icon: "ti-shield",      accent: "#7B2558", cardBg: "#FDF2F8", badge: "7 plans",   href: "/products/liability" },
  { id: "marine",            name: "Marine Insurance",       shortDesc: "Protect cargo, hulls and marine liability across domestic and international trade routes.",         icon: "ti-anchor",      accent: "#0B8A72", cardBg: "#EFFDF9", badge: "3 plans",   href: "/products/marine" },
  { id: "miscellaneous",     name: "Miscellaneous",          shortDesc: "From pet insurance and wedding cover to event and commercial burglary protection.",                icon: "ti-package",     accent: "#374151", cardBg: "#F3F4F6", badge: "9 plans",   href: "/products/miscellaneous" },
  { id: "personal-accident", name: "Personal Accident",      shortDesc: "Financial protection against accidental death, permanent disability and hospitalisation.",         icon: "ti-user-check",  accent: "#1550CC", cardBg: "#EEF3FF", badge: "2 plans",   href: "/products/personal-accident" },
  { id: "surety",            name: "Surety Insurance",       shortDesc: "Bond guarantees that ensure contractors fulfil project and contractual obligations.",               icon: "ti-lock",        accent: "#0f1f3d", cardBg: "#ECEEF8", badge: "2 plans",   href: "/products/surety" },
];

// ── Single card ───────────────────────────────────────────────────────────────

function ProductCard({ item }: { item: ProductItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={item.href} style={{ textDecoration: "none", display: "flex", height: "100%" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: item.cardBg,
          borderRadius: 18,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          transform: hovered ? "translateY(-4px)" : "none",
          boxShadow: hovered
            ? `0 12px 36px ${item.accent}28`
            : "0 2px 10px rgba(0,0,0,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hover glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: hovered ? `radial-gradient(circle at 85% 15%, ${item.accent}14, transparent 60%)` : "transparent",
          transition: "background 0.3s ease",
        }}/>

        {/* Top row: icon (left) + Get a Quote (right) */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 14, position: "relative", zIndex: 1,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, flexShrink: 0,
            background: `linear-gradient(135deg, ${item.accent}22, ${item.accent}44)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.25s ease",
            transform: hovered ? "scale(1.1) rotate(6deg)" : "scale(1)",
          }}>
            <i className={`ti ${item.icon}`} style={{ fontSize: 22, color: item.accent }} aria-hidden="true" />
          </div>

          <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            border: `1.5px solid ${item.accent}`,
            color: hovered ? "#ffffff" : item.accent,
            background: hovered ? item.accent : "transparent",
            borderRadius: 50, padding: "5px 13px",
            fontSize: 11, fontWeight: 600,
            transition: "all 0.2s ease",
            whiteSpace: "nowrap",
          }}>
            Get a Quote
            <i className="ti ti-arrow-right" style={{ fontSize: 10 }} aria-hidden="true" />
          </span>
        </div>

        {/* Badge */}
        {item.badge && (
          <span style={{
            display: "inline-block", alignSelf: "flex-start",
            background: item.accent + "18",
            color: item.accent,
            borderRadius: 50, padding: "2px 10px",
            fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
            marginBottom: 6, position: "relative", zIndex: 1,
          }}>
            {item.badge}
          </span>
        )}

        {/* Title */}
        <h3 style={{
          margin: "0 0 6px", fontSize: 15, fontWeight: 800,
          color: "#0A0F1E", lineHeight: 1.25, letterSpacing: "-0.3px",
          position: "relative", zIndex: 1,
        }}>
          {item.name}
        </h3>

        {/* Description — clamped to 3 lines for consistent card height */}
        <p
          className="line-clamp-3"
          style={{
            margin: 0, fontSize: 12.5, color: "#5A6476",
            lineHeight: 1.65, flex: 1,
            position: "relative", zIndex: 1,
          }}
        >
          {item.shortDesc}
        </p>
      </div>
    </Link>
  );
}

// ── Grid ──────────────────────────────────────────────────────────────────────

export default function ProductCardsGrid() {
  return (
    <div style={{ background: "transparent", width: "100%" }}>
      <style>{`
        .pcg-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          align-items: stretch;
        }
        @media (max-width: 1024px) {
          .pcg-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .pcg-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 48px" }}>
        <div className="pcg-grid">
          {PRODUCTS.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
