"use client";

import Link from "next/link";

interface FormSuccessProps {
  refId: string;
  insuranceType?: string;
  onReset?: () => void;
}

export function FormSuccess({ refId, insuranceType, onReset }: FormSuccessProps) {
  return (
    <div className="flex flex-col items-center text-center py-8 px-4 gap-6">

      {/* Checkmark circle */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: "#D1FAE5" }}
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold" style={{ color: "var(--ink)" }}>
          Enquiry Submitted!
        </h2>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--ink2)" }}>
          {insuranceType
            ? `We've received your ${insuranceType} enquiry.`
            : "We've received your enquiry."}{" "}
          An advisor will reach out within 60 minutes during business hours.
        </p>
      </div>

      {/* Ref ID box */}
      <div
        className="flex flex-col items-center gap-1 px-6 py-3 rounded-[10px] border w-full max-w-xs"
        style={{ background: "var(--blue-tint)", borderColor: "var(--blue-mid)" }}
      >
        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--blue)" }}>
          Reference ID
        </span>
        <span className="text-lg font-bold tracking-wide" style={{ color: "var(--ink)" }}>
          {refId}
        </span>
        <p className="text-xs" style={{ color: "var(--ink3)" }}>
          Save this for future correspondence
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="w-full sm:flex-1 min-h-[48px] rounded-full border text-sm font-medium transition-colors"
            style={{ borderColor: "var(--line)", color: "var(--ink2)" }}
          >
            Submit another
          </button>
        )}
        <Link
          href="/products"
          className="w-full sm:flex-1 min-h-[48px] flex items-center justify-center rounded-full text-sm font-semibold text-white transition-colors"
          style={{ background: "var(--blue)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--blue2)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--blue)")}
        >
          Browse products
        </Link>
      </div>

    </div>
  );
}
