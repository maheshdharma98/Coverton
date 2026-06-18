"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-24">
        {/* 404 number */}
        <div className="relative mb-8 select-none" aria-hidden="true">
          <span
            className="text-[9rem] sm:text-[12rem] font-black leading-none"
            style={{ color: "var(--line)" }}
          >
            404
          </span>
          {/* Gold shield overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "var(--gold)" }}
            >
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col items-center gap-3 mb-10 max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--ink)" }}>
            Page not found
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--ink3)" }}>
            The page you're looking for doesn't exist or has been moved. Try heading back to the homepage or exploring our products.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="px-7 py-3 rounded-full text-sm font-bold text-white transition-colors"
            style={{ background: "var(--blue)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--blue2)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--blue)")}
          >
            Back to homepage
          </Link>
          <Link
            href="/products"
            className="px-7 py-3 rounded-full text-sm font-semibold border transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--ink2)" }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "var(--blue)";
              e.currentTarget.style.color = "var(--blue)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "var(--line)";
              e.currentTarget.style.color = "var(--ink2)";
            }}
          >
            Browse products
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
