"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Sub {
  label: string;
  param: string;
  icon: string;
}

interface HeroCardData {
  slug: string;
  name: string;
  desc: string;
  icon: string;
  iconBg: string;
  blobColor: string;
  num: string;
  subs: Sub[];
}

const CARDS: HeroCardData[] = [
  {
    slug: "motor",
    name: "Motor Insurance",
    desc: "Comprehensive protection for your vehicles & fleet.",
    icon: "ti-car",
    iconBg: "#1247D6",
    blobColor: "#1247D6",
    num: "01",
    subs: [
      { label: "Bike", param: "Bike", icon: "ti-motorbike" },
      { label: "Car", param: "Car", icon: "ti-car" },
      { label: "Commercial Vehicles", param: "Commercial Vehicle", icon: "ti-truck" },
      { label: "Fleet Insurance", param: "Auto", icon: "ti-truck" },
    ],
  },
  {
    slug: "health-individual",
    name: "Health Insurance",
    desc: "Flexible medical coverage for you and your family.",
    icon: "ti-shield-plus",
    iconBg: "#E24B4A",
    blobColor: "#E24B4A",
    num: "02",
    subs: [
      { label: "Individual Health", param: "", icon: "ti-user" },
      { label: "Floater", param: "", icon: "ti-users" },
      { label: "Group Health", param: "", icon: "ti-users-group" },
    ],
  },
  {
    slug: "personal-accident",
    name: "Accidental Cover",
    desc: "Financial protection against accidents, anytime.",
    icon: "ti-user-check",
    iconBg: "#F5A623",
    blobColor: "#F5A623",
    num: "03",
    subs: [
      { label: "Individual", param: "Individual", icon: "ti-user" },
      { label: "Group", param: "Group", icon: "ti-users" },
    ],
  },
  {
    slug: "travel",
    name: "Travel Insurance",
    desc: "Stay protected wherever your journey takes you.",
    icon: "ti-plane",
    iconBg: "#0F9D8A",
    blobColor: "#0F9D8A",
    num: "04",
    subs: [
      { label: "Business / Leisure", param: "Business/Leisure", icon: "ti-briefcase" },
      { label: "Corporate", param: "Corporate", icon: "ti-building" },
    ],
  },
];

const STATS = [
  { icon: "ti-clock", line1: "Replies Within", line2: "2 Business Hours" },
  { icon: "ti-shield-check", line1: "Expert", line2: "Advice" },
  { icon: "ti-file-description", line1: "No Hidden", line2: "Charges Ever" },
];

function SubRow({
  label,
  slug,
  param,
  icon,
}: {
  label: string;
  slug: string;
  param: string;
  icon: string;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    const href = param
      ? `/products/${slug}?category=${encodeURIComponent(param)}`
      : `/products/${slug}`;
    router.push(href);
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 0",
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          fontSize: 12,
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.6)",
          transition: "color 0.15s ease",
        }}
      >
        <i
          className={`ti ${icon}`}
          style={{
            fontSize: 13,
            color: hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
            transition: "color 0.15s ease",
          }}
          aria-hidden="true"
        />
        {label}
      </span>
      <i
        className="ti ti-chevron-right"
        style={{
          fontSize: 12,
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.3)",
          transition: "color 0.15s ease",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

function HeroCard({ card }: { card: HeroCardData }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => router.push(`/products/${card.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1a2f5a",
        borderRadius: 16,
        padding: "20px 20px 16px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        border: hovered
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.07)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Blob decoration */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: card.blobColor,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      {/* Number + icon row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: card.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <i
            className={`ti ${card.icon}`}
            style={{ fontSize: 20, color: "#ffffff" }}
            aria-hidden="true"
          />
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "rgba(255,255,255,0.25)",
            letterSpacing: "0.05em",
          }}
        >
          {card.num}
        </span>
      </div>

      {/* Card title */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#ffffff",
          margin: "0 0 4px",
          lineHeight: 1.3,
        }}
      >
        {card.name}
      </p>

      {/* Card description */}
      <p
        style={{
          fontSize: 11,
          color: "rgba(255,255,255,0.45)",
          margin: "0 0 12px",
          lineHeight: 1.5,
        }}
      >
        {card.desc}
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "rgba(255,255,255,0.08)",
          marginBottom: 10,
        }}
      />

      {/* Sub-categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {card.subs.map((s) => (
          <SubRow
            key={s.label}
            label={s.label}
            slug={card.slug}
            param={s.param}
            icon={s.icon}
          />
        ))}
      </div>

      {/* Explore more link */}
      <div
        style={{
          marginTop: 10,
          paddingTop: 8,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: hovered ? "#F5B800" : "rgba(245,184,0,0.65)",
            fontWeight: 600,
            transition: "color 0.15s ease",
          }}
        >
          Explore More
        </span>
        <i
          className="ti ti-arrow-right"
          style={{
            fontSize: 11,
            color: hovered ? "#F5B800" : "rgba(245,184,0,0.65)",
            transition: "color 0.15s ease",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default function BentoHero() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <section
      style={{
        background: "#0f1f3d",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 24px 64px",
          width: "100%",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* ── LEFT — copy ───────────────────────────────────────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Pill tag */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(245,184,0,0.1)",
                border: "1px solid rgba(245,184,0,0.28)",
                borderRadius: 50,
                padding: "5px 14px",
                fontSize: 10,
                fontWeight: 700,
                color: "#F5B800",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              <i
                className="ti ti-shield-check"
                style={{ fontSize: 12 }}
                aria-hidden="true"
              />
              Insurance Made Simple. Claims Made Easier
            </span>

            {/* Headline */}
            <h1
              style={{
                fontSize: "clamp(32px, 4.5vw, 50px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#ffffff",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Insurance is easy to buy.
              <br />
              The real test is when
              <br />
              you need to{" "}
              <span style={{ color: "#F5B800" }}>make a claim.</span>
            </h1>

            {/* Body */}
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.55)",
                maxWidth: 460,
                margin: 0,
              }}
            >
              At Coverton Insurance Broking, we help you choose the right
              insurance with honest, unbiased advice. And when it's time to
              make a claim, we're right beside you, guiding you through the
              process until it's settled.
            </p>

            {/* Trust row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <i
                  className="ti ti-check"
                  style={{ fontSize: 13, color: "#F5B800" }}
                  aria-hidden="true"
                />
                IRDAI Licensed Insurance Broker
              </span>
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: "rgba(255,255,255,0.2)",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <i
                  className="ti ti-check"
                  style={{ fontSize: 13, color: "#F5B800" }}
                  aria-hidden="true"
                />
                Right Comparison. Right Protection.
              </span>
            </div>

            {/* Stats row */}
            <div
              style={{
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
                paddingTop: 4,
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.line1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`ti ${s.icon}`}
                      style={{ fontSize: 16, color: "rgba(255,255,255,0.55)" }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#ffffff",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {s.line1}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.45)",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {s.line2}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — 2×2 card grid ────────────────────────────────────── */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
              }}
            >
              {CARDS.map((card) => (
                <HeroCard key={card.slug} card={card} />
              ))}
            </div>

            {/* View all button */}
            <Link href="/products" style={{ display: "block", marginTop: 12 }}>
              <button
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.6)",
                  borderRadius: 10,
                  padding: "13px 24px",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "rgba(255,255,255,0.35)";
                  el.style.color = "rgba(255,255,255,0.85)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                <i
                  className="ti ti-category"
                  style={{ fontSize: 16 }}
                  aria-hidden="true"
                />
                View all 13 insurance categories
                <i
                  className="ti ti-arrow-right"
                  style={{ fontSize: 14 }}
                  aria-hidden="true"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
