"use client";

import { useState } from "react";
import Image from "next/image";

// ── General Insurance logos ──────────────────────────────────────────────────
// @ts-ignore
import adityaBirlaLogo from "@/asset/Partner Logo/Aditya_Birla_Capital_idfQ_L_JnG_1.svg";
// @ts-ignore
import bajajLogo from "@/asset/Partner Logo/Bajaj_General_Insurance_idx3GSgnAE_2.jpeg";
// @ts-ignore
import careLogo from "@/asset/Partner Logo/Care_Health_Insurance_id5fBRvmJ6_1.svg";
// @ts-ignore
import cholaLogo from "@/asset/Partner Logo/Cholamandalam.svg";
// @ts-ignore
import ecgcLogo from "@/asset/Partner Logo/ECGC.png";
// @ts-ignore
import futureGeneraliLogo from "@/asset/Partner Logo/Future Generali India Insurance Company Limited.jpg";
// @ts-ignore
import galaxyLogo from "@/asset/Partner Logo/Galaxy.jpeg";
// @ts-ignore
import icicLombardLogo from "@/asset/Partner Logo/ICICI_Lombard_GIC_idlwpVghRG_0.png";
// @ts-ignore
import kotakLogo from "@/asset/Partner Logo/Kotak.jpg";
// @ts-ignore
import manipalCignaLogo from "@/asset/Partner Logo/Mnipal cigna.png";
// @ts-ignore
import nationalLogo from "@/asset/Partner Logo/National.jpg";
// @ts-ignore
import newIndiaLogo from "@/asset/Partner Logo/New india.jpg";
// @ts-ignore
import orientalLogo from "@/asset/Partner Logo/Oriental.svg";
// @ts-ignore
import rahejaLogo from "@/asset/Partner Logo/Raheja.webp";
// @ts-ignore
import relianceLogo from "@/asset/Partner Logo/Reliance_General_Insurance.svg.png";
// @ts-ignore
import royalSundaramLogo from "@/asset/Partner Logo/Royal-Sundaram-Logo-Vector.svg-.png";
// @ts-ignore
import sbiGeneralLogo from "@/asset/Partner Logo/SBI General.png";
// @ts-ignore
import shriramLogo from "@/asset/Partner Logo/Shriram General Insurance.png";
// @ts-ignore
import starHealthLogo from "@/asset/Partner Logo/Star Health Insurance.jpg";
// @ts-ignore
import tataAigLogo from "@/asset/Partner Logo/Tata AIG General Insurance.jpg";
// @ts-ignore
import unitedIndiaLogo from "@/asset/Partner Logo/United India Insurance.jpg";
// @ts-ignore
import extraLogo1 from "@/asset/Partner Logo/id58KXJzPV_1781713035166.png";
// @ts-ignore
import extraLogo2 from "@/asset/Partner Logo/id5mJwi2PF_logos.png";
// @ts-ignore
import extraLogo3 from "@/asset/Partner Logo/images.png";

// ── Life Insurance logos ─────────────────────────────────────────────────────
// @ts-ignore
import icicPruLogo from "@/asset/Partner Logo/ICICI Prudential Life.png";
// @ts-ignore
import licLogo from "@/asset/Partner Logo/LIC.jpg";
// @ts-ignore
import starUnionLogo from "@/asset/Partner Logo/Star Union Dai-ichi Life.jpg";
// @ts-ignore
import tataAiaLogo from "@/asset/Partner Logo/Tata AIA Life.png";

// ── Data ─────────────────────────────────────────────────────────────────────

const GENERAL = [
  { src: adityaBirlaLogo,    alt: "Aditya Birla Health Insurance" },
  { src: bajajLogo,          alt: "Bajaj Allianz General Insurance" },
  { src: careLogo,           alt: "Care Health Insurance" },
  { src: cholaLogo,          alt: "Cholamandalam MS General Insurance" },
  { src: ecgcLogo,           alt: "ECGC" },
  { src: futureGeneraliLogo, alt: "Future Generali India Insurance" },
  { src: galaxyLogo,         alt: "Galaxy Health Insurance" },
  { src: icicLombardLogo,    alt: "ICICI Lombard General Insurance" },
  { src: kotakLogo,          alt: "Kotak Mahindra General Insurance" },
  { src: manipalCignaLogo,   alt: "ManipalCigna Health Insurance" },
  { src: nationalLogo,       alt: "National Insurance Co." },
  { src: newIndiaLogo,       alt: "The New India Assurance Co." },
  { src: orientalLogo,       alt: "The Oriental Insurance Co." },
  { src: rahejaLogo,         alt: "Raheja QBE General Insurance" },
  { src: relianceLogo,       alt: "Reliance General Insurance" },
  { src: royalSundaramLogo,  alt: "Royal Sundaram Alliance Insurance" },
  { src: sbiGeneralLogo,     alt: "SBI General Insurance" },
  { src: shriramLogo,        alt: "Shriram General Insurance" },
  { src: starHealthLogo,     alt: "Star Health & Allied Insurance" },
  { src: tataAigLogo,        alt: "Tata AIG General Insurance" },
  { src: unitedIndiaLogo,    alt: "United India Insurance" },
  { src: extraLogo1,         alt: "Go Digit General Insurance" },
  { src: extraLogo2,         alt: "HDFC ERGO General Insurance" },
  { src: extraLogo3,         alt: "IFFCO Tokio General Insurance" },
];

const LIFE = [
  { src: licLogo,       alt: "Life Insurance Corporation of India" },
  { src: icicPruLogo,   alt: "ICICI Prudential Life Insurance" },
  { src: tataAiaLogo,   alt: "Tata AIA Life Insurance" },
  { src: starUnionLogo, alt: "Star Union Dai-ichi Life Insurance" },
];

// ── Card ─────────────────────────────────────────────────────────────────────

function LogoCard({ src, alt }: { src: unknown; alt: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        border: `1px solid ${hovered ? "#1247D6" : "#E8EBF5"}`,
        borderRadius: 12,
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        transition: "all 0.15s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        cursor: "default",
        minHeight: 90,
      }}
    >
      <div style={{ width: "100%", height: 44, position: "relative" }}>
        <Image
          src={src as string}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          sizes="140px"
        />
      </div>
      <p
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: "#8892A4",
          textAlign: "center",
          lineHeight: 1.35,
          margin: 0,
        }}
      >
        {alt}
      </p>
    </div>
  );
}

// ── Mobile data — same logos, shorter display names ───────────────────────────

const MOBILE_GENERAL: { src: unknown; name: string }[] = [
  { src: adityaBirlaLogo,    name: "Aditya Birla"   },
  { src: bajajLogo,          name: "Bajaj Allianz"  },
  { src: careLogo,           name: "Care Health"    },
  { src: cholaLogo,          name: "Cholamandalam"  },
  { src: ecgcLogo,           name: "ECGC"           },
  { src: futureGeneraliLogo, name: "Future Generali"},
  { src: galaxyLogo,         name: "Galaxy Health"  },
  { src: icicLombardLogo,    name: "ICICI Lombard"  },
  { src: kotakLogo,          name: "Kotak"          },
  { src: manipalCignaLogo,   name: "ManipalCigna"   },
  { src: nationalLogo,       name: "National"       },
  { src: newIndiaLogo,       name: "New India"      },
  { src: orientalLogo,       name: "Oriental"       },
  { src: rahejaLogo,         name: "Raheja QBE"     },
  { src: relianceLogo,       name: "Reliance"       },
  { src: royalSundaramLogo,  name: "Royal Sundaram" },
  { src: sbiGeneralLogo,     name: "SBI General"    },
  { src: shriramLogo,        name: "Shriram"        },
  { src: starHealthLogo,     name: "Star Health"    },
  { src: tataAigLogo,        name: "Tata AIG"       },
  { src: unitedIndiaLogo,    name: "United India"   },
  { src: extraLogo1,         name: "Go Digit"       },
  { src: extraLogo2,         name: "HDFC ERGO"      },
  { src: extraLogo3,         name: "IFFCO Tokio"    },
];

const MOBILE_LIFE: { src: unknown; name: string }[] = [
  { src: licLogo,       name: "LIC"           },
  { src: icicPruLogo,   name: "ICICI Pru Life" },
  { src: tataAiaLogo,   name: "Tata AIA Life"  },
  { src: starUnionLogo, name: "Star Union"     },
];

// ── Mobile logo pill ──────────────────────────────────────────────────────────

function MobileLogoPill({ src, name }: { src: unknown; name: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#EEF3FF" : "white",
        border: `1px solid ${hovered ? "#1247D6" : "#E8EBF5"}`,
        borderRadius: 10,
        padding: "12px 14px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        flexShrink: 0,
        width: 110,
        minHeight: 80,
        cursor: "pointer",
        transition: "all 0.15s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <div style={{ width: 80, height: 32, position: "relative" }}>
        <Image
          src={src as string}
          alt={name}
          fill
          style={{ objectFit: "contain", objectPosition: "center" }}
          sizes="80px"
        />
      </div>
      <p
        style={{
          fontSize: 10,
          fontWeight: 500,
          color: "#8892A4",
          textAlign: "center",
          lineHeight: 1.3,
          maxWidth: 100,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0,
        }}
      >
        {name}
      </p>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export default function InsurersSection() {
  const [activeTab, setActiveTab] = useState<"general" | "life">("general");
  const companies = activeTab === "general" ? GENERAL : LIFE;

  return (
    <section style={{ background: "#f7f9fc" }}>
      <style>{`
        .ins-scroll {
          display: flex;
          overflow-x: auto;
          gap: 8px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 8px;
          margin-bottom: 4px;
        }
        .ins-scroll::-webkit-scrollbar { display: none }
      `}</style>

      {/* ── Desktop ── */}
      <div className="hidden md:block px-5 sm:px-10 lg:px-20 py-12 lg:py-16">
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#1247D6",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            OUR NETWORK
          </p>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#0f1f3d", marginBottom: 10 }}>
            Insurers we work with
          </h2>
          <p style={{ fontSize: 14, color: "#8892A4", marginBottom: 32, lineHeight: 1.6 }}>
            We partner with 30+ leading insurance companies across health, motor, life, and general insurance
          </p>

          {/* Tab bar */}
          <div
            style={{
              display: "inline-flex",
              background: "white",
              border: "1px solid #E8EBF5",
              borderRadius: 10,
              padding: 4,
              marginBottom: 36,
            }}
          >
            {(["general", "life"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "9px 28px",
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "none",
                  background: activeTab === tab ? "#1247D6" : "transparent",
                  color: activeTab === tab ? "white" : "#8892A4",
                  transition: "all 0.15s ease",
                }}
              >
                {tab === "general" ? "General Insurance" : "Life Insurance"}
              </button>
            ))}
          </div>
        </div>

        {/* Logo grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 12,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {companies.map((company) => (
            <LogoCard key={company.alt} src={company.src} alt={company.alt} />
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="block md:hidden" style={{ background: "#FAFBFF", padding: "32px 20px" }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A0F1E", margin: "0 0 4px" }}>
          Insurers we work with
        </h2>
        <p style={{ fontSize: 12, color: "#8892A4", margin: "0 0 20px" }}>
          30+ leading insurance companies
        </p>

        {/* General row */}
        <p style={{ fontSize: 10, fontWeight: 600, color: "#8892A4", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 10px" }}>
          General Insurance
        </p>
        <div className="ins-scroll">
          {MOBILE_GENERAL.map((c) => (
            <MobileLogoPill key={c.name} src={c.src} name={c.name} />
          ))}
        </div>
        <p style={{ fontSize: 10, color: "#8892A4", display: "flex", alignItems: "center", gap: 4, margin: "0 0 16px" }}>
          <i className="ti ti-arrow-right" style={{ fontSize: 11 }} aria-hidden="true" />
          Swipe to see all {MOBILE_GENERAL.length}
        </p>

        {/* Life row */}
        <p style={{ fontSize: 10, fontWeight: 600, color: "#8892A4", letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 10px" }}>
          Life Insurance
        </p>
        <div className="ins-scroll">
          {MOBILE_LIFE.map((c) => (
            <MobileLogoPill key={c.name} src={c.src} name={c.name} />
          ))}
        </div>
        <p style={{ fontSize: 10, color: "#8892A4", display: "flex", alignItems: "center", gap: 4, margin: 0 }}>
          <i className="ti ti-arrow-right" style={{ fontSize: 11 }} aria-hidden="true" />
          Swipe to see all {MOBILE_LIFE.length}
        </p>
      </div>
    </section>
  );
}
