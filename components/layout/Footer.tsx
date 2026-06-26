"use client";

import Link from "next/link";
import Image from "next/image";
// Static import so Next.js processes the asset even though it's outside /public
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import covertonLogo from "@/asset/Coverton_logo-removebg-preview.png";

const QUICK_LINKS = [
  { label: "Family Insurance",    href: "/products/health-individual" },
  { label: "Business Insurance",  href: "/products/fire" },
  { label: "Claims",              href: "/claims" },
  { label: "Cashless Garages",    href: "/claims#cashless-garages" },
  { label: "Network Hospitals",   href: "/claims#network-hospitals" },
  { label: "Resources & Tools",   href: "/about" },
];

export default function Footer() {
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <footer
      style={{
        background: "#0b1628",
        color: "#ffffff",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 24px 0",
        }}
      >
        {/* ── 3-column grid ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Logo */}
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", width: "fit-content" }}>
              <Image
                src={covertonLogo}
                alt="Coverton Insurance"
                width={130}
                height={38}
                style={{ objectFit: "contain" }}
                priority
              />
            </Link>

            <p
              style={{
                fontSize: 12,
                fontStyle: "italic",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Insurance is the subject matter of solicitation.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", margin: 0, lineHeight: 1.6 }}>
                IRDAI Direct Broker Reg. No.
              </p>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#ffffff", margin: 0 }}>961</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.82)",
                marginBottom: 20,
              }}
            >
              Quick Links
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.82)",
                      textDecoration: "none",
                      transition: "color 0.15s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#ffffff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <p
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.82)",
                marginBottom: 20,
              }}
            >
              Contact Us
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Address */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <i
                  className="ti ti-map-pin"
                  style={{ fontSize: 15, color: "#1247D6", marginTop: 2, flexShrink: 0 }}
                  aria-hidden="true"
                />
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", margin: 0, lineHeight: 1.65 }}>
                  No 190-192, Hameed Complex, Anna Salai,
                  <br />
                  Express Estate, Royapettah, Chennai,
                  <br />
                  Tamil Nadu 600006
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+919566085116"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                }}
              >
                <i
                  className="ti ti-phone"
                  style={{ fontSize: 15, color: "#1247D6", flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", transition: "color 0.15s ease" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
                >
                  +91 95660 85116
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:wecare@coverton.in"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                }}
              >
                <i
                  className="ti ti-mail"
                  style={{ fontSize: 15, color: "#1247D6", flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", transition: "color 0.15s ease" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
                >
                  wecare@coverton.in
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  textDecoration: "none",
                }}
              >
                <i
                  className="ti ti-brand-whatsapp"
                  style={{ fontSize: 15, color: "#25D366", flexShrink: 0 }}
                  aria-hidden="true"
                />
                <span
                  style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", transition: "color 0.15s ease" }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#25D366")}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
                >
                  WhatsApp Us
                </span>
              </a>

              {/* Hours */}
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  margin: "4px 0 0",
                  lineHeight: 1.5,
                }}
              >
                Mon – Fri, 10 AM – 7 PM IST
              </p>
            </div>
          </div>

        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 20,
            paddingBottom: 24,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>
            © 2026 Coverton Insurance Brokers Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
