"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Card data ─────────────────────────────────────────────────────────────────

interface CardData {
  id: string;
  name: string;
  desc: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  accent: string;
  badge?: string;
  tags: string[];
  href: string;
  wide?: boolean;
  bgImage: string;
  overlay: string;
}

const CARDS: CardData[] = [
  // Row 1: wide + normal
  {
    id: "motor",
    name: "Motor Insurance",
    desc: "Comprehensive protection for your vehicles & fleet.",
    icon: "ti-car", iconColor: "#6fa3ff", iconBg: "rgba(18,71,214,0.3)", accent: "#1247D6",
    badge: "6 plans",
    tags: ["Auto", "Bike", "Car", "CPA", "Commercial Vehicle", "Private Car"],
    href: "/products/motor",
    wide: true,
    bgImage: "https://source.unsplash.com/800x400/?car,highway",
    overlay: "linear-gradient(135deg, rgba(18,71,214,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "health-individual",
    name: "Health Individual",
    desc: "Personal health cover with OPD & pre-existing support.",
    icon: "ti-heart", iconColor: "#7dcc3f", iconBg: "rgba(59,109,17,0.3)", accent: "#3B6D11",
    tags: ["Personal cover", "Pre-existing conditions", "OPD included"],
    href: "/products/health-individual",
    bgImage: "https://source.unsplash.com/800x400/?doctor,healthcare",
    overlay: "linear-gradient(135deg, rgba(59,109,17,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  // Row 2: normal + wide
  {
    id: "health-floater",
    name: "Health Floater",
    desc: "Family floater plan covering all members under one policy.",
    icon: "ti-users", iconColor: "#2dd4b0", iconBg: "rgba(15,110,86,0.3)", accent: "#0F6E56",
    badge: "5 plans",
    tags: ["Self", "Spouse", "Son", "Daughter", "Mother", "Father", "Mother-in-law", "Father-in-law"],
    href: "/products/health-floater",
    bgImage: "https://source.unsplash.com/800x400/?family,happy",
    overlay: "linear-gradient(135deg, rgba(15,110,86,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "health-group",
    name: "Group Health",
    desc: "Corporate group health coverage for your entire team.",
    icon: "ti-building", iconColor: "#60b4ff", iconBg: "rgba(24,95,165,0.3)", accent: "#185FA5",
    badge: "Corporate",
    tags: ["Corporate cover", "All employees", "Customisable", "Flexi benefits"],
    href: "/products/health-group",
    wide: true,
    bgImage: "https://source.unsplash.com/800x400/?office,corporate,team",
    overlay: "linear-gradient(135deg, rgba(24,95,165,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  // Row 3: normal + wide
  {
    id: "life",
    name: "Life Insurance",
    desc: "Secure your family's future with the right life cover.",
    icon: "ti-file-text", iconColor: "#ffd54f", iconBg: "rgba(154,112,0,0.3)", accent: "#9A7000",
    badge: "5 plans",
    tags: ["Term Insurance", "ULIP", "Endowment Plans", "Money-Back Plans", "Whole Life"],
    href: "/products/life",
    bgImage: "https://source.unsplash.com/800x400/?family,protection",
    overlay: "linear-gradient(135deg, rgba(154,112,0,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "travel",
    name: "Travel Insurance",
    desc: "Stay protected wherever your journey takes you.",
    icon: "ti-plane", iconColor: "#a89dff", iconBg: "rgba(83,74,183,0.3)", accent: "#534AB7",
    tags: ["Business/Leisure", "Corporate", "Including USA & Canada", "Excluding USA & Canada"],
    href: "/products/travel",
    wide: true,
    bgImage: "https://source.unsplash.com/800x400/?travel,airport,airplane",
    overlay: "linear-gradient(135deg, rgba(83,74,183,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  // Row 4: 3 equal cards
  {
    id: "agriculture",
    name: "Agriculture",
    desc: "Crop and cattle insurance for farming businesses.",
    icon: "ti-leaf", iconColor: "#ff8a65", iconBg: "rgba(153,60,29,0.3)", accent: "#993C1D",
    badge: "2 plans",
    tags: ["Crop Insurance", "Cattle Insurance"],
    href: "/products/agriculture",
    bgImage: "https://source.unsplash.com/800x400/?farm,agriculture,crop",
    overlay: "linear-gradient(135deg, rgba(153,60,29,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "fire",
    name: "Fire Insurance",
    desc: "Property protection against fire and allied perils.",
    icon: "ti-flame", iconColor: "#ff6b6b", iconBg: "rgba(204,34,0,0.3)", accent: "#cc2200",
    badge: "4 plans",
    tags: ["Commercial Property", "Godown", "Office Premises", "Residence"],
    href: "/products/fire",
    bgImage: "https://source.unsplash.com/800x400/?building,property,architecture",
    overlay: "linear-gradient(135deg, rgba(204,34,0,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "credit",
    name: "Credit Insurance",
    desc: "Protection against loan defaults and trade credit risks.",
    icon: "ti-credit-card", iconColor: "#60b4ff", iconBg: "rgba(24,95,165,0.3)", accent: "#185FA5",
    badge: "2 plans",
    tags: ["Trade Credit", "Loan Default"],
    href: "/products/credit",
    bgImage: "https://source.unsplash.com/800x400/?finance,banking,business",
    overlay: "linear-gradient(135deg, rgba(24,95,165,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  // Row 5: wide + normal
  {
    id: "engineering",
    name: "Engineering Insurance",
    desc: "Coverage for construction, plant, and machinery risks.",
    icon: "ti-tool", iconColor: "#ffb74d", iconBg: "rgba(133,79,11,0.3)", accent: "#854F0B",
    badge: "4 plans",
    tags: ["Boiler & Pressure Plant", "Contractor All Risk", "Contractor Plant & Machinery", "Erection All Risk"],
    href: "/products/engineering",
    wide: true,
    bgImage: "https://source.unsplash.com/800x400/?construction,engineering,machinery",
    overlay: "linear-gradient(135deg, rgba(133,79,11,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "liability",
    name: "Liability",
    desc: "Protect against third-party legal and financial claims.",
    icon: "ti-shield", iconColor: "#f48fb1", iconBg: "rgba(153,53,86,0.3)", accent: "#993556",
    badge: "7 plans",
    tags: ["Cyber Liability", "Directors & Officers", "Employers Liability", "Product Liability", "Professional Indemnity", "Public Liability", "Workmen Compensation"],
    href: "/products/liability",
    bgImage: "https://source.unsplash.com/800x400/?legal,business,handshake",
    overlay: "linear-gradient(135deg, rgba(153,53,86,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  // Row 6: Marine (1) | Miscellaneous (span 2)
  {
    id: "marine",
    name: "Marine Insurance",
    desc: "Coverage for cargo, hull, and marine liability risks.",
    icon: "ti-anchor", iconColor: "#2dd4b0", iconBg: "rgba(15,110,86,0.3)", accent: "#0F6E56",
    badge: "3 plans",
    tags: ["Cargo", "Hull", "Marine Liability"],
    href: "/products/marine",
    bgImage: "https://source.unsplash.com/800x400/?ship,ocean,cargo",
    overlay: "linear-gradient(135deg, rgba(15,110,86,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "miscellaneous",
    name: "Miscellaneous",
    desc: "Niche covers including pet, wedding, burglary and more.",
    icon: "ti-package", iconColor: "#bdbdbd", iconBg: "rgba(99,99,102,0.3)", accent: "#636366",
    badge: "9 plans",
    tags: ["Commercial", "Burglary", "Event", "Fidelity Guarantee", "Money Insurance", "Other", "Pet", "Private Burglary", "Wedding"],
    href: "/products/miscellaneous",
    wide: true,
    bgImage: "https://source.unsplash.com/800x400/?insurance,security",
    overlay: "linear-gradient(135deg, rgba(99,99,102,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  // Row 7: Personal Accident (span 2) | Surety (1)
  {
    id: "personal-accident",
    name: "Personal Accident",
    desc: "Financial protection against accidental injury or death.",
    icon: "ti-user-check", iconColor: "#6fa3ff", iconBg: "rgba(18,71,214,0.3)", accent: "#1247D6",
    badge: "2 plans",
    tags: ["Individual", "Group"],
    href: "/products/personal-accident",
    wide: true,
    bgImage: "https://source.unsplash.com/800x400/?safety,protection,person",
    overlay: "linear-gradient(135deg, rgba(18,71,214,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
  {
    id: "surety",
    name: "Surety Insurance",
    desc: "Bid bonds and performance bonds for contracting businesses.",
    icon: "ti-lock", iconColor: "#ff8a65", iconBg: "rgba(153,60,29,0.3)", accent: "#993C1D",
    badge: "2 plans",
    tags: ["Bid Bond", "Performance Bond"],
    href: "/products/surety",
    bgImage: "https://source.unsplash.com/800x400/?construction,contract,bond",
    overlay: "linear-gradient(135deg, rgba(153,60,29,0.88) 0%, rgba(15,31,61,0.82) 100%)",
  },
];

// ── Single card ───────────────────────────────────────────────────────────────

function ProductCard({ card }: { card: CardData }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => router.push(card.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#1a2f5a",
        backgroundImage: `url('${card.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        border: hovered ? "1px solid rgba(255,255,255,0.22)" : "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: 22,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        minHeight: 200,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: card.overlay,
          borderRadius: "inherit",
          zIndex: 0,
        }}
      />

      {/* Blob */}
      <div
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: "50%",
          top: -22,
          right: -22,
          opacity: 0.1,
          pointerEvents: "none",
          background: card.accent,
          zIndex: 1,
        }}
      />

      {/* Top: icon + badge + name + desc + tags */}
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: card.iconBg,
              display: "grid",
              placeItems: "center",
              flexShrink: 0,
            }}
          >
            <i
              className={`ti ${card.icon}`}
              style={{ fontSize: 22, color: card.iconColor }}
              aria-hidden="true"
            />
          </div>
          {card.badge && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.09)",
                color: "rgba(255,255,255,0.5)",
                flexShrink: 0,
              }}
            >
              {card.badge}
            </span>
          )}
        </div>

        {/* Name */}
        <p
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.4px",
            margin: "0 0 6px",
            lineHeight: 1.3,
          }}
        >
          {card.name}
        </p>

        {/* Desc */}
        <p
          style={{
            fontSize: 11.5,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.5,
            margin: "0 0 12px",
          }}
        >
          {card.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: "3px 9px",
                borderRadius: 12,
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom: get quote */}
      <button
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: "#F5B800",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: 0,
          marginTop: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        Get a quote
        <i className="ti ti-arrow-right" style={{ fontSize: 13 }} aria-hidden="true" />
      </button>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function ProductsGrid({
  showHeader = true,
  showViewAll = true,
}: {
  showHeader?: boolean;
  showViewAll?: boolean;
}) {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ background: "#F0F4FA", width: "100%", paddingTop: 30, paddingBottom: 64, position: "relative", overflow: "hidden" }}>
      {/* Decorative blobs — light version of hero blobs */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", right: -160, top: -160, background: "rgba(18,71,214,0.055)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", left: -100, bottom: -120, background: "rgba(245,184,0,0.07)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", left: "55%", top: "38%", background: "rgba(18,71,214,0.035)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", left: "28%", top: -60, background: "rgba(245,184,0,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", right: "18%", top: "52%", background: "rgba(245,184,0,0.055)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", left: "42%", bottom: -80, background: "rgba(18,71,214,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", left: "12%", top: "28%", background: "rgba(18,71,214,0.045)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", right: "6%", bottom: "18%", background: "rgba(245,184,0,0.08)", pointerEvents: "none" }} />

      <style>{`
        .pg-bento { display: block }
        .pg-accordion { display: none }
        .pg-desktop-cta { display: flex }
        .pg-mobile-cta { display: none }
        @media (max-width: 767px) {
          .pg-bento { display: none }
          .pg-accordion { display: flex; flex-direction: column }
          .pg-desktop-cta { display: none }
          .pg-mobile-cta { display: block }
        }
        @keyframes pgFadeIn {
          from { opacity: 0; transform: translateY(-4px) }
          to { opacity: 1; transform: translateY(0) }
        }
        .pg-acc-body { animation: pgFadeIn 0.2s ease }
        .pg-section-dots {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(18,71,214,0.09) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }
      `}</style>

      {/* Dot grid */}
      <div className="pg-section-dots" />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        {showHeader && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 12,
              marginBottom: 40,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(26px, 3.5vw, 38px)",
                fontWeight: 800,
                color: "#0A0F1E",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Coverage for every need.
            </h2>
            <p style={{ fontSize: 15, color: "#8892A4", maxWidth: 480, margin: 0, lineHeight: 1.65 }}>
            13 insurance categories, all in one place. Place your enquiry, and our experts will get back to you.
            </p>
          </div>
        )}

        {/* ── Desktop: Bento grid ── */}
        <div className="pg-bento">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] w-full items-stretch">
            {CARDS.map((card) => {
              const wideClass = card.wide ? "md:col-span-2 lg:col-span-2" : "";
              return (
                <div key={card.id} className={wideClass}>
                  <ProductCard card={card} />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: Accordion ── */}
        <div className="pg-accordion" style={{ background: "#0f1f3d", borderRadius: 12, padding: "0 16px 16px" }}>
          {CARDS.map((card, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={card.id}
                style={{ borderBottom: i < CARDS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
              >
                {/* Toggle row */}
                <div
                  role="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", cursor: "pointer" }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 9,
                      background: card.iconBg,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`ti ${card.icon}`} style={{ fontSize: 16, color: card.iconColor }} aria-hidden="true" />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "white", flex: 1 }}>{card.name}</span>
                  {card.badge && (
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginRight: 6, whiteSpace: "nowrap" }}>
                      {card.badge}
                    </span>
                  )}
                  <i
                    className={`ti ${isOpen ? "ti-chevron-up" : "ti-chevron-down"}`}
                    style={{ fontSize: 14, color: isOpen ? "#F5B800" : "rgba(255,255,255,0.3)", transition: "color 0.2s ease" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div className="pg-acc-body" style={{ padding: "0 0 14px 46px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 10,
                            padding: "3px 9px",
                            borderRadius: 10,
                            background: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.65)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); router.push(card.href); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#F5B800",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        marginTop: 4,
                      }}
                    >
                      Get a quote
                      <i className="ti ti-arrow-right" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: View all */}
        {showViewAll && (
          <div className="pg-desktop-cta" style={{ justifyContent: "center", marginTop: 36 }}>
            <button
              onClick={() => router.push("/products")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#1247D6",
                color: "#ffffff",
                padding: "13px 28px",
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#0e3ab0")}
              onMouseLeave={e => (e.currentTarget.style.background = "#1247D6")}
            >
              <i className="ti ti-category" style={{ fontSize: 16 }} aria-hidden="true" />
              View all categories
              <i className="ti ti-arrow-right" style={{ fontSize: 14 }} aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Mobile: Browse all */}
        {showViewAll && (
          <div className="pg-mobile-cta" style={{ marginTop: 8 }}>
            <button
              onClick={() => router.push("/products")}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "#1247D6",
                color: "#ffffff",
                padding: 13,
                borderRadius: 50,
                fontSize: 13,
                fontWeight: 600,
                width: "100%",
                border: "none",
                cursor: "pointer",
              }}
            >
              <i className="ti ti-category" aria-hidden="true" />
              Browse all categories
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
