"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Claims",   href: "/claims" },
  { label: "Products", href: "/products" },
  { label: "About us", href: "/about" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleMousedown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal={isOpen ? "true" : undefined}
      className={cn(
        "md:hidden overflow-hidden transition-all duration-300 mt-2 rounded-[14px] bg-white border",
        isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 pointer-events-none border-transparent"
      )}
      style={{ borderColor: isOpen ? "var(--line)" : "transparent" }}
    >
      <nav role="navigation" aria-label="Mobile navigation" className="flex flex-col p-2">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center px-6 min-h-[48px] rounded-[10px] text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--blue-tint)] text-[var(--blue)]"
                  : "text-[var(--ink2)] hover:bg-[var(--blue-tint)] hover:text-[var(--blue)]"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-2">
        <Link
          href="/products"
          onClick={onClose}
          className="flex items-center justify-center w-full min-h-[48px] rounded-[10px] text-sm font-semibold text-white transition-colors"
          style={{ background: "var(--blue)" }}
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
