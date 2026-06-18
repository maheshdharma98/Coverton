"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS_LIST } from "@/lib/products";

const ICONS: Record<string, React.ReactNode> = {
  motor: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  health: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  travel: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
  life: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  agriculture: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12M12 12C12 12 7 10 4 4c4 0 8 2 8 8zM12 12c0 0 5-2 8-8-4 0-8 2-8 8z"/><path d="M5 22h14"/></svg>,
  fire: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 01-7 7 7 7 0 01-7-7c0-1.507.333-2.078.5-2.5z"/></svg>,
  credit: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  engineering: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
  liability: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  marine: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 002 2h16a2 2 0 002-2"/><path d="M17 12H7l-5 8h20l-5-8z"/><path d="M12 2v10"/><path d="M8 6l4-4 4 4"/></svg>,
  miscellaneous: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  "personal-accident": <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></svg>,
  surety: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m5 4a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
};

export default function ProductsFilterGrid() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return PRODUCTS_LIST;
    return PRODUCTS_LIST.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search bar */}
      <div className="max-w-lg mx-auto w-full">
        <div
          className="flex items-center gap-3 rounded-full border px-5 h-12 bg-white"
          style={{ borderColor: "var(--line)" }}
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="var(--ink3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="search"
            placeholder="Search insurance categories…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "var(--ink)" }}
            aria-label="Search products"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      {query && (
        <p className="text-center text-sm" style={{ color: "var(--ink3)" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
        </p>
      )}

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((product) => (
            <div
              key={product.slug}
              className="group flex flex-col rounded-[16px] border bg-white overflow-hidden transition-all"
              style={{ borderColor: "var(--line)" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = product.color;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${product.color}22`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Header strip */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ background: product.color }}
              >
                <div className="text-white">{ICONS[product.slug]}</div>
                <span className="text-sm font-bold text-white">{product.name}</span>
              </div>

              {/* Body */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <p className="text-xs italic font-medium" style={{ color: "var(--ink3)" }}>
                  {product.tagline}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink2)" }}>
                  {product.shortDesc}
                </p>
              </div>

              {/* CTA */}
              <div className="px-5 pb-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="flex items-center justify-center w-full min-h-[44px] rounded-full text-xs font-bold transition-colors"
                  style={{ background: "var(--gold)", color: "var(--ink)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--gold2)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
                >
                  Get a quote →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-16">
          <p className="text-base font-semibold" style={{ color: "var(--ink)" }}>
            No results found
          </p>
          <p className="text-sm" style={{ color: "var(--ink3)" }}>
            Try a different keyword or{" "}
            <button
              onClick={() => setQuery("")}
              className="underline"
              style={{ color: "var(--blue)" }}
            >
              clear the search
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
