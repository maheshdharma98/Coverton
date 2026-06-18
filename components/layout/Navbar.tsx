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

  const navBg     = scrolled ? "rgba(255,255,255,0.92)" : "rgba(10,18,45,0.55)";
  const navBorder = scrolled ? "1px solid rgba(255,255,255,0.5)"  : "1px solid rgba(255,255,255,0.12)";
  const linkColor = scrolled ? "#4a5568" : "rgba(255,255,255,0.75)";

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
          background: navBg,
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: navBorder,
          padding: scrolled ? "5px 5px 5px 16px" : "6px 6px 6px 18px",
          transition: "all 0.35s ease",
          boxShadow: scrolled ? "0 4px 28px rgba(0,0,0,0.12)" : "0 2px 16px rgba(0,0,0,0.25)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 min-h-[44px]">
          <Image
            src={covertonLogo}
            alt="Coverton Insurance"
            height={32}
            width={115}
            style={{
              objectFit: "contain",
              filter: scrolled ? "none" : "brightness(0) invert(1)",
              transition: "all 0.35s ease",
            }}
            priority
          />
        </Link>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <NavLink
                  href={href}
                  label={label}
                  active={active}
                  scrolled={scrolled}
                  linkColor={linkColor}
                />
              </li>
            );
          })}
        </ul>

        {/* Right CTAs */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full font-semibold text-white min-h-[44px]"
            style={{
              background: "#25D366",
              padding: scrolled ? "7px 13px" : "8px 16px",
              fontSize: 12,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#20BA5A")}
            onMouseLeave={e => (e.currentTarget.style.background = "#25D366")}
            aria-label="Contact us on WhatsApp"
          >
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 15 }} aria-hidden="true" />
            <span className="hidden md:inline">WhatsApp Us</span>
          </a>

          <Link
            href="/products"
            className="flex items-center rounded-full font-semibold text-white transition-all duration-300 min-h-[44px]"
            style={{
              background: "#1247D6",
              padding: scrolled ? "7px 15px" : "8px 18px",
              fontSize: 12,
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0e3ab0")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1247D6")}
          >
            <span className="hidden sm:inline">Get a quote</span>
            <span className="sm:hidden">Quote</span>
          </Link>

          <button
            className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full"
            style={{ color: scrolled ? "#1a202c" : "#ffffff" }}
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

function NavLink({
  href,
  label,
  active,
  scrolled,
  linkColor,
}: {
  href: string;
  label: string;
  active: boolean;
  scrolled: boolean;
  linkColor: string;
}) {
  const [hovered, setHovered] = useState(false);

  const activeBg    = scrolled ? "#1247D6"                  : "rgba(255,255,255,0.18)";
  const activeColor = "#ffffff";
  const hoverBg     = scrolled ? "rgba(18,71,214,0.08)"     : "rgba(255,255,255,0.1)";
  const hoverColor  = scrolled ? "#1247D6"                  : "#ffffff";

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
        color: active ? activeColor : hovered ? hoverColor : linkColor,
        background: active ? activeBg : hovered ? hoverBg : "transparent",
        textDecoration: "none",
        transition: "all 0.2s ease",
        letterSpacing: active ? "0.01em" : "normal",
      }}
    >
      {label}
    </Link>
  );
}
