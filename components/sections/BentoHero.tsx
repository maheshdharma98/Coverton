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
  cardBg: string;
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
    cardBg: "#EEF3FF",
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
    cardBg: "#FFF2F2",
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
    cardBg: "#FFFBF0",
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
    cardBg: "#F0FAF8",
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
          gap: 6,
          fontSize: 11,
          color: hovered ? "#0A0F1E" : "#6B7280",
          transition: "color 0.15s ease",
        }}
      >
        <i
          className={`ti ${icon}`}
          style={{
            fontSize: 11,
            color: hovered ? "#1247D6" : "#64748B",
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
          color: hovered ? "#1247D6" : "#D1D5DB",
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
        background: card.cardBg,
        borderRadius: 14,
        padding: "14px 16px 12px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        border: hovered
          ? `1px solid ${card.blobColor}55`
          : "1px solid #E8EBF5",
        boxShadow: hovered ? `0 6px 24px ${card.blobColor}18` : "0 2px 8px rgba(0,0,0,0.05)",
        transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Blob decoration */}
      <div
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: card.blobColor,
          opacity: 0.18,
          pointerEvents: "none",
        }}
      />

      {/* Icon row */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: card.iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <i
            className={`ti ${card.icon}`}
            style={{ fontSize: 16, color: "#ffffff" }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Card title */}
      <p
        style={{
          fontSize: 12.5,
          fontWeight: 700,
          color: "#0A0F1E",
          margin: "0 0 3px",
          lineHeight: 1.3,
        }}
      >
        {card.name}
      </p>

      {/* Card description */}
      <p
        style={{
          fontSize: 10.5,
          color: "#64748B",
          margin: "0 0 10px",
          lineHeight: 1.5,
        }}
      >
        {card.desc}
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: "#F0F2F8",
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

    </div>
  );
}

export default function BentoHero() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <section
      style={{
        background: "transparent",
        minHeight: "78vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "96px 24px 48px",
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
                background: "#EEF3FF",
                border: "1px solid #BFDBFE",
                borderRadius: 50,
                padding: "5px 14px",
                fontSize: 10,
                fontWeight: 700,
                color: "#1247D6",
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
                fontSize: "clamp(28px, 3.8vw, 44px)",
                fontWeight: 900,
                lineHeight: 1.12,
                color: "#0A0F1E",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Insurance is easy to buy.
              <br />
              The real test is when
              <br />
              you need to{" "}
              <span style={{ color: "#1247D6" }}>make a claim.</span>
            </h1>

            {/* Body */}
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.75,
                color: "#6B7280",
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
                  color: "#374151",
                }}
              >
                <i
                  className="ti ti-check"
                  style={{ fontSize: 13, color: "#1247D6" }}
                  aria-hidden="true"
                />
                IRDAI Licensed Insurance Broker
              </span>
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: "#D1D5DB",
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
                  color: "#374151",
                }}
              >
                <i
                  className="ti ti-check"
                  style={{ fontSize: 13, color: "#1247D6" }}
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
                      background: "#F3F4F6",
                      border: "1px solid #E5E7EB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={`ti ${s.icon}`}
                      style={{ fontSize: 16, color: "#1247D6" }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#0A0F1E",
                        margin: 0,
                        lineHeight: 1.3,
                      }}
                    >
                      {s.line1}
                    </p>
                    <p
                      style={{
                        fontSize: 11,
                        color: "#64748B",
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
                gap: 8,
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
                  border: "1px solid #E5E7EB",
                  color: "#6B7280",
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
                  el.style.borderColor = "#1247D6";
                  el.style.color = "#1247D6";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.borderColor = "#E5E7EB";
                  el.style.color = "#6B7280";
                }}
              >
                <i
                  className="ti ti-category"
                  style={{ fontSize: 16 }}
                  aria-hidden="true"
                />
                View all insurance categories
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
