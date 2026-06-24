"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

// ── Card data ─────────────────────────────────────────────────────────────────

interface CardData {
  id: string;
  name: string;
  icon: string;
  hexColor: string; // CSS gradient for hex background
  accent: string;   // solid color for mobile cards / icons
  cardBg: string;
  badge?: string;
  tags: string[];
  href: string;
}

const CARDS: CardData[] = [
  { id: "motor",             name: "Motor",             icon: "ti-car",         hexColor: "#1247D6", accent: "#1247D6", cardBg: "#EEF3FF", badge: "6 plans",   tags: ["Auto","Bike","Car","CPA","Commercial Vehicle","Private Car"],                                              href: "/products/motor" },
  { id: "health-individual", name: "Health\nIndividual",icon: "ti-heart",        hexColor: "#0F8060", accent: "#0F6E56", cardBg: "#F0FDF4",                   tags: ["Personal cover","Pre-existing conditions","OPD included"],                                                   href: "/products/health-individual" },
  { id: "health-floater",    name: "Health\nFloater",   icon: "ti-users",        hexColor: "#0a7a62", accent: "#0a5a46", cardBg: "#F0FDFA", badge: "5 plans",   tags: ["Self","Spouse","Son","Daughter","Mother","Father","Mother-in-law","Father-in-law"],                         href: "/products/health-floater" },
  { id: "health-group",      name: "Group\nHealth",     icon: "ti-building",     hexColor: "#1a3a7a", accent: "#185FA5", cardBg: "#EFF6FF", badge: "Corporate", tags: ["Corporate cover","All employees","Customisable","Flexi benefits"],                                           href: "/products/health-group" },
  { id: "life",              name: "Life",              icon: "ti-file-text",    hexColor: "#C49000", accent: "#9A7000", cardBg: "#FFFBEB", badge: "5 plans",   tags: ["Term Insurance","ULIP","Endowment Plans","Money-Back Plans","Whole Life"],                                  href: "/products/life" },
  { id: "travel",            name: "Travel",            icon: "ti-plane",        hexColor: "#4038A0", accent: "#534AB7", cardBg: "#F5F3FF",                   tags: ["Business/Leisure","Corporate","Including USA & Canada","Excluding USA & Canada"],                            href: "/products/travel" },
  { id: "agriculture",       name: "Agriculture",       icon: "ti-leaf",         hexColor: "#8C4520", accent: "#993C1D", cardBg: "#FFF7ED", badge: "2 plans",   tags: ["Crop Insurance","Cattle Insurance"],                                                                          href: "/products/agriculture" },
  { id: "fire",              name: "Fire",              icon: "ti-flame",        hexColor: "#C82000", accent: "#CC2200", cardBg: "#FEF2F2", badge: "4 plans",   tags: ["Commercial Property","Godown","Office Premises","Residence"],                                                 href: "/products/fire" },
  { id: "credit",            name: "Credit",            icon: "ti-credit-card",  hexColor: "#1550CC", accent: "#185FA5", cardBg: "#EFF6FF", badge: "2 plans",   tags: ["Trade Credit","Loan Default"],                                                                                href: "/products/credit" },
  { id: "engineering",       name: "Engineering",       icon: "ti-tool",         hexColor: "#1a2d54", accent: "#854F0B", cardBg: "#FFF8EC", badge: "4 plans",   tags: ["Boiler & Pressure Plant","Contractor All Risk","Contractor Plant & Machinery","Erection All Risk"],          href: "/products/engineering" },
  { id: "liability",         name: "Liability",         icon: "ti-shield",       hexColor: "#8B2060", accent: "#993556", cardBg: "#FDF2F8", badge: "7 plans",   tags: ["Cyber Liability","Directors & Officers","Employers Liability","Public Liability","Workmen Compensation"],    href: "/products/liability" },
  { id: "marine",            name: "Marine",            icon: "ti-anchor",       hexColor: "#0B8A72", accent: "#0F6E56", cardBg: "#F0FDFA", badge: "3 plans",   tags: ["Cargo","Hull","Marine Liability"],                                                                             href: "/products/marine" },
  { id: "miscellaneous",     name: "Misc.",              icon: "ti-package",      hexColor: "#374151", accent: "#4B5563", cardBg: "#F3F4F6", badge: "9 plans",   tags: ["Commercial","Burglary","Event","Pet","Wedding"],                                                               href: "/products/miscellaneous" },
  { id: "personal-accident", name: "Personal\nAccident",icon: "ti-user-check",   hexColor: "#2B62CC", accent: "#1247D6", cardBg: "#EEF3FF", badge: "2 plans",   tags: ["Individual","Group"],                                                                                         href: "/products/personal-accident" },
  { id: "surety",            name: "Surety",            icon: "ti-lock",         hexColor: "#0f1f3d", accent: "#993C1D", cardBg: "#FFF7ED", badge: "2 plans",   tags: ["Bid Bond","Performance Bond"],                                                                                href: "/products/surety" },
];

// Desktop honeycomb: 4 + 4 + 4 + 3 = 15
const ROWS = [CARDS.slice(0, 4), CARDS.slice(4, 8), CARDS.slice(8, 12), CARDS.slice(12, 15)];

const HEX_W = 175;
const HEX_H = Math.round(HEX_W * 0.866);
const HEX_GAP = 9;
const OVERLAP = Math.round(HEX_H * 0.255);
const OFFSET = Math.round((HEX_W + HEX_GAP) / 2);

// Mobile honeycomb: 3 + 2 + 3 + 2 + 3 + 2 = 15
const MOB_W = 104;
const MOB_H = Math.round(MOB_W * 0.866);
const MOB_GAP = 6;
const MOB_OVERLAP = Math.round(MOB_H * 0.255);
const MOB_OFFSET = Math.round((MOB_W + MOB_GAP) / 2);
const MOB_ROWS = [
  CARDS.slice(0, 3),
  CARDS.slice(3, 5),
  CARDS.slice(5, 8),
  CARDS.slice(8, 10),
  CARDS.slice(10, 13),
  CARDS.slice(13, 15),
];

// ── World map SVG background ──────────────────────────────────────────────────
// viewBox "0 0 360 180": x = lon+180, y = 90-lat (equirectangular projection)

function WorldMapBg() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <svg
        viewBox="0 0 360 180"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lat/lon grid every 30° */}
        {[30,60,90,120,150,180,210,240,270,300,330].map(x => (
          <line key={`v${x}`} x1={x} y1={0} x2={x} y2={180} stroke="#1247D6" strokeWidth="0.25" opacity="0.35"/>
        ))}
        {[30,60,90,120,150].map(y => (
          <line key={`h${y}`} x1={0} y1={y} x2={360} y2={y} stroke="#1247D6" strokeWidth="0.25" opacity="0.35"/>
        ))}

        {/* Equator & Prime meridian - slightly bolder */}
        <line x1={0} y1={90} x2={360} y2={90} stroke="#1247D6" strokeWidth="0.5" opacity="0.4"/>
        <line x1={180} y1={0} x2={180} y2={180} stroke="#1247D6" strokeWidth="0.5" opacity="0.4"/>

        {/* Continent fills */}
        <g fill="#1247D6" opacity="0.18">

          {/* North America (mainland) */}
          <path d="M 12,19 L 39,29 L 46,31 L 54,40 L 62,56 L 68,63 L 75,69 L 97,80 L 100,68 L 100,65 L 104,57 L 110,49 L 117,46 L 124,43 L 127,43 L 124,38 L 118,35 L 112,33 L 103,27 L 100,20 L 100,17 L 85,20 L 70,22 L 55,30 L 46,29 L 38,27 L 32,27 L 17,28 Z"/>

          {/* Greenland */}
          <path d="M 130,15 L 140,10 L 152,8 L 162,12 L 165,20 L 162,26 L 155,30 L 148,33 L 140,34 L 133,31 L 130,24 Z"/>

          {/* South America */}
          <path d="M 100,80 L 112,79 L 117,80 L 125,84 L 130,88 L 138,94 L 144,96 L 146,100 L 144,106 L 142,108 L 140,112 L 138,114 L 137,119 L 133,121 L 129,123 L 125,126 L 122,128 L 118,132 L 115,133 L 114,145 L 112,144 L 111,140 L 112,133 L 110,120 L 108,106 L 106,99 L 104,91 L 103,87 L 102,88 L 100,84 Z"/>

          {/* Europe */}
          <path d="M 171,51 L 174,54 L 178,54 L 182,46 L 187,46 L 194,44 L 199,50 L 204,52 L 208,49 L 214,53 L 217,53 L 221,49 L 228,47 L 234,41 L 238,35 L 236,31 L 230,27 L 224,23 L 213,21 L 207,19 L 199,21 L 190,27 L 185,33 L 180,39 L 177,43 L 172,47 Z"/>

          {/* Africa */}
          <path d="M 174,55 L 178,55 L 189,54 L 192,56 L 203,58 L 213,59 L 218,64 L 222,72 L 225,79 L 228,80 L 224,88 L 222,96 L 221,102 L 220,108 L 216,114 L 214,118 L 211,121 L 206,124 L 200,126 L 197,120 L 196,114 L 193,108 L 191,103 L 189,91 L 185,88 L 181,86 L 177,84 L 172,81 L 166,79 L 163,76 L 163,70 L 165,66 L 167,62 L 172,58 Z"/>

          {/* Asia */}
          <path d="M 217,53 L 220,49 L 224,47 L 230,46 L 235,43 L 240,39 L 245,36 L 252,35 L 260,36 L 268,35 L 276,34 L 283,35 L 288,37 L 295,37 L 302,38 L 310,43 L 315,47 L 320,50 L 322,54 L 320,57 L 316,57 L 312,59 L 307,65 L 302,68 L 296,71 L 291,72 L 285,88 L 282,90 L 279,86 L 276,70 L 267,78 L 262,83 L 258,83 L 255,69 L 250,70 L 245,69 L 240,69 L 237,69 L 234,66 L 228,67 L 222,69 L 218,72 L 217,76 L 219,80 L 221,80 L 224,79 L 228,80 L 222,88 L 214,65 L 213,59 Z"/>

          {/* Indian subcontinent (slight bump) */}
          <path d="M 247,69 L 255,69 L 258,83 L 254,90 L 250,92 L 245,88 L 244,80 L 245,74 Z"/>

          {/* Southeast Asia / Malay */}
          <path d="M 282,90 L 285,88 L 289,89 L 290,96 L 286,98 L 283,95 Z"/>

          {/* Australia */}
          <path d="M 294,112 L 298,110 L 304,108 L 311,103 L 318,104 L 323,107 L 328,111 L 330,116 L 332,124 L 328,129 L 323,130 L 318,128 L 312,127 L 306,126 L 301,125 L 296,124 L 294,120 L 292,116 Z"/>

          {/* New Zealand (small) */}
          <path d="M 344,128 L 347,127 L 347,132 L 344,133 Z"/>

          {/* Japan (small) */}
          <path d="M 320,57 L 323,54 L 326,56 L 324,60 L 320,59 Z"/>

          {/* UK / Ireland */}
          <path d="M 178,40 L 181,38 L 183,42 L 181,46 L 178,44 Z"/>

          {/* Iceland */}
          <path d="M 157,37 L 163,35 L 165,39 L 162,42 L 157,41 Z"/>

          {/* Madagascar */}
          <path d="M 226,96 L 229,95 L 230,102 L 228,107 L 225,105 L 224,99 Z"/>

          {/* Sri Lanka */}
          <path d="M 258,84 L 260,83 L 261,87 L 259,88 Z"/>

        </g>
      </svg>
    </div>
  );
}

// ── RGB helper for glass tint ─────────────────────────────────────────────────

function hexRgb(h: string) {
  const c = h.replace("#", "");
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
}

// ── Hex cell — shared by desktop and mobile ───────────────────────────────────

const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

function HexCard({ card, sz = HEX_W }: { card: CardData; sz?: number }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const { r, g, b } = hexRgb(card.hexColor);
  const h = Math.round(sz * 0.866);

  const glassBg = hovered
    ? "linear-gradient(145deg, rgba(245,184,0,0.62), rgba(212,152,0,0.38))"
    : `linear-gradient(145deg, rgba(${r},${g},${b},0.52), rgba(${r},${g},${b},0.22))`;

  const glow = hovered
    ? "drop-shadow(0 0 2px rgba(255,255,255,0.7)) drop-shadow(0 10px 28px rgba(245,184,0,0.55))"
    : `drop-shadow(0 0 1.5px rgba(255,255,255,0.38)) drop-shadow(0 5px 16px rgba(${r},${g},${b},0.55))`;

  return (
    <div
      onClick={() => router.push(card.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={card.name.replace("\n", " ")}
      style={{
        position: "relative",
        width: sz,
        height: h,
        clipPath: HEX_CLIP,
        background: glassBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.22s ease, transform 0.22s ease, filter 0.22s ease",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        filter: glow,
        flexShrink: 0,
        userSelect: "none",
      }}
    >
      {/* Glass top-shine */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)", pointerEvents: "none", zIndex: 0 }} />
      {/* Bottom color bleed */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: `linear-gradient(0deg, rgba(${r},${g},${b},0.38) 0%, transparent 100%)`, pointerEvents: "none", zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <i
          className={`ti ${card.icon}`}
          style={{
            fontSize: sz * 0.22,
            color: hovered ? "#0A0F1E" : "#ffffff",
            display: "block",
            marginBottom: sz > 120 ? 5 : 3,
            transition: "color 0.22s ease",
            lineHeight: 1,
            textShadow: hovered ? "none" : `0 1px 6px rgba(${r},${g},${b},0.6)`,
          }}
          aria-hidden="true"
        />
        <span
          style={{
            fontSize: sz * 0.077,
            fontWeight: 700,
            color: hovered ? "#0A0F1E" : "rgba(255,255,255,0.97)",
            textAlign: "center",
            lineHeight: 1.22,
            whiteSpace: "pre-line",
            letterSpacing: "-0.2px",
            transition: "color 0.22s ease",
            maxWidth: sz * 0.62,
            textShadow: hovered ? "none" : "0 1px 4px rgba(0,0,0,0.4)",
          }}
        >
          {card.name}
        </span>
      </div>
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

  return (
    <section
      style={{
        background: "linear-gradient(160deg,#0f1f3d 0%,#1a3460 40%,#0d2a55 100%)",
        width: "100%",
        paddingTop: 30,
        paddingBottom: 64,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* World map SVG overlay */}
      <WorldMapBg />

      <style>{`
        .pg-hex   { display: flex }
        .pg-mob   { display: none }
        .pg-cta-d { display: flex }
        .pg-cta-m { display: none }
        @media (max-width: 900px) {
          .pg-hex   { display: none }
          .pg-mob   { display: flex }
          .pg-cta-d { display: none }
          .pg-cta-m { display: block }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* ── Header ── */}
        {showHeader && (
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(255,255,255,0.1)", borderRadius: 50,
              padding: "5px 14px", marginBottom: 18,
              border: "1px solid rgba(255,255,255,0.15)",
            }}>
              <i className="ti ti-category" style={{ fontSize: 13, color: "#F5B800" }} aria-hidden="true" />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#F5B800", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                Insurance Categories
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 800, color: "#ffffff", margin: "0 0 14px", letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Coverage for every need,{" "}
              <span style={{ color: "#F5B800" }}>all @ one place.</span>
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 480, margin: "0 auto", lineHeight: 1.65 }}>
            Click any to enquire and our experts will guide you.
            </p>
          </div>
        )}

        {/* ── Desktop: Honeycomb hex grid ── */}
        <div className="pg-hex" style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {ROWS.map((rowCards, rowIdx) => {
              const isOffset = rowIdx % 2 === 1;
              return (
                <div
                  key={rowIdx}
                  style={{
                    display: "flex",
                    gap: HEX_GAP,
                    marginTop: rowIdx === 0 ? 0 : -OVERLAP,
                    marginLeft: isOffset ? OFFSET : 0,
                  }}
                >
                  {rowCards.map((card) => (
                    <HexCard key={card.id} card={card} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: honeycomb hex grid (3+2+3+2+3+2) ── */}
        <div className="pg-mob" style={{ justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {MOB_ROWS.map((rowCards, rowIdx) => {
              const isOffset = rowIdx % 2 === 1;
              return (
                <div
                  key={rowIdx}
                  style={{
                    display: "flex",
                    gap: MOB_GAP,
                    marginTop: rowIdx === 0 ? 0 : -MOB_OVERLAP,
                    marginLeft: isOffset ? MOB_OFFSET : 0,
                  }}
                >
                  {rowCards.map((card) => (
                    <HexCard key={card.id} card={card} sz={MOB_W} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
