"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
// @ts-ignore
import covertonLogo from "@/asset/Coverton_logo-removebg-preview.png";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Claims",   href: "/claims" },
  { label: "Products", href: "/products" },
  { label: "About us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 40); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1000] flex flex-col items-center"
      style={{ pointerEvents: "none" }}
    >
      <nav
        className="w-[calc(100%-32px)] max-w-[420px] md:max-w-[600px] lg:max-w-[750px] flex items-center justify-between rounded-full"
        style={{
          pointerEvents: "auto",
          marginTop: 14,
          background: "white",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid #E5E7EB",
          padding: "5px 10px 5px 16px",
          transition: "box-shadow 0.35s ease",
          boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.12)" : "0 2px 16px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 min-h-[44px]">
          <Image
            src={covertonLogo}
            alt="Coverton Insurance"
            height={32}
            width={115}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <NavLink href={href} label={label} active={active} />
              </li>
            );
          })}
        </ul>

        {/* Right CTAs */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Link
            href="/products"
            className="flex items-center rounded-full font-semibold transition-all duration-300 min-h-[44px]"
            style={{
              background: "#F5B800",
              color: "#0A0F1E",
              padding: "7px 15px",
              fontSize: 12,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#e0a800")}
            onMouseLeave={e => (e.currentTarget.style.background = "#F5B800")}
          >
            <span className="hidden sm:inline">Get a quote</span>
            <span className="sm:hidden">Quote</span>
          </Link>

          <button
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full"
            style={{ color: "#1a202c" }}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div className="w-[calc(100%-32px)] max-w-[420px]" style={{ pointerEvents: "auto" }}>
        <MobileMenu isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: 50,
        fontSize: 12.5,
        fontWeight: active ? 700 : 500,
        color: active ? "#ffffff" : hovered ? "#1247D6" : "#4a5568",
        background: active ? "#1247D6" : hovered ? "rgba(18,71,214,0.08)" : "transparent",
        textDecoration: "none",
        transition: "all 0.2s ease",
        letterSpacing: active ? "0.01em" : "normal",
      }}
    >
      {label}
    </Link>
  );
}
