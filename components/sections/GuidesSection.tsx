"use client";
import Link from "next/link";

const GUIDES = [
  {
    slug: "health-policy-red-flags",
    title: "Health policy red flags to watch for",
    desc: "Check these 7 things before signing any policy — or you'll find out the hard way on claim day.",
    meta: "7 min read",
    tag: "Before You Buy",
    icon: "ti-shield-exclamation",
    accent: "#1247D6",
    cardBg: "rgba(18,71,214,0.08)",
    glowColor: "rgba(18,71,214,0.35)",
  },
  {
    slug: "claim-day-kit",
    title: "Your claim-day kit — what to do in the first 24 hours",
    desc: "The actions you take in the first 24 hours after an incident define whether your claim is smooth or a battle.",
    meta: "6 min read",
    tag: "Step-by-Step",
    icon: "ti-checklist",
    accent: "#0F8060",
    cardBg: "rgba(15,128,96,0.08)",
    glowColor: "rgba(15,128,96,0.35)",
  },
  {
    slug: "employer-cover-enough",
    title: "Is your employer's group cover actually enough?",
    desc: "Your group cover disappears when you change jobs — and often falls short for serious illness. Here's what to know.",
    meta: "6 min read",
    tag: "Group Cover",
    icon: "ti-building",
    accent: "#B58A00",
    cardBg: "rgba(181,138,0,0.08)",
    glowColor: "rgba(181,138,0,0.35)",
  },
];

export default function GuidesSection() {
  return (
    <section
      style={{ background: "#0f1f3d", overflow: "hidden" }}
      className="px-5 sm:px-10 lg:px-16 py-14 lg:py-20"
    >
      <style>{`
        .guide-card {
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }
        .guide-card:hover {
          transform: translateY(-6px) !important;
        }
        .guide-card:hover .guide-read-btn {
          background: var(--g-accent) !important;
          color: white !important;
        }
        .guide-read-btn {
          transition: background 0.2s, color 0.2s;
        }
        .guides-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 900px) {
          .guides-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 601px) and (max-width: 900px) {
          .guides-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* ── Section header ─────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#F5B800",
              background: "rgba(245,184,0,0.1)",
              border: "1px solid rgba(245,184,0,0.2)",
              borderRadius: 50,
              padding: "4px 14px",
              marginBottom: 16,
            }}
          >
            Guides
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 3.8vw, 38px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.6px",
              lineHeight: 1.18,
              margin: "0 auto 12px",
              maxWidth: 560,
            }}
          >
            Learn before you buy.{" "}
            <span style={{ color: "rgba(255,255,255,0.38)" }}>
              Know before you claim.
            </span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.42)", maxWidth: 460, margin: "0 auto", lineHeight: 1.65 }}>
            Plain-language guides from the Coverton advisory team — no jargon, no sales pitch.
          </p>
        </div>

        {/* ── Card grid ──────────────────────────────────────────────── */}
        <div className="guides-grid">
          {GUIDES.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                className="guide-card"
                style={
                  {
                    background: "rgba(255,255,255,0.045)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 20,
                    padding: "28px 26px 24px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0,
                    cursor: "pointer",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    "--g-accent": g.accent,
                  } as React.CSSProperties
                }
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: g.cardBg,
                    border: `1px solid ${g.accent}30`,
                    display: "grid",
                    placeItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <i
                    className={`ti ${g.icon}`}
                    style={{ fontSize: 26, color: g.accent }}
                    aria-hidden="true"
                  />
                </div>

                {/* Tag */}
                <span
                  style={{
                    display: "inline-block",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    color: g.accent,
                    background: `${g.accent}18`,
                    borderRadius: 50,
                    padding: "3px 10px",
                    marginBottom: 12,
                    alignSelf: "flex-start",
                  }}
                >
                  {g.tag}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1.35,
                    letterSpacing: "-0.3px",
                    margin: "0 0 10px",
                  }}
                >
                  {g.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: 13.5,
                    color: "rgba(255,255,255,0.48)",
                    lineHeight: 1.65,
                    margin: "0 0 20px",
                    flex: 1,
                  }}
                >
                  {g.desc}
                </p>

                {/* Footer row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.28)" }}>
                    <i className="ti ti-clock" style={{ fontSize: 12, marginRight: 4 }} aria-hidden="true" />
                    {g.meta}
                  </span>
                  <span
                    className="guide-read-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: g.accent,
                      border: `1.5px solid ${g.accent}`,
                      borderRadius: 50,
                      padding: "5px 14px",
                    }}
                  >
                    Read guide
                    <i className="ti ti-arrow-right" style={{ fontSize: 12 }} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
