"use client";

import Image from "next/image";
// @ts-ignore
import olirLogo from "@/asset/Client Logo/Olir_hsopital-removebg-preview.png";
// @ts-ignore
import royalYachtLogo from "@/asset/Client Logo/Royal_Madras_Yacht_Club_badge.svg";
// @ts-ignore
import sssLogo from "@/asset/Client Logo/SSS_group-removebg-preview.png";
// @ts-ignore
import seethapathyLogo from "@/asset/Client Logo/Seethapathy.png";
// @ts-ignore
import vivekanandaLogo from "@/asset/Client Logo/Vivekananda Educational Institution.jpg";
// @ts-ignore
import bbLogo from "@/asset/Client Logo/bbdevelopersandbuilders_logo-removebg-preview.png";
// @ts-ignore
import evacareLogo from "@/asset/Client Logo/evacare-complete-woman-healthcare.jpeg";
// @ts-ignore
import flixbusLogo from "@/asset/Client Logo/flixbus.png";

const CLIENTS = [
  { src: olirLogo,       alt: "Olir Super Speciality Hospital" },
  { src: sssLogo,        alt: "SSS Group of Companies" },
  { src: seethapathyLogo,alt: "Seethapathy Clinic & Hospital" },
  { src: evacareLogo,    alt: "EVA Care Healthcare" },
  { src: vivekanandaLogo,alt: "Vivekananda Educational Institution" },
  { src: royalYachtLogo, alt: "Royal Madras Yacht Club" },
  { src: bbLogo,         alt: "BB Developers & Builders" },
  { src: flixbusLogo,    alt: "FlixBus" },
];

function ClientCard({ src, alt }: { src: unknown; alt: string }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #E8EBF5",
        borderRadius: 14,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        minHeight: 100,
        transition: "all 0.2s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ width: "100%", height: 56, position: "relative" }}>
        <Image
          src={src as string}
          alt={alt}
          fill
          style={{ objectFit: "contain" }}
          sizes="160px"
        />
      </div>
      <p
        style={{
          fontSize: 10.5,
          fontWeight: 600,
          color: "#0f1f3d",
          textAlign: "center",
          lineHeight: 1.4,
          margin: 0,
        }}
      >
        {alt}
      </p>
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section
      style={{ background: "transparent", textAlign: "center" }}
      className="px-5 sm:px-10 lg:px-20 py-8 lg:py-12"
    >
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
        OUR CLIENTS
      </p>

      <h2
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: "#0A0F1E",
          marginBottom: 12,
          lineHeight: 1.3,
        }}
      >
        Trusted by leading hospitals and manufacturers
      </h2>

      <div
        style={{
          width: 48,
          height: 3,
          background: "#1247D6",
          borderRadius: 2,
          margin: "0 auto 32px",
        }}
      />

      <div
        className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
        style={{ gap: 16, maxWidth: 900, margin: "0 auto" }}
      >
        {CLIENTS.map((client) => (
          <ClientCard key={client.alt} src={client.src} alt={client.alt} />
        ))}
      </div>
    </section>
  );
}
