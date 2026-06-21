"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

// ── Step metadata ─────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Unlock",     headline: "It starts with a message.",        desc: "Riya gets a WhatsApp from a friend — and a reminder that her car insurance renews in 3 days." },
  { label: "Search",    headline: "She searches for the best cover.",  desc: "A quick tap on her phone's search bar: \"coverton ins...\" — autocomplete does the rest." },
  { label: "Finds site", headline: "Coverton tops the results.",       desc: "Google puts Coverton first. Trusted badge, 4.8 stars, IRDAI registered — she clicks." },
  { label: "Browses",   headline: "Clean site. No jargon.",            desc: "She's on the Coverton homepage. It's fast, clear, and she immediately knows what to do." },
  { label: "Enquires",  headline: "2-minute form. Done.",              desc: "Motor form, all fields filled — vehicle number, pincode, category. Green checkmarks across the board." },
  { label: "Done!",     headline: "Reference number confirmed.",       desc: "Ref #CVT-28401 lands in her inbox. An advisor calls within 60 minutes. She's covered." },
];

// ── App icon SVGs (stroke-based, white on coloured bg) ────────────────────────

function SvgChrome() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <circle cx="12" cy="12" r="3.5" fill="white" />
      <circle cx="12" cy="12" r="8.5" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="3.5" x2="8.7" y2="9.3" stroke="white" strokeOpacity=".5" strokeWidth="1.2" />
      <line x1="12" y1="3.5" x2="15.3" y2="9.3" stroke="white" strokeOpacity=".5" strokeWidth="1.2" />
      <line x1="3.5" y1="12" x2="8.7" y2="12" stroke="white" strokeOpacity=".5" strokeWidth="1.2" />
    </svg>
  );
}

function SvgWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
      <path d="M17.47 14.38c-.27-.14-1.59-.79-1.84-.87s-.43-.14-.6.13-.7.87-.85 1.04-.31.2-.58.07a7.3 7.3 0 01-2.14-1.33 8 8 0 01-1.48-1.85c-.16-.27 0-.41.12-.55.11-.12.27-.31.4-.46.14-.16.18-.27.27-.45s.04-.34-.02-.48-.6-1.44-.82-1.97c-.22-.52-.44-.44-.6-.45-.16 0-.34-.01-.52-.01s-.48.07-.73.34c-.25.27-.97.95-.97 2.31s.99 2.67 1.13 2.86c.14.18 1.95 2.99 4.74 4.19.66.28 1.18.45 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.52-.3zM12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.09-1.34A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
    </svg>
  );
}

function SvgInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
    </svg>
  );
}

function SvgMaps() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white" fillOpacity=".3" />
      <circle cx="12" cy="9" r="2.5" fill="white" />
    </svg>
  );
}

function SvgMusic() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V6l12-2v12" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function SvgCamera() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function SvgSettings() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function SvgPhotos() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 15l5-5 4 4 3-3 5 5" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="white" stroke="none" />
    </svg>
  );
}

function SvgPhone() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 012 2.82 2 2 0 013.94 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function SvgMail() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SvgWorld() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
    </svg>
  );
}

function SvgSearch() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function SvgCheck({ size = 10 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="#22C55E" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function SvgCircleCheck() {
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ── App grid data ────────────────────────────────────────────────────────────

const APP_GRID = [
  { bg: "#1a73e8", label: "Chrome",    Icon: SvgChrome },
  { bg: "#25d366", label: "WhatsApp",  Icon: SvgWhatsApp },
  { bg: "#e1306c", label: "Instagram", Icon: SvgInstagram },
  { bg: "#ea4335", label: "Maps",      Icon: SvgMaps },
  { bg: "#fc3c44", label: "Music",     Icon: SvgMusic },
  { bg: "#1c1c1e", label: "Camera",    Icon: SvgCamera },
  { bg: "#636366", label: "Settings",  Icon: SvgSettings },
  { bg: "#30b0c7", label: "Photos",    Icon: SvgPhotos },
];

const DOCK = [
  { bg: "#1a73e8", Icon: SvgChrome,   label: "Chrome" },
  { bg: "#25d366", Icon: SvgWhatsApp, label: "WhatsApp" },
  { bg: "#2c2c2e", Icon: SvgPhone,    label: "Phone" },
  { bg: "#1a73e8", Icon: SvgMail,     label: "Mail" },
];

// ── Individual phone screens ──────────────────────────────────────────────────

function Screen0() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#1a1a2e", color: "#fff" }}>
      <div className="flex flex-col items-center pt-8 pb-4 gap-1">
        <p className="text-3xl font-black tracking-tight">9:41</p>
        <p className="text-[10px] opacity-50">Tuesday, 17 June</p>
      </div>

      <div className="flex justify-center mb-4">
        <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
          <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-3">
        <div className="rounded-[10px] px-3 py-2.5" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <SvgWhatsApp />
            </div>
            <span className="text-[9px] font-semibold text-white/80">WhatsApp · now</span>
          </div>
          <p className="text-[10px] text-white/90 font-medium">Mahesh: Hey! My friend used Coverton for motor — super easy!</p>
        </div>

        <div className="rounded-[10px] px-3 py-2.5" style={{ background: "rgba(255,255,255,0.10)" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5" fill="#fff"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6" stroke="#fff" strokeWidth="2"/><line x1="8" y1="2" x2="8" y2="6" stroke="#fff" strokeWidth="2"/><line x1="3" y1="10" x2="21" y2="10" stroke="#fff" strokeWidth="2"/></svg>
            </div>
            <span className="text-[9px] font-semibold text-white/80">Reminders · 9:41 AM</span>
          </div>
          <p className="text-[10px] text-white/90 flex items-center gap-1">
            <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            Car insurance renewal in 3 days
          </p>
        </div>
      </div>

      <div className="mt-auto pb-4 flex flex-col items-center gap-1">
        <div className="w-12 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
        <p className="text-[8px] opacity-30">Swipe up to unlock</p>
      </div>
    </div>
  );
}

function Screen1() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "linear-gradient(160deg, #1c2340 0%, #0d1117 100%)" }}>
      {/* Status bar */}
      <div className="flex items-center justify-between px-3 pt-2 pb-1">
        <span className="text-[8px] font-bold text-white">9:41</span>
        <div className="flex items-center gap-1 text-white">
          <svg viewBox="0 0 24 24" width="10" height="10" fill="white" opacity=".8"><path d="M1.5 8.5C5.4 4.6 10.4 2.5 12 2.5s6.6 2.1 10.5 6l-2.1 2.1C17 7.2 14.3 5.5 12 5.5s-5 1.7-8.4 5.1L1.5 8.5z"/><path d="M5.5 12.5C7.8 10.2 10 9 12 9s4.2 1.2 6.5 3.5l-2 2C14.9 12.9 13.4 12 12 12s-2.9.9-4.5 2.5l-2-2z"/><circle cx="12" cy="18" r="2"/></svg>
          <svg viewBox="0 0 24 24" width="10" height="10" fill="white" opacity=".8"><rect x="2" y="7" width="3" height="10" rx="1"/><rect x="7" y="5" width="3" height="12" rx="1"/><rect x="12" y="3" width="3" height="14" rx="1"/><rect x="17" y="1" width="3" height="16" rx="1"/></svg>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="white" opacity=".8"><rect x="2" y="7" width="18" height="11" rx="2" stroke="white" strokeWidth="1.5" fill="none"/><rect x="4" y="9" width="12" height="7" rx="1" fill="white"/><path d="M20 10v4" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Search bar */}
      <div className="mx-2 mt-1 mb-3 rounded-[10px] px-3 py-2 flex items-center gap-2" style={{ background: "rgba(255,255,255,0.12)" }}>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2.5}><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <span className="text-[10px] text-white/90">coverton ins<span className="opacity-70 animate-pulse">|</span></span>
      </div>

      {/* App grid 4×2 */}
      <div className="grid grid-cols-4 gap-x-2 gap-y-3 px-3">
        {APP_GRID.map(({ bg, label, Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className="flex items-center justify-center"
              style={{ width: 44, height: 44, borderRadius: 12, background: bg }}
            >
              <Icon />
            </div>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div className="mt-auto mx-3 mb-3">
        <div
          className="flex items-center justify-around"
          style={{ background: "rgba(255,255,255,0.15)", borderRadius: 18, padding: 10 }}
        >
          {DOCK.map(({ bg, Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className="flex items-center justify-center"
                style={{ width: 44, height: 44, borderRadius: 12, background: bg }}
              >
                <Icon />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Screen2() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#fff" }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-2 pt-2 pb-1.5" style={{ background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
        <div className="flex gap-0.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 rounded-full px-2 py-0.5 text-[8px] flex items-center gap-1" style={{ background: "#fff", border: "1px solid #d1d5db", color: "#6b7280" }}>
          <SvgWorld />
          google.com · coverton insurance
        </div>
      </div>

      {/* Search bar */}
      <div className="mx-2 mt-2 mb-2 rounded-[8px] px-2 py-1.5 flex items-center gap-1.5" style={{ background: "#f8f9fa", border: "1px solid #e5e7eb" }}>
        <SvgSearch />
        <span className="text-[9px]" style={{ color: "#333" }}>coverton insurance</span>
      </div>

      <div className="flex flex-col gap-2 px-3">
        {/* Sponsored */}
        <div className="rounded-[6px] border p-2" style={{ borderColor: "#e5e7eb" }}>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[7px] px-1 rounded" style={{ background: "#f0f9f0", color: "#15803d", border: "1px solid #bbf7d0" }}>Sponsored</span>
          </div>
          <p className="text-[8px] font-semibold" style={{ color: "#1a0dab" }}>Coverton Insurance — Get a Quote in 2 Minutes</p>
          <p className="text-[7px]" style={{ color: "#006621" }}>www.covertoninsurance.in</p>
          <p className="text-[7px]" style={{ color: "#545454" }}>IRDAI registered. Fast claim settlement.</p>
        </div>

        {/* Organic #1 */}
        <div className="rounded-[6px] p-2" style={{ background: "#f8f9ff", border: "2px solid #1247D6" }}>
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-[7px]" style={{ color: "#006621" }}>covertoninsurance.in</p>
            <div className="flex items-center gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} viewBox="0 0 24 24" width="8" height="8" fill="#F5B800"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              ))}
            </div>
          </div>
          <p className="text-[9px] font-bold" style={{ color: "#1247D6" }}>Coverton Insurance | India's Trusted Platform</p>
          <p className="text-[7px] mt-0.5" style={{ color: "#545454" }}>Motor, Health, Life, Travel & more. Get insured in minutes.</p>
        </div>

        {/* Result 2 */}
        <div className="p-2">
          <p className="text-[7px]" style={{ color: "#006621" }}>policybazaar.com</p>
          <p className="text-[8px] font-semibold" style={{ color: "#1a0dab" }}>Compare Insurance Plans Online</p>
          <p className="text-[7px]" style={{ color: "#545454" }}>500+ plans from 30+ insurers…</p>
        </div>
      </div>
    </div>
  );
}

const MINI_PRODUCTS = [
  { label: "Motor",  icon: "🚗", color: "#1247D6", overlay: "rgba(18,71,214,0.85)" },
  { label: "Health", icon: "🏥", color: "#0891B2", overlay: "rgba(8,145,178,0.85)" },
  { label: "Life",   icon: "🛡️", color: "#7C3AED", overlay: "rgba(124,58,237,0.85)" },
  { label: "Travel", icon: "✈️", color: "#059669", overlay: "rgba(5,150,105,0.85)" },
  { label: "Fire",   icon: "🔥", color: "#DC2626", overlay: "rgba(220,38,38,0.85)" },
  { label: "Marine", icon: "⚓", color: "#0369A1", overlay: "rgba(3,105,161,0.85)" },
];

function Screen3() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: "#FAFBFF" }}>
      {/* Notch spacer */}
      <div style={{ height: 32 }} />

      {/* Mini browser bar */}
      <div className="flex items-center gap-1 px-2 pb-1" style={{ background: "#fff", borderBottom: "1px solid #E8EBF5" }}>
        <div className="flex-1 rounded-full px-1.5 py-0.5 text-[7px] flex items-center gap-1" style={{ background: "#f3f4f6", color: "#22C55E" }}>
          <SvgWorld />
          <span style={{ color: "#6b7280" }}>covertoninsurance.in</span>
        </div>
      </div>

      {/* Mini Navbar */}
      <div className="flex items-center justify-between px-2 py-1" style={{ background: "#fff", borderBottom: "1px solid #E8EBF5" }}>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full flex items-center justify-center" style={{ background: "#1247D6" }}>
            <svg className="w-1.5 h-1.5" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <span className="text-[7px] font-bold" style={{ color: "#0A0F1E" }}>Coverton<span style={{ color: "#F5B800" }}>.</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[6px]" style={{ color: "#3D4460" }}>Products</span>
          <span className="text-[6px]" style={{ color: "#3D4460" }}>Claims</span>
          <span className="text-[6px] px-1 py-0.5 rounded-full text-white" style={{ background: "#1247D6" }}>Quote</span>
        </div>
      </div>

      {/* Mini hero */}
      <div className="px-2.5 py-2" style={{ background: "#0A0F1E" }}>
        <p className="text-[8px] font-black text-white leading-tight">Insurance that actually <span style={{ color: "#F5B800" }}>works</span> for you.</p>
        <p className="text-[6px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>Fast claims. Real advisors.</p>
        <div className="mt-1.5 flex gap-1">
          <span className="text-[6px] px-2 py-0.5 rounded-full font-bold" style={{ background: "#F5B800", color: "#0A0F1E" }}>Get quote</span>
          <span className="text-[6px] px-2 py-0.5 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)" }}>Learn more</span>
        </div>
      </div>

      {/* Products section */}
      <div style={{ background: "#0f1f3d", flex: 1, padding: "6px 8px 8px" }}>
        <p className="text-[6.5px] font-bold text-white mb-0.5">Insurance Products</p>
        <div className="grid grid-cols-2 gap-1">
          {MINI_PRODUCTS.map(({ label, icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 rounded-[6px] px-2"
              style={{ background: "rgba(255,255,255,0.07)", height: 32 }}
            >
              <div
                className="flex items-center justify-center rounded-[4px] flex-shrink-0"
                style={{ width: 20, height: 20, background: color }}
              >
                <span style={{ fontSize: 10 }}>{icon}</span>
              </div>
              <div>
                <p className="text-[6.5px] font-semibold text-white leading-none">{label}</p>
                <p className="text-[5px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>Get quote →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Screen4() {
  const fields = [
    { label: "Full Name",   value: "Riya Sharma",    ok: true },
    { label: "Mobile",      value: "9876543210",     ok: true },
    { label: "Email",       value: "riya@gmail.com", ok: true },
    { label: "Pincode",     value: "400001",          ok: true },
    { label: "Category",    value: "Private Car",    ok: true },
    { label: "Vehicle No.", value: "MH12CD5678",     ok: true },
  ];

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#FAFBFF" }}>
      {/* Status bar clears the notch */}
      <div className="flex items-center justify-between px-3" style={{ height: 34, background: "#fff", borderBottom: "1px solid #E8EBF5", flexShrink: 0 }}>
        <span className="text-[7px] font-bold" style={{ color: "#0A0F1E" }}>9:41</span>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" width="9" height="9" fill="#0A0F1E" opacity=".7"><path d="M1.5 8.5C5.4 4.6 10.4 2.5 12 2.5s6.6 2.1 10.5 6l-2.1 2.1C17 7.2 14.3 5.5 12 5.5s-5 1.7-8.4 5.1L1.5 8.5z"/><path d="M5.5 12.5C7.8 10.2 10 9 12 9s4.2 1.2 6.5 3.5l-2 2C14.9 12.9 13.4 12 12 12s-2.9.9-4.5 2.5l-2-2z"/><circle cx="12" cy="18" r="2"/></svg>
          <svg viewBox="0 0 24 24" width="10" height="10" fill="none"><rect x="2" y="7" width="18" height="11" rx="2" stroke="#0A0F1E" strokeWidth="1.5" opacity=".7"/><rect x="4" y="9" width="11" height="7" rx="1" fill="#0A0F1E" opacity=".7"/><path d="M20 10v4" stroke="#0A0F1E" strokeWidth="2" strokeLinecap="round" opacity=".7"/></svg>
        </div>
      </div>

      {/* Form header */}
      <div className="px-3 pt-2 pb-1.5" style={{ background: "#1247D6", flexShrink: 0 }}>
        <p className="text-[9px] font-black text-white">Motor Insurance</p>
        <p className="text-[6.5px]" style={{ color: "rgba(255,255,255,0.7)" }}>Fill in your details to get a quote</p>
      </div>

      {/* Scrollable form body */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="flex flex-col gap-1.5">
          {fields.map(({ label, value, ok }) => (
            <div key={label}>
              <p className="text-[6.5px] font-semibold mb-0.5" style={{ color: "#8892A4" }}>{label}</p>
              <div
                className="flex items-center justify-between rounded-[6px] px-2 py-1.5"
                style={{ border: `1px solid ${ok ? "#86EFAC" : "#E8EBF5"}`, background: ok ? "#F0FDF4" : "#fff" }}
              >
                <span className="text-[7.5px]" style={{ color: "#0A0F1E" }}>{value}</span>
                {ok && <SvgCheck size={9} />}
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-3 w-full py-1.5 rounded-full text-[8px] font-bold text-white"
          style={{ background: "#1247D6" }}
        >
          Get a Quote →
        </button>
      </div>
    </div>
  );
}

function Screen5() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4" style={{ background: "#F0FDF4" }}>
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: "#DCFCE7" }}
      >
        <SvgCircleCheck />
      </div>

      <div className="text-center">
        <p className="text-[10px] font-bold" style={{ color: "#15803D" }}>Enquiry Submitted!</p>
        <p className="text-[8px] mt-0.5" style={{ color: "#166534" }}>Advisor calling within 60 min</p>
      </div>

      <div
        className="rounded-[8px] px-4 py-2 text-center"
        style={{ background: "#fff", border: "1px solid #86EFAC" }}
      >
        <p className="text-[7px] font-medium uppercase tracking-wide" style={{ color: "#22C55E" }}>Reference ID</p>
        <p className="text-[11px] font-black" style={{ color: "#0A0F1E" }}>#CVT-28401</p>
      </div>

      <p className="text-[8px] text-center flex items-center justify-center gap-1" style={{ color: "#16A34A" }}>
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
        Confirmation sent to riya@gmail.com
      </p>
    </div>
  );
}

const SCREENS = [Screen0, Screen1, Screen2, Screen3, Screen4, Screen5];

// ── Main component ────────────────────────────────────────────────────────────

export default function UserStory() {
  const [active, setActive] = useState(0);
  const [hoverNext, setHoverNext] = useState(false);
  const [pressNext, setPressNext] = useState(false);
  const [hoverPrev, setHoverPrev] = useState(false);

  const prev = useCallback(() => setActive((a) => Math.max(0, a - 1)), []);
  const next = useCallback(() => setActive((a) => Math.min(STEPS.length - 1, a + 1)), []);

  return (
    <section
      className="py-8 sm:py-12 lg:py-16"
      style={{ background: "var(--ink)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <div className="flex flex-col items-center text-center gap-3 mb-10 sm:mb-14">
          <span
            className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
          >
            The experience
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
            From search to insured in minutes.
          </h2>
        </div>

        {/* Step progress bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 mb-10 sm:mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {STEPS.map(({ label }, i) => (
            <button
              key={label}
              onClick={() => setActive(i)}
              className="flex items-center gap-1.5 flex-shrink-0 transition-all min-h-[44px]"
              aria-label={`Go to step: ${label}`}
              aria-current={active === i ? "step" : undefined}
            >
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                  active === i ? "ring-2 ring-offset-2 ring-offset-[var(--ink)] ring-[var(--gold)]" : ""
                )}
                style={{
                  background: active === i ? "var(--gold)" : i < active ? "var(--blue)" : "rgba(255,255,255,0.15)",
                  color: active === i ? "var(--ink)" : i < active ? "#fff" : "rgba(255,255,255,0.4)",
                }}
              >
                {i < active ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className="text-[11px] font-semibold hidden sm:block"
                style={{ color: active === i ? "var(--gold)" : i < active ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.35)" }}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div
                  className="w-6 sm:w-10 h-px mx-1"
                  style={{ background: i < active ? "var(--blue)" : "rgba(255,255,255,0.15)" }}
                  aria-hidden="true"
                />
              )}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20">

          {/* ── Phone frame ─────────────────────────────────────────────────── */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: 240,
              height: 490,
              background: "#111",
              borderRadius: 42,
              border: "7px solid #333",
              boxShadow: "0 0 0 1px #222, 0 24px 48px rgba(0,0,0,0.6)",
            }}
          >
            {/* Notch */}
            <div
              className="absolute left-1/2 -translate-x-1/2 z-10"
              style={{ top: 10, width: 72, height: 20, background: "#111", borderRadius: 24 }}
            />

            {/* Screen area */}
            <div
              className="absolute overflow-hidden"
              style={{ inset: 0, borderRadius: 36, background: "#fff" }}
            >
              {SCREENS.map((ScreenComponent, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{
                    opacity: active === i ? 1 : 0,
                    transform: active === i ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    pointerEvents: active === i ? "auto" : "none",
                  }}
                  aria-hidden={active !== i}
                >
                  <ScreenComponent />
                </div>
              ))}
            </div>

            {/* Home indicator */}
            <div
              className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full"
              style={{ width: 48, height: 4, background: "#444" }}
            />
          </div>

          {/* ── Caption area ────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 max-w-sm w-full text-center lg:text-left">
            <div className="flex flex-col gap-2">
              <p
                className="text-sm font-bold uppercase tracking-widest"
                style={{ color: "var(--gold)" }}
              >
                Step {active + 1} of {STEPS.length} · {STEPS[active].label}
              </p>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {STEPS[active].headline}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                {STEPS[active].desc}
              </p>
            </div>

            {/* Prev / dots / Next */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">

              {/* Prev — circular ghost button */}
              <button
                onClick={prev}
                disabled={active === 0}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                className="flex items-center justify-center flex-shrink-0 disabled:opacity-30"
                style={{
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: hoverPrev ? "rgba(255,255,255,0.1)" : "transparent",
                  color: "#fff",
                  transform: hoverPrev ? "scale(1.05)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
                aria-label="Previous step"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="flex items-center justify-center"
                    style={{ minHeight: 44, minWidth: active === i ? 36 : 8 }}
                    aria-label={`Go to step ${i + 1}`}
                    aria-current={active === i ? "true" : undefined}
                  >
                    <div
                      style={{
                        width: active === i ? 36 : 8,
                        height: 8,
                        borderRadius: active === i ? 4 : "50%",
                        background: active === i ? "var(--gold)" : "rgba(255,255,255,0.2)",
                        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Next — gold pill button */}
              <button
                onClick={next}
                disabled={active === STEPS.length - 1}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => { setHoverNext(false); setPressNext(false); }}
                onMouseDown={() => setPressNext(true)}
                onMouseUp={() => setPressNext(false)}
                className="flex items-center gap-2 flex-shrink-0 font-semibold disabled:opacity-30"
                style={{
                  background: hoverNext ? "#FFCA28" : "var(--gold)",
                  color: "var(--ink)",
                  borderRadius: 50,
                  padding: "10px 24px",
                  fontSize: 13,
                  transform: pressNext ? "scale(0.97)" : hoverNext ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  minHeight: 44,
                }}
                aria-label="Next step"
              >
                <span>Next</span>
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: hoverNext ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
